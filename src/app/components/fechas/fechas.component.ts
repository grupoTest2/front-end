import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/convocatoria-docente/Evento';
import * as $ from 'jquery';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';
import { SeleccionEventos } from 'src/app/models/convocatoria-docente/seleccion-eventos';
import { SeleccionFechas } from 'src/app/models/convocatoria-docente/seleccion-fechas';
@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent implements OnInit {
   evento:Evento;
   //los eventos seleccionados
   listaEvento:Evento[]=[];
   //lista auxiliar nomas
   listaEventos:Object[]=new Array();
   //los eventos disponibles para seleccionar
   listaEventosDisponibles:String[];
   //objeto que controla los eventos
   seleccionEventos:SeleccionEventos;
  constructor(private apiPHP:PhpServeService) { }

  ngOnInit(): void {
    this.getEventos();
  }
  getEventos(){
    this.apiPHP.getEventos(1).subscribe(
      resultado=>{
        for (let i in resultado) {
          this.listaEventos.push(resultado[i]);
        }
        this.seleccionEventos = new SeleccionEventos(this.listaEventos);
        this.listaEventosDisponibles=this.seleccionEventos.getListaEventosDisponibles();
        console.log(this.listaEventos);
        console.log(this.listaEventosDisponibles);
      }
    );
  }
  agregarEvento(){
    let nombreNombre = $('#nombreEvento').val();
    let fechaInicio = $('#fechaInicio').val();
    let fechaFin = $('#fechaFin').val();
    this.evento=new Evento(nombreNombre,fechaInicio,fechaFin);
    this.listaEvento.push(this.evento);
    console.log(this.listaEvento+"--------------------------------");
  }
  getindice(indice:number){
    let caracter:String=String.fromCharCode(indice+65).toLocaleLowerCase()+")     ";
    return caracter;
  }
  agregarEventosBD(){
    this.apiPHP.agregarEventos(this.seleccionEventos.getListaEventosSeleccionados()).subscribe(
      datos => {
        alert(datos['mensaje']);
      }
    );
  }
}
