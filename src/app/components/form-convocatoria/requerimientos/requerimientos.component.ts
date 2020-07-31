import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//rutas
import { Router } from '@angular/router';

//servicios
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { DatosConvocatoriaService } from '../../../servicios/datos-convocatoria.service';

//models
import { SeleccionRequerimiento } from 'src/app/models/convocatoria/seleccion-requerimientos';
import { Requerimiento } from 'src/app/models/clases/convocatoria/requerimiento2';
import { debounceTime } from 'rxjs/operators';
import { SeleccionTipoDatoRotulo } from 'src/app/models/convocatoria/seleccion-tipo-dato-rotulo';
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';
import { Tematica } from 'src/app/models/clases/convocatoria/tematica2';
import { async } from 'rxjs/internal/scheduler/async';
import { Item } from 'src/app/models/clases/convocatoria/item';
import { TipoEvaluacion } from 'src/app/models/clases/convocatoria/tipo-de-evaluacion';

//jquery, toast, alertas
declare var swal: any;
declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})

export class RequerimientosComponent implements OnInit {
  listaRequerimientosX:Requerimiento[]=[];
  listaItems:Item[]=[];
  itemSeleccionado:Item;
  formRequerimientos: FormGroup;
  requerimiento: Requerimiento;
  href: string = "";
  @Output() listaRequerimientos = new EventEmitter();
  bandera = true;
  constructor(private formBuilder: FormBuilder,
    private apiPHP: PhpServeConvocatoria,
    private router: Router,
    private datosConvocatoria: DatosConvocatoriaService,
    private editarConv: EditarConvocatoriaServicePhp) {
    this.buildForm();
    this.getItems();
    this.getRequerimientosBD();
  }

  ngOnInit(): void {
    this.href = this.router.url;
  }

  seleccionoItem():void{
    var valor = $("#seleccionaMateria option:selected").val();
    if(valor != undefined){
      valor.toString();
      for(let i=0;i<this.listaItems.length;i++){
        if(this.listaItems[i].getNombreItem()==valor){
          this.itemSeleccionado=this.listaItems[i];
          break;
        }
      }
    }    
  }

  hayItemDisponible(): boolean{
    let bandera=false;
     for(let i=0;i<this.listaItems.length&&!bandera;i++){
      bandera=!this.listaItems[i].getSeleccionado();
     }
     return bandera;
  }
   async cambioBandera(){
    if (!this.hayItemDisponible()) {
      this.bandera = false;
    }
    else{
      this.bandera=true;
    }
  }

  ruta():boolean {
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    } else {
      return false;
    }
  }

  alertEliminar(): void {
    swal.fire({
      title: 'Eliminar',
      text: "¿Desea eliminar el campo seleccionado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Exitoso!',
          'El campo fue eliminado.',
          'success'
        )
      } else {
        swal.fire(
          'Cancelado!',
          'El campo no fue eliminado.',
          'error'
        )
      }
    })
  }

  toastExitoso(): void {
    tata.success('Agregado.', 'El merito fue creado con exito.', {
      duration: 2000,
      animate: 'slide'
    });
  }

  toastError(): void {
    tata.error('Elinimado', 'El merito fue creado exitosamente', {
      duration: 2000,
      animate: 'slide'
    });
  }

  guardarRequerimientos(): void {
    let numeroItems = parseInt($('#itemRequerimiento').val());
    let horasM = parseInt($('#horasMesRequerimiento').val());
    this.itemSeleccionado.setSeleccionado(true);
    this.requerimiento=new Requerimiento(horasM,numeroItems,this.itemSeleccionado);
    this.requerimiento.setAccion("insertar");
    this.listaRequerimientosX.push(this.requerimiento);
    this.enviarLista();
    
  }
  editar(i: number): void { }

  getDatos(): Requerimiento[] {
    return this.listaRequerimientosX;
  }

  enviarLista(): void {
    this.listaRequerimientos.emit(this.listaRequerimientosX);
  }

  private buildForm(): void {
    this.formRequerimientos = this.formBuilder.group({
      items: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      horasMes: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      materia: ['', [Validators.required]],
    });
    this.formRequerimientos.valueChanges
      .subscribe(value => {
      });
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.formRequerimientos.valid) {
      const value = this.formRequerimientos.value;
    } else {
      this.formRequerimientos.markAllAsTouched();
    }
  }

  formValido(): void {
    if (this.formRequerimientos.valid) {
      $('#tablaRequerimientos').modal('hide');
      this.guardarRequerimientos();
      tata.success('Agregado.', 'Se agregó con exito.');
      this.formRequerimientos.reset();
    } else {
      tata.error('Error', 'Formulario invalido');
    }
  }
  resetForm(): void {
    if (!this.hayItemDisponible()) {
      $('#btnAniadir').click(function () {
        $(this).removeAttr('data-target');
    });
    }
    this.buildForm();
  }

  get materiaForm():any {
    return this.formRequerimientos.get('materia');
  }

  get materiaFormIsValid():boolean {
    return this.materiaForm.touched && this.materiaForm.valid;
  }

  get materiaFormIsInvalid():boolean {
    return this.materiaForm.touched && this.materiaForm.invalid;
  }

  get horasMes():any {
    return this.formRequerimientos.get('horasMes');
  }

  get horasMesIsValid():boolean {
    return this.horasMes.touched && this.horasMes.valid;
  }

  get horasMesIsInvalid():boolean {
    return this.horasMes.touched && this.horasMes.invalid;
  }

  get item():any {
    return this.formRequerimientos.get('items');
  }

  get itemIsValid():boolean {
    return this.item.touched && this.item.valid;
  }

  get itemIsInvalid():boolean {
    return this.item.touched && this.item.invalid;
  }


  estaHabilitado():string{
    return this.listaRequerimientosX.length > 0?"bien":"establecer al menos un requerimiento!!";
  }

  seleccionarItem(idItem){
    for(let i in this.listaItems){
      if(this.listaItems[i].getIdItem()===idItem){
        this.listaItems[i].setSeleccionado(true);
        break;
      }
    }
  }

  getItems(): void {
    let idTipoConvocatoria: number = parseInt(localStorage.getItem("idTipo")); //usar 1 para docencia y 2 para labo
    this.apiPHP.getItems(idTipoConvocatoria).subscribe(
      result => {
        for (let i in result) {
          this.listaItems.push(new Item(result[i].idItem,result[i].codigoItem,result[i].nombreItem));
        }
       }
    );
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
              this.seleccionarItem(resultado[i].item['idItem']);
              let listaTem:Tematica[]=[];
              let tem:Tematica;
              let listaTemAux=resultado[i].listaTematicas;
              for(let j in listaTemAux){
                let tiposEvAux=listaTemAux[j].tiposEvaluacion;
                let tiposEvaluacion:TipoEvaluacion[]=[];
                for(let k in tiposEvAux){
                  tiposEvaluacion.push(new TipoEvaluacion(tiposEvAux[k].idTipoEvaluacion,tiposEvAux[k].nombre,parseInt(tiposEvAux[k].porcentaje)));
                }
                tem=new Tematica(listaTemAux[j].idTematica,listaTemAux[j].nombre,parseInt(listaTemAux[j].porcentaje),tiposEvaluacion);
                listaTem.push(tem);
              }
              this.listaRequerimientosX.push(new Requerimiento(
                                            resultado[i].hrsAcademicas,
                                            resultado[i].cantidadItem,
                                            item,
                                            listaTem));
            }
          }
      );
    }
    }
}
