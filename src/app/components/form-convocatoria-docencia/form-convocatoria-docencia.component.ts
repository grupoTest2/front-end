import { Component, OnInit } from '@angular/core';
import { Requerimiento } from 'src/app/models/convocatoria-docente/requerimiento';
import { DocumentoPresentar } from 'src/app/models/convocatoria-docente/documento-presentar';
import { CalificacionConocimiento } from 'src/app/models/convocatoria-docente/calificacion-conocimiento';
import {Merito} from 'src/app/models/convocatoria-docente/merito';

@Component({
  selector: 'app-form-convocatoria-docencia',
  templateUrl: './form-convocatoria-docencia.component.html',
  styleUrls: ['./form-convocatoria-docencia.component.css']
})
export class FormConvocatoriaDocenciaComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {
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
  datosCalificacionConocimiento(calificacionDocumentos:CalificacionConocimiento[]){
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
}
