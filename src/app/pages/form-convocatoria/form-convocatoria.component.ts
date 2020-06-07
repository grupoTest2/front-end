import { Component, OnInit, ViewChild } from '@angular/core';
import { Requerimiento } from 'src/app/models/clases/crear-convocatoria/requerimiento';
import { DocumentoPresentar } from 'src/app/models/clases/crear-convocatoria/documento-presentar';
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
  }
  datosDocumentosPresentar(documentosPresentar:DocumentoPresentar[]){
    for (let documento of documentosPresentar) {
      console.log("detalle de los documentos presentar ->"+documento.getDescripcion());
    }
  }

  datosMeritos(meritos:Merito[]){
    for (let merito of meritos) {
      console.log("la descripcion del merito es->"+merito.getDescripcion());
    }
  }

  //modificando la lsta de codigos de la componente calificaciones
  setListaCodigos( listaCodigos){
    this.calificacionConocimiento.setLista( listaCodigos);
    this.listaCodigos = listaCodigos;
  }
}