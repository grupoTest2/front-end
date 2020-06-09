import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Requerimiento } from 'src/app/models/clases/crear-convocatoria/requerimiento';
import { Requisito } from 'src/app/models/clases/crear-convocatoria/requisito';
import { DocumentoPresentar } from 'src/app/models/clases/crear-convocatoria/documento-presentar';
import { Evento } from 'src/app/models/clases/crear-convocatoria/evento';

import { RequerimientosComponent } from 'src/app/components/requerimientos/requerimientos.component';
import { RequisitosComponent } from 'src/app/components/requisitos/requisitos.component';
import { DocumentosPresentarComponent } from 'src/app/components/documentos-presentar/documentos-presentar.component';
import { MeritosComponent } from 'src/app/components/meritos/meritos.component';
import { FechasComponent } from 'src/app/components//fechas/fechas.component';

import { CalificacionConocimientosComponent } from 'src/app/components/calificacion-conocimientos/calificacion-conocimientos.component';

import { Merito } from 'src/app/models/clases/crear-convocatoria/merito';
import { DatosConvocatoriaService } from '../../servicios/datos-convocatoria.service';

@Component({
  selector: 'app-form-convocatoria',
  templateUrl: './form-convocatoria.component.html',
  styleUrls: ['./form-convocatoria.component.css']
})
export class FormConvocatoriaComponent implements OnInit {
  @ViewChild('requerimiento') requerimiento: RequerimientosComponent;
  @ViewChild('requisitos') requisitos: RequisitosComponent;
  @ViewChild('documentosPresentar') documentosPresentar: DocumentosPresentarComponent;
  @ViewChild('merito') merito: MeritosComponent;
  @ViewChild('eventos') eventos: FechasComponent;


  @ViewChild('calificacionConocimiento') calificacionConocimiento: CalificacionConocimientosComponent;

  @Input() titulo: string = '';
  @Input() gestion: string = '';


  //lista de los datos de los diferentes componentes
  listaDatosRequerimientos: Requerimiento[] = [];
  listaDatosRequisitos: Requisito[] = [];
  listaDatosDocumentosPresentar: DocumentoPresentar[] = [];
  listaDatosMerito: Merito[] = [];
  listaMeritoConCalificaciones: Requerimiento[] = [];
  listaDatosEventos: Evento[] = [];

  //lista de los requerimientos
  listaRequerimientos: any = [];

  constructor(public datosConvocatoria: DatosConvocatoriaService) {

  }

  ngOnInit(): void {
  }

  //metodo que recu[era todos los datos]
  recuperarLosDatosDeLosComponentes() {
    console.log("-------------------------------------------------------------------------------------------");

    console.log("-------------------------------------------------------------------------------------------");

    console.log("-------------------------------------------------------------------------------------------");

    console.log("-------------------------------------------------------------------------------------------");
    this.listaRequerimientos = this.requerimiento.getDatos();
    console.log("los requerimientos ->" + this.listaRequerimientos[0].getCodigoAuxiliatura());
    this.listaDatosRequisitos = this.requisitos.getDatos();
    console.log("los requisitos ->" + this.listaDatosRequisitos[0].getDescripcion());
    this.listaDatosDocumentosPresentar = this.documentosPresentar.getDatos();
    console.log("los dicumentos a presentar->  " + this.listaDatosDocumentosPresentar[0].getDescripcion());
    this.listaDatosMerito = this.merito.getDatos();
    console.log("los datos de meritos son:");
    console.log(JSON.stringify(this.listaDatosMerito));
    this.listaMeritoConCalificaciones=this.calificacionConocimiento.getDatos();
    this.listaDatosEventos = this.eventos.getDatos();
    console.log("la descripcion del evento es->" + this.listaDatosEventos[0].getNombre());

  }


  //modificando la lsta de codigos de la componente calificaciones
  setListaRequerimientos(listaRequerientos) {
    this.calificacionConocimiento.setListaRequerimiento(listaRequerientos);
    this.listaRequerimientos = listaRequerientos;
  }

}