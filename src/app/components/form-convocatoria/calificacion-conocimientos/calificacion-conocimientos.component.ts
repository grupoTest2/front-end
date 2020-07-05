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

  //
  listaTiposEvaluacion: TipoEvaluacion[] = [];// ocupando de la bd
  listaTematica: Tematica[] = []; //ocupando base de datos
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

  //metodo para seleccion de tematica
  seleccionoTematica() {
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

  /*-------------- metodo para recuperar los datos de este componente*/
  getDatos(): Requerimiento[] {
    console.log(this.listaItems + "-------------------");
    return this.listaItems;
  }


  setListaRequerimiento(listaRequeriminetos: Requerimiento[]): void {
    console.log(listaRequeriminetos)
    this.listaItems = listaRequeriminetos;
  }

  getDatosTipoEvaluacion(tematica: Tematica) {
    this.detalleTipoEvaluacion = ``;
    $("#mensaje").text('');
    let mensaje=``;
    this.detalleTipoEvaluacion += `La tematica ${tematica.getNombre()} tiene los tipos de evaluacion: `+mensaje;
    $("#mensaje").append('<br><b>'+this.detalleTipoEvaluacion+'</b><br>');
    for (let index = 0; index < tematica.getTiposEvaluacion().length; index++) {
         mensaje=`${tematica.getTiposEvaluacion()[index].getNombre()} = ${tematica.getTiposEvaluacion()[index].getPorcentaje()} <br>`;
         $("#mensaje").append('<br>'+mensaje);            
    }
   // $('#mensaje').text(' me la pelas \n si si tu <br/> si cujudu tu');

  }

  getId(id: string) {
    return id.replace(/ /g, "");
  }

  agregarTematicaItem() {
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
            console.log(id + "   los ids de los items con notas")
          }
        }
      }
      this.tematicaActual.setSeleccionado(true);
      console.log(this.tematicaActual);
      this.quitarSeleccionTiposEvaluacion();
      console.log("prueba prooooooooooooooo xdxd");
      console.log(this.listaItems);
      this.listaTiposEvaluacionSeleccionados = [];
      $('#modalConocimientoAux').modal('hide');
    }
    else {
      this.mensajeErrorDePorcentajesIngresados(this.mensaje);
    }
  }

  seleccionarTematica(idTem:number,tiposEvaluacion:TipoEvaluacion[]){
    for(let i in this.listaTematica){
      if(this.listaTematica[i].getIdTematica()==idTem){
        this.listaTematica[i].setSeleccionado(true);
        this.listaTematica[i].setTiposEvaluacion(tiposEvaluacion);
        break;
      }
    }
  }
  hayTematicas() {
    let bandera = false;
    for (let index = 0; index < this.listaTematica.length; index++) {
      if (!this.listaTematica[index].getSeleccionado()) {
        bandera = true;
      }

    }
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

  mensajeErrorDePorcentajesIngresados(mensaje: string) {
    tata.error('Error', mensaje);
    this.mensaje = ``;
  }


  quitarSeleccionTiposEvaluacion() {
    for (let index = 0; index < this.listaTiposEvaluacion.length; index++) {
      this.listaTiposEvaluacion[index].setSeleccionado(false);
    }
  }

  ErrorAlInsertarDocumento(mensaje: string = 'Formulario invalido') {
    this.formCalificacion.markAllAsTouched();
    tata.error('Error', mensaje);
  }

  seleccionado(index: number) {
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

  // validaciones -------------------------------------------------------------------------------
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
    // this.listaTiposDatos = [];
    $("#nombreTematica").val("porDefecto");
    $('input').removeClass('is-invalid');
    this.buildForm();
  }


  validaNotasTiposEvaluacion(): boolean {
    let sumatoria = 0;
    for (let index = 0; index < this.listaTiposEvaluacion.length; index++) {
      if (this.listaTiposEvaluacion[index].getSeleccionado()) {
        let id: any = this.getId(this.listaTiposEvaluacion[index].getNombre());
        let value = (<HTMLInputElement>document.getElementById(id)).value;
        console.log(value + "+++++++++++++++++");
        if (value != "") {
          let tipoEvaluacionTemp = new TipoEvaluacion(this.listaTiposEvaluacion[index].getId(), this.listaTiposEvaluacion[index].getNombre());
          console.log("tipo de evaluacion! " + id + "del tipo de evaluacion");
          let nota = parseInt(value);
          tipoEvaluacionTemp.setPorcentaje(nota);
          this.listaTiposEvaluacionSeleccionados.push(tipoEvaluacionTemp)
          sumatoria += nota;
        }
      }
    }
    console.log(sumatoria);
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
        console.log("tipo de evaluacion! " + value + "del item");
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

  formValido(): void {
    // if (this.formCalificacion.valid) {
    //this.validarNota();
    //} else {
    //this.formCalificacion.markAllAsTouched();
    //tata.error('Error', 'Formulario invalido');
    //}
  }

  get detalle() {
    return this.formCalificacion.get('detalle');
  }
  get detalleIsValid() {
    return this.detalle.touched && this.detalle.valid;
  }
  get detalleIsInvalid() {
    return this.detalle.touched && this.detalle.invalid;
  }

  get nota() {
    return this.formCalificacion.get('nota');
  }
  get notaIsValid() {
    return this.nota.touched && this.nota.valid;
  }
  get notaIsInvalid() {
    return this.nota.touched && this.nota.invalid;
  }

  estaHabilitado() {
    /*let res: boolean = true;
    if (this.listaTematicas.length > 0) {
      for (let i in this.listaItems) {
        console.log(this.listaItems[i].getNotaDisponible())
        res = this.listaItems[i].getNotaDisponible() == 0;
        if (!res) {
          break;
        }
      }
    } else {
      res = false;
    }*/
    return true;
  }

  /**
   * metodos que interactuan con la base de datos
   */
  getRequerimientosBD() {
      if(localStorage.getItem("idConv")===""){
        console.log("esta vacio en los requerimientos");
      }else{
        let idConv: number = parseInt(localStorage.getItem("idConv"));
        this.editarConv.getRequerimientos(idConv).subscribe(
          resultado => {
            let item:Item;
              for(let i in resultado){
                item=new Item(resultado[i].item['idItem'],resultado[i].item['codigoItem'],resultado[i].item['nombreItem'],true);
                //this.seleccionarItem(resultado[i].item['idItem']);
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
              console.log("recuperado de la base de datos yyyyyyyyyyy");
              console.log(this.listaItems);
            }
            
          
        );
      }
      
    
  }

  getTematicasBD() {
    let idTipoConv = parseInt(localStorage.getItem("idTipo"));
    this.crearConv.getTematicas(idTipoConv).subscribe(
      resultado => {
        for (let i in resultado) {
          this.listaTematica.push(new Tematica(resultado[i].idTematica, resultado[i].nombre));
        }
        console.log("las tematicas desde la base de datos son");
        console.log(this.listaTematica);
      }
    );
  }

  getTiposEvaluacionBD() {
    let idDep = 1;
    this.crearConv.getTiposEvaluacion(idDep).subscribe(
      resultado => {
        for (let i in resultado) {
          this.listaTiposEvaluacion.push(new TipoEvaluacion(resultado[i].idTipoEvaluacion, resultado[i].nombre));
        }
        console.log("los tipos de evaluacion de la base de datos");
        console.log(this.listaTiposEvaluacion);
      }
    );

  }
}
