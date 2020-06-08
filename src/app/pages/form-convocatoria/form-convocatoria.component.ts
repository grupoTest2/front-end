import { Component, OnInit, ViewChild } from '@angular/core';
import { Requerimiento } from 'src/app/models/clases/crear-convocatoria/requerimiento';
import { Requisito } from 'src/app/models/clases/crear-convocatoria/requisito';
import { DocumentoPresentar } from 'src/app/models/clases/crear-convocatoria/documento-presentar';
import { Evento } from 'src/app/models/clases/crear-convocatoria/evento';

import { CalificacionConocimientosComponent } from 'src/app/components/calificacion-conocimientos/calificacion-conocimientos.component';
import { Merito } from 'src/app/models/clases/crear-convocatoria/merito';

@Component({
  selector: 'app-form-convocatoria',
  templateUrl: './form-convocatoria.component.html',
  styleUrls: ['./form-convocatoria.component.css']
})
export class FormConvocatoriaComponent implements OnInit {
  @ViewChild('calificacionConocimiento') calificacionConocimiento: CalificacionConocimientosComponent;


  //lista de los datos de los diferentes componentes
  listaDatosRequerimientos: Requerimiento[] = [];
  listaDatosRequisitos: Requisito[] = [];
  listaDatosDocumentosPresentar: DocumentoPresentar[] = [];
  listaDatosMerito: Merito[] = [];
  listaDatosEventos: Evento[] = [];

  //lista de los requerimientos
  listaRequerimientos: any = [];

  constructor() {

  }

  ngOnInit(): void {
    localStorage.setItem('id', 'convo1');
  }

  datosRequerimientos(requerimientos: Requerimiento[]) {
    this.listaRequerimientos = requerimientos;
    console.log("los requerimientos ->" + this.listaRequerimientos);
  }

  datosRequisitos(listaRequisitos: Requisito[]) {
    this.listaDatosRequisitos = listaRequisitos;
    console.log("los requisitos ->" + this.listaDatosRequisitos);
  }

  datosDocumentosPresentar(documentosPresentar: DocumentoPresentar[]) {
    this.listaDatosDocumentosPresentar = documentosPresentar;
    console.log("los dicumentos a presentar->  " + this.listaDatosDocumentosPresentar);
  }

  datosMeritos(listaMeritos: Merito[]) {
    this.listaDatosMerito = listaMeritos;
    console.log("los datos de meritos son:");
    console.log(JSON.stringify(this.listaDatosMerito));

  }

  datosListaEvent(listaEventos: Evento[]) {
    this.listaDatosEventos = listaEventos;
    console.log("la descripcion del evento es->" + this.listaDatosEventos);
  }


  recuperarLosDatosDeLosComponentes(){
    
  }








  //modificando la lsta de codigos de la componente calificaciones
  setListaRequerimientos(listaRequerientos) {
    this.calificacionConocimiento.setListaRequerimiento(listaRequerientos);
    this.listaRequerimientos = listaRequerientos;
  }
}