import { Component, OnInit } from '@angular/core';
import { Fecha } from 'src/app/models/convocatoria-docente/fecha';
import * as $ from 'jquery';

@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent implements OnInit {
   fecha:Fecha;
   listaFechas:Fecha[]=[];
  constructor() { }

  ngOnInit(): void {
  }
  agregarFecha(){
    let descripcionFecha = $('#descripcionFecha').val();
    let eventoFecha = $('#eventoFecha').val();
    let fecha = $('#fecha').val();
    this.fecha=new Fecha(eventoFecha,descripcionFecha,fecha);
    this.listaFechas.push(this.fecha);
    console.log(this.listaFechas+"--------------------------------");
  }
  getindice(indice:number){
    let caracter:String=String.fromCharCode(indice+65).toLocaleLowerCase()+")     ";
    return caracter;
  }


}
