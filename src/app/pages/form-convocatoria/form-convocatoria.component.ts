import { Component, OnInit, ViewChild } from '@angular/core';
import { Requerimiento } from 'src/app/models/clases/crear-convocatoria/requerimiento';
import { DocumentoPresentar } from 'src/app/models/convocatoria-docente/documento-presentar';
import {CalificacionConocimientosComponent } from 'src/app/components/calificacion-conocimientos/calificacion-conocimientos.component';
import {Merito} from 'src/app/models/clases/crear-convocatoria/merito';

@Component({
  selector: 'app-form-convocatoria',
  templateUrl: './form-convocatoria.component.html',
  styleUrls: ['./form-convocatoria.component.css']
})
export class FormConvocatoriaComponent implements OnInit {
  @ViewChild('calificacionConocimiento') calificacionConocimiento: CalificacionConocimientosComponent;  

  listaCodigos:any=[];
  constructor() {
 
  }

  ngOnInit(): void {
    localStorage.setItem('id', 'convo1');
  }

  datosRequerimientos(requerimientos:Requerimiento[]) {
    for (let requerimiento of requerimientos) {
      console.log("nombres de las materias de reuqrimiento ->"+requerimiento.getnombreMateria());
    }
    console.log("****************************************");
  }
  datosDocumentosPresentar(documentosPresentar:DocumentoPresentar[]){
    for (let documento of documentosPresentar) {
      console.log("detalle de los documentos presentar ->"+documento.getDescripcion());
    }
    console.log("****************************************");
  }
  datosCalificacionConocimiento(calificacionDocumentos:any[]){
    for (let calificacionDoc of calificacionDocumentos) {
      console.log("detalle de la calificacion de conocimiento es ->"+calificacionDoc.getDescripcion());
    }
    console.log("****************************************");
  }
  datosMeritos(meritos:Merito[]){
    for (let merito of meritos) {
      console.log("la descripcion del merito es->"+merito.getDescripcion());
    }
    console.log("****************************************");
  }

  setListaCodigos( listaCodigos){
    this.calificacionConocimiento.setLista( listaCodigos);
    this.listaCodigos = listaCodigos;
  }
}