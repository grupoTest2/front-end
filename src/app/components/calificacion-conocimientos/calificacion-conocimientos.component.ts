import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CalificacionConocimiento } from 'src/app/models/convocatoria-docente/calificacion-conocimiento';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tematica } from '../../models/clases/crear-convocatoria/tematica';
import { SeleccionCalificacion } from 'src/app/models/convocatoria-docente/seleccion-calificacion-conocimientos';
import { CalifiaccionConocimientoAuxLabo } from 'src/app/models/convocatoria-laboratorio/califiaccionConocimiento';
import { Requerimiento } from 'src/app/models/clases/crear-convocatoria/requerimiento';

// import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-calificacion-conocimientos',
  templateUrl: './calificacion-conocimientos.component.html',
  styleUrls: ['./calificacion-conocimientos.component.css']
})
export class CalificacionConocimientosComponent implements OnInit {

  calificacion: CalificacionConocimiento;
  listaCalificacion: CalificacionConocimiento[] = [];
  seleccionCalificacionCono: SeleccionCalificacion;
  formCalificacion: FormGroup;

  href: string = "";

  /*----- evento para envio de datos ------------*/
  @Output() datosCalificacionConocimiento = new EventEmitter();

  //lista de calificaciom conocimientos de laboratorio
  listaConocimientosAxLabo: CalifiaccionConocimientoAuxLabo[] = [];
  listaTematicas: String[] = [];

  //agregando a la lista tematicas los codigos de los items requerimineto
  listaItems:Requerimiento[]=[];

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.seleccionCalificacionCono = new SeleccionCalificacion();
    this.buildForm();
  }

  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.listaCalificacion + "--------------------------------");
  }

  save(event: Event) {
    event.preventDefault();
    if (this.formCalificacion.valid) {
      const value = this.formCalificacion.value;
      console.log(value);
    } else {
      this.formCalificacion.markAllAsTouched();
      console.log("marca");
    }
  }

  agregarCalificacion() {
    let descripcionCalificacion = $('#descripcionCalificacion').val();
    let porcentaje = $('#porcentajeCalificacion').val();
    this.calificacion = new CalificacionConocimiento(descripcionCalificacion, porcentaje);
    let resp = this.seleccionCalificacionCono.agregarCalificacionConocimiento(this.calificacion);
    if (resp) {
      //se agrego correctamente la calificacion
    } else {
      //el porcentaje de la calificacion excede el porcenaje disponible
    }
    this.listaCalificacion = this.seleccionCalificacionCono.getListaCalifConocimientosSeleccionada();
    //this.listaCalificacion.push(this.calificacion);

  }

  getindice(indice: number) {
    let caracter: String = String.fromCharCode(indice + 65).toLocaleLowerCase() + ")     ";
    return caracter;
  }

  /*-------------- metodo para recuperar los datos de este componente*/
  getDatos() {
    this.datosCalificacionConocimiento.emit(this.listaCalificacion);
  }


  rutaActual() {
    if (this.href === '/convLaboratorio') {
      return true;
    } else {
      return false;
    }
  }


  //resiviendo la lista de la componente formilario
  setLista(lista) {
    this.listaConocimientosAxLabo = lista;
    for (let i = 0; i < this.listaConocimientosAxLabo.length; i++) {
      if (this.listaConocimientosAxLabo[i].getListaTematicas().length == 0) {
        let lista: Tematica[] = [];
        for (let j = 0; j < this.listaTematicas.length; j++) {
          let tema: Tematica = new Tematica(this.listaTematicas[j], 0);
          lista.push(tema);
        }
        this.listaConocimientosAxLabo[i].setListaTematicas(lista);
      }
    }

  }

  agregarCalificacionAuxL() {
    var nombreTematica = $('#nombreTematica').val();
    this.listaTematicas.push(nombreTematica);
    var tematica: Tematica;
    for (let i = 0; i < this.listaConocimientosAxLabo.length; i++) {
      var id: any = this.listaConocimientosAxLabo[i].getCodigoAxiliarura();
      let notas = parseInt((<HTMLInputElement>document.getElementById(id)).value);
      console.log("las notas que se deberian cargar son:");
      console.log(id, notas);
      tematica = new Tematica(nombreTematica, notas);
      this.listaConocimientosAxLabo[i].getListaTematicas().push(tematica);
    }
  }






  //nuevsa pruebas 
  setListaRequerimiento(listaRequeriminetos){
    this.listaItems=listaRequeriminetos;
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getListaTematica().length == 0) {
        for (let j = 0; j < this.listaTematicas.length; j++) {
          this.listaItems[i].getListaTematica().push(new Tematica(this.listaTematicas[j] ,0))
        }
      }
    }
  }
  agregarTematica() {
    var nombreTematica = $('#nombreTematica').val();
    this.listaTematicas.push(nombreTematica);
    for (let i = 0; i < this.listaItems.length; i++) {
      let id:any=this.listaItems[i].getnombreMateria();
      let nota=parseInt((<HTMLInputElement>document.getElementById(id)).value);
      let tematica:Tematica = new Tematica(nombreTematica, nota);
      this.listaItems[i].getListaTematica().push(tematica);
    }
    console.log("la lista de las tematicas con su valor",this.listaItems);
  }

  
  //validaciones -------------------------------------------------------------------------------
  private buildForm() {
    this.formCalificacion = this.formBuilder.group({
      detalle: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      nota: ['', Validators.compose([Validators.min(1), Validators.pattern(/^\d*$/)])]
    });

    this.formCalificacion.valueChanges
      .subscribe(value => {
        console.log(value);
      });
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
}
