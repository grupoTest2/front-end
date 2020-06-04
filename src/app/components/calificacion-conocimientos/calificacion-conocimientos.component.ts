import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CalificacionConocimiento } from 'src/app/models/convocatoria-docente/calificacion-conocimiento';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { SeleccionCalificacion } from 'src/app/models/convocatoria-docente/seleccion-calificacion-conocimientos';

@Component({
  selector: 'app-calificacion-conocimientos',
  templateUrl: './calificacion-conocimientos.component.html',
  styleUrls: ['./calificacion-conocimientos.component.css']
})
export class CalificacionConocimientosComponent implements OnInit {

  calificacion: CalificacionConocimiento;
  listaCalificacion: CalificacionConocimiento[] = [];
  seleccionCalificacionCono: SeleccionCalificacion;


  href: string = "";
  /*----- M para envio de datos ------------*/
  @Output() datosCalificacionConocimiento = new EventEmitter();
  lista:any=[];

  constructor(private router: Router) {
    this.seleccionCalificacionCono = new SeleccionCalificacion();
  }

  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.listaCalificacion + "--------------------------------");
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

  listaVacia(){
    if(this.lista == null){
      return true;
    }
    return false;
  }

  setLista(lista){
    this.lista=lista;
  }


  /* agregando la calificacioin de auxiliatura laboratorio*/
  agregarCalificacionAuxL(){

  }

}
