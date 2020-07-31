import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// rutas
import { Router } from '@angular/router';

// formularios
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

//servicios
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';

// model
import { Tematica } from '../../../models/clases/convocatoria/tematica2';
import { CalificacionConocimiento } from 'src/app/models/convocatoria/calificacionConocimiento';
import { Requerimiento } from 'src/app/models/clases/convocatoria/requerimiento2';
import { TipoEvaluacion } from 'src/app/models/clases/convocatoria/tipo-de-evaluacion';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { Item } from 'src/app/models/clases/convocatoria/item';

// jquery y toast
declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-calificacion-conocimientos',
  templateUrl: './calificacion-conocimientos.component.html',
  styleUrls: ['./calificacion-conocimientos.component.css']
})

export class CalificacionConocimientosComponent implements OnInit {

  formCalificacion: FormGroup;
  href: string = '';
  listaItems: Requerimiento[] = [];
  listaTiposEvaluacion: TipoEvaluacion[] = [];
  listaTematica: Tematica[] = [];
  banderaTematica = false;
  detalleTipoEvaluacion = ``;
  tematicaActual: Tematica;
  listaTiposEvaluacionSeleccionados: TipoEvaluacion[] = [];
  mensaje = ``;

  constructor(private router: Router, private formBuilder: FormBuilder, private editarConv: EditarConvocatoriaServicePhp,
    private crearConv: PhpServeConvocatoria) {
    this.buildForm();
    this.getTematicasBD();
    this.getTiposEvaluacionBD();
    this.getRequerimientosBD();
  }

  ngOnInit(): void {
    this.href = this.router.url;
  }
  ruta() {
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    } else {
      return false;
    }
  }

  seleccionoTematica():void {
    var valor = $("#nombreTematica option:selected").val();
    if (valor != undefined) {
      valor.toString();
      console.log("slecciono una tematica ---" + valor);
      for (let i = 0; i < this.listaTematica.length; i++) {
        if (this.listaTematica[i].getNombre() == valor) {
          this.tematicaActual = this.listaTematica[i];
          this.banderaTematica = true;
        }
      }
    }
  }

  getindice(indice: number): string {
    let caracter: string = String.fromCharCode(indice + 65).toLocaleLowerCase() + ")     ";
    return caracter;
  }

  getDatos(): Requerimiento[] {
    console.log(this.listaItems + "-------------------");
    return this.listaItems;
  }


  setListaRequerimiento(listaRequeriminetos: Requerimiento[]): void {
    console.log(listaRequeriminetos)
    this.listaItems = listaRequeriminetos;
  }

  getDatosTipoEvaluacion(tematica: Tematica):void {
    this.detalleTipoEvaluacion = ``;
    $("#mensaje").text('');
    let mensaje=``;
    this.detalleTipoEvaluacion += `La tematica ${tematica.getNombre()} tiene los tipos de evaluacion: `+mensaje;
    $("#mensaje").append('<br><b>'+this.detalleTipoEvaluacion+'</b><br>');
    for (let index = 0; index < tematica.getTiposEvaluacion().length; index++) {
         mensaje=`${tematica.getTiposEvaluacion()[index].getNombre()} = ${tematica.getTiposEvaluacion()[index].getPorcentaje()} <br>`;
         $("#mensaje").append('<br>'+mensaje);            
    }
  }

  getId(id: string):string {
    return id.replace(/ /g, "");
  }

  agregarTematicaItem():void {
    let res1 = this.validaNotasItems();
    let res2 = this.validaNotasTiposEvaluacion();
    if (res1 && res2) {
      this.tematicaActual.setTiposEvaluacion(this.listaTiposEvaluacionSeleccionados);
      for (let index = 0; index < this.listaItems.length; index++) {
        let id: any = this.listaItems[index].getIdItem();
        if (this.listaItems[index].getNotaDisponible() > 0) {
          let value = (<HTMLInputElement>document.getElementById(id)).value;
          if (value != "") {
            let tem=new Tematica(
              this.tematicaActual.getIdTematica(),
              this.tematicaActual.getNombre(),
              parseInt(value), 
              this.tematicaActual.getTiposEvaluacion());
              tem.setAccion("insertar");
            this.listaItems[index].agregarTematica(tem);
          }
        }
      }
      this.tematicaActual.setSeleccionado(true);
      this.quitarSeleccionTiposEvaluacion();
      this.listaTiposEvaluacionSeleccionados = [];
      $('#modalConocimientoAux').modal('hide');
    }
    else {
      this.mensajeErrorDePorcentajesIngresados(this.mensaje);
    }
  }

  seleccionarTematica(idTem:number,tiposEvaluacion:TipoEvaluacion[]):void{
    for(let i in this.listaTematica){
      if(this.listaTematica[i].getIdTematica()==idTem){
        this.listaTematica[i].setSeleccionado(true);
        this.listaTematica[i].setTiposEvaluacion(tiposEvaluacion);
        break;
      }
    }
  }

  hayTematicas():boolean{
    let bandera = false;
    for (let index = 0; index < this.listaTematica.length&&!bandera; index++) {
      bandera=this.listaTematica[index].getSeleccionado();
    }
    return bandera;
  }

  getIdTematica(nombre: string): number {
    let id = 0;
    let bandera = true
    for (let index = 0; index < this.listaTematica.length && bandera; index++) {
      if (this.listaTematica[index].getNombre() == nombre) {
        id = this.listaTematica[index].getIdTematica();
        bandera = false;
      }
    }
    return id;
  }

  mensajeErrorDePorcentajesIngresados(mensaje: string):void {
    tata.error('Error', mensaje);
    this.mensaje = ``;
  }


  quitarSeleccionTiposEvaluacion():void {
    for (let index = 0; index < this.listaTiposEvaluacion.length; index++) {
      this.listaTiposEvaluacion[index].setSeleccionado(false);
    }
  }
  ErrorAlInsertarDocumento(mensaje: string = 'Formulario invalido'):void {
    this.formCalificacion.markAllAsTouched();
    tata.error('Error', mensaje);
  }

  seleccionado(index: number):void {
    if (this.listaTiposEvaluacion[index].getSeleccionado()) {
      this.listaTiposEvaluacion[index].setSeleccionado(false)
    }
    else {
      this.listaTiposEvaluacion[index].setSeleccionado(true)
    }
  }

  hayDatos(): boolean {
    var bandera = false;
    let bandera2 = false;
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getNotaDisponible() > 0) {
        bandera = true;
      }
    }
    for (let index = 0; index < this.listaTematica.length; index++) {
      if (!this.listaTematica[index].getSeleccionado()) {
        bandera2 = true;
      }
    }
    return bandera && bandera2;
  }

  private buildForm(): void {
    this.formCalificacion = this.formBuilder.group({
      detalle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(/[a-zA-Z]/)])],
      nota: ['', Validators.compose([Validators.min(0), Validators.max(100), Validators.pattern(/^\d*$/)])]
    });
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.formCalificacion.valid) {
      const value = this.formCalificacion.value;
    } else {
      this.formCalificacion.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.banderaTematica = false;
    $("#nombreTematica").val("porDefecto");
    $('input').removeClass('is-invalid');
    this.buildForm();
  }


  validaNotasTiposEvaluacion(): boolean {
    let sumatoria = 0;
    this.listaTiposEvaluacionSeleccionados=[];
    for (let index = 0; index < this.listaTiposEvaluacion.length; index++) {
      if (this.listaTiposEvaluacion[index].getSeleccionado()) {
        let id: any = this.getId(this.listaTiposEvaluacion[index].getNombre());
        let value = (<HTMLInputElement>document.getElementById(id)).value;
        if (value != "") {
          let tipoEvaluacionTemp = new TipoEvaluacion(this.listaTiposEvaluacion[index].getId(), this.listaTiposEvaluacion[index].getNombre());
          let nota = parseInt(value);
          tipoEvaluacionTemp.setPorcentaje(nota);
          this.listaTiposEvaluacionSeleccionados.push(tipoEvaluacionTemp)
          sumatoria += nota;
        }
      }
    }
    if (sumatoria > 100) {
      this.mensaje += `La nota de los tipos de evaluacion exede el 100% <br>`;
    }
    if (sumatoria < 100 && sumatoria > 0) {
      this.mensaje += `La nota de los tipos de evaluacion no satisface el 100% requerido<br>`;
    }
    if (sumatoria == 0) {
      this.mensaje += `Debe de seleccionar tipos de evaluacion para los Items<br>`;
    }
    return sumatoria == 100;
  }

  validaNotasItems(): boolean {
    let bandera = true;
    let cont = 0;
    for (let index = 0; index < this.listaItems.length && bandera; index++) {
      let id: any = this.listaItems[index].getIdItem();
      if (this.listaItems[index].getNotaDisponible() > 0) {
        let value = (<HTMLInputElement>document.getElementById(id)).value;
        if (value != "") {
          cont += 1;
          if (parseInt(value) <= this.listaItems[index].getNotaDisponible()) {
          }
          else {
            this.mensaje += `la nota del item ${this.listaItems[index].getNombreItem()} exede su nota disponible <br>`;
            bandera = false;
          }
        }
      }
    }
    bandera = bandera && cont > 0;
    if (cont == 0) {
      this.mensaje += `debe anadir a almenos un item esta tematica`

    }
    return bandera;
  }

  get detalle():any {
    return this.formCalificacion.get('detalle');
  }
  get detalleIsValid():boolean {
    return this.detalle.touched && this.detalle.valid;
  }
  get detalleIsInvalid() {
    return this.detalle.touched && this.detalle.invalid;
  }

  get nota():any {
    return this.formCalificacion.get('nota');
  }
  get notaIsValid():boolean {
    return this.nota.touched && this.nota.valid;
  }
  get notaIsInvalid():boolean {
    return this.nota.touched && this.nota.invalid;
  }

  estaHabilitado(): string {
    let res:string ="bien";
    if (this.hayTematicas()) {
      for (let i in this.listaItems) {
        if(this.listaItems[i].getNotaDisponible()> 0){
          res="en tabla de calificaciones, la sumatoria para cada item debe ser 100 !!";
          break;
        }
      }
    }else {
      res="tabla de calificaciones no puede estar vacia!!";
    }
    return res;
  }

  getRequerimientosBD():void {
      if(localStorage.getItem("idConv")===""){
      }else{
        let idConv: number = parseInt(localStorage.getItem("idConv"));
        this.editarConv.getRequerimientos(idConv).subscribe(
          resultado => {
            let item:Item;
              for(let i in resultado){
                item=new Item(resultado[i].item['idItem'],resultado[i].item['codigoItem'],resultado[i].item['nombreItem'],true);
                let listaTem:Tematica[]=[];
                let tem:Tematica;
                let listaTemAux=resultado[i].listaTematicas;
                for(let j in listaTemAux){
                  let tiposEvAux=listaTemAux[j].tiposEvaluacion;
                  let tiposEvaluacion:TipoEvaluacion[]=[];
                  for(let k in tiposEvAux){
                    tiposEvaluacion.push(new TipoEvaluacion(tiposEvAux[k].idTipoEvaluacion,tiposEvAux[k].nombre,parseInt(tiposEvAux[k].porcentaje)));
                  }
                  this.seleccionarTematica(listaTemAux[j].idTematica,tiposEvaluacion);
                  tem=new Tematica(listaTemAux[j].idTematica,listaTemAux[j].nombre,parseInt(listaTemAux[j].porcentaje),tiposEvaluacion);
                  tem.setSeleccionado(true);
                  listaTem.push(tem);
                }
                this.listaItems.push(new Requerimiento(
                                              resultado[i].hrsAcademicas,
                                              resultado[i].cantidadItem,
                                              item,
                                              listaTem));
              }
            }
            
          
        );
      }
  }

  getTematicasBD():void {
    let idTipoConv = parseInt(localStorage.getItem("idTipo"));
    this.crearConv.getTematicas(idTipoConv).subscribe(
      resultado => {
        for (let i in resultado) {
          this.listaTematica.push(new Tematica(resultado[i].idTematica, resultado[i].nombre));
        }
      }
    );
  }

  getTiposEvaluacionBD():void {
    let idDep = 1;
    this.crearConv.getTiposEvaluacion(idDep).subscribe(
      resultado => {
        for (let i in resultado) {
          this.listaTiposEvaluacion.push(new TipoEvaluacion(resultado[i].idTipoEvaluacion, resultado[i].nombre));
        }
      }
    );
  }
}
