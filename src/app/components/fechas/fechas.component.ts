import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/convocatoria-docente/Evento';
import * as $ from 'jquery';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';
import { SeleccionEventos } from 'src/app/models/convocatoria-docente/seleccion-eventos';
@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent implements OnInit {
   evento:Evento;
   listaEvento:Evento[]=[];
   seleccionEventos:SeleccionEventos;
  constructor(private apiPHP:PhpServeService) { }

  ngOnInit(): void {
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
