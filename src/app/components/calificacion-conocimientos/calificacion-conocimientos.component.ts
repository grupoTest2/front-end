import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CalificacionConocimiento } from 'src/app/models/convocatoria-docente/calificacion-conocimiento';
import { Router } from '@angular/router';
// import * as $ from 'jquery';
import { SeleccionCalificacion } from 'src/app/models/convocatoria-docente/seleccion-calificacion-conocimientos';
// import { Tematica } from '../../models/convocatoria-docente/tematica';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Tematica } from '../../models/clases/crear-convocatoria/tematica';
 
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


  listaTematicas: any[] = [];
  href: string = "";
  /*----- M para envio de datos ------------*/
  @Output() datosCalificacionConocimiento = new EventEmitter();
  lista: any = [];

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.seleccionCalificacionCono = new SeleccionCalificacion();
    this.buildForm();
  }

  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.listaCalificacion + "--------------------------------");
  }

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

  listaVacia() {
    if (this.lista == null) {
      return true;
    }
    return false;
  }

  setLista(lista) {
    this.lista = lista;
    console.log("jhonnnnnnnnnnnnnnnn", lista);
    for (let i = 0; i < this.lista.length; i++) {
      if (this.lista[i].getListaCalificaciones().length == 0){
        let lista: Tematica[] = [];
        for (let j = 0; j < this.listaTematicas.length; j++) {
          let tema: Tematica = new Tematica(this.listaTematicas[j], 0);
          lista.push(tema);
        }
        this.lista[i].setListaCalificaciones(lista);
      }
    }
  }


  /* agregando la calificacioin de auxiliatura laboratorio*/
  agregarCalificacionAuxL() {
    var nombreTematica = $('#nombreTematica').val();
    this.listaTematicas.push(nombreTematica);
    var tematica: Tematica;
    for (let i = 0; i < this.lista.length; i++) {
      var id = this.lista[i].getCodigoAuxiliatura();
      let notas = parseInt((<HTMLInputElement>document.getElementById(id)).value);
      console.log(id, notas);
      tematica = new Tematica(nombreTematica, notas);
      this.lista[i].getListaCalificaciones().push(tematica);
    }
  }

}
