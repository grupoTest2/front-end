import { Component, OnInit } from '@angular/core';
import { CalificacionConocimiento } from 'src/app/models/convocatoria-docente/calificacion-conocimiento';
import * as $ from 'jquery';

@Component({
  selector: 'app-calificacion-conocimientos',
  templateUrl: './calificacion-conocimientos.component.html',
  styleUrls: ['./calificacion-conocimientos.component.css']
})
export class CalificacionConocimientosComponent implements OnInit {

  calificacion:CalificacionConocimiento;
  listaCalificacion:CalificacionConocimiento[]=[];

  constructor() { }

  ngOnInit(): void {
  }

  agregarCalificacion(){
    let descripcionCalificacion = $('#descripcionCalificacion').val();
    let porcentaje=$('#porcentajeCalificacion').val();
    this.calificacion=new CalificacionConocimiento(descripcionCalificacion,porcentaje);
    this.listaCalificacion.push(this.calificacion);
    console.log(this.listaCalificacion+"--------------------------------");
  }
  getindice(indice:number){
    let caracter:String=String.fromCharCode(indice+65).toLocaleLowerCase()+")     ";
    return caracter;
  }

}
