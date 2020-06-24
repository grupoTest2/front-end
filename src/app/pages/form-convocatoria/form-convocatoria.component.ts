import { Component, OnInit, ViewChild, Input } from '@angular/core';

// models
import { Requerimiento } from 'src/app/models/clases/convocatoria/requerimiento';
import { Requisito } from 'src/app/models/clases/convocatoria/requisito';
import { Evento } from 'src/app/models/clases/convocatoria/evento';
import { Merito } from 'src/app/models/clases/convocatoria/merito';
import { DocumentoPresentar } from 'src/app/models/clases/convocatoria/documento-presentar';
import { TipoDatoRotulo } from 'src/app/models/clases/convocatoria/tipo-dato-rotulo';

// componentes
import { RequerimientosComponent } from 'src/app/components/form-convocatoria/requerimientos/requerimientos.component';
import { RequisitosComponent } from 'src/app/components/form-convocatoria/requisitos/requisitos.component';
import { DocumentosPresentarComponent } from 'src/app/components/form-convocatoria/documentos-presentar/documentos-presentar.component';
import { MeritosComponent } from 'src/app/components/form-convocatoria/meritos/meritos.component';
import { FechasComponent } from 'src/app/components/form-convocatoria/fechas/fechas.component';
import { CalificacionConocimientosComponent } from 'src/app/components/form-convocatoria/calificacion-conocimientos/calificacion-conocimientos.component';
import { DatosRotuloComponent } from 'src/app/components/datos-rotulo/datos-rotulo.component';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
// servicios
import { DatosConvocatoriaService } from '../../servicios/datos-convocatoria.service';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any;

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
  @ViewChild('datosRotulo') datosRotulo: DatosRotuloComponent;
  @Input() titulo: string = '';
  @Input() gestion: string = '';


  // lista de los datos de los diferentes componentes
  listaDatosRequerimientos: Requerimiento[] = [];
  listaDatosRequisitos: Requisito[] = [];
  listaDatosDocumentosPresentar: DocumentoPresentar[] = [];
  listaDatosMerito: Merito[] = [];
  listaItemsConCalificaciones: Requerimiento[] = [];
  listaDatosEventos: Evento[] = [];
  listaDatosRotulo: TipoDatoRotulo[] = [];
  listaJhon: Requerimiento[];
  // lista de los requerimientos
  listaRequerimientos: any = [];
  tituloConvocatoria: string = '';
  gestionConvocatoria: string = '';
  idTipo: string = '';
  bandera: boolean;

  @BlockUI() blockUI: NgBlockUI;
  blockTemplate =LoadingSpinnerComponent;

  constructor(private datosConvocatoria: DatosConvocatoriaService, private apiPHP: PhpServeConvocatoria) {
    this.tituloConvocatoria = localStorage.getItem('tituloConvocatoria');
    this.gestionConvocatoria = localStorage.getItem('gestionConvocatoria');
    this.idTipo = localStorage.getItem('idTipo');
    datosConvocatoria.idTipoConvocatoria = this.idTipo;
    
  }
  ngOnInit(): void {
    this.blockUI.start("cargando");

    setTimeout(() => {
      this.blockUI.stop();
    }, 500);
  }

  estaHabilitado(){
    return this.requerimiento.estaHabilitado();
  }
  // modificando la lsta de codigos de la componente calificaciones
  setListaRequerimientos(listaRequerimientos:Requerimiento[]) {
    console.log("jhon putito");
    console.log(listaRequerimientos);
    console.log("xdxdxdxdxdxdxdxd");
    console.log(this.calificacionConocimiento);
    this.calificacionConocimiento.setListaRequerimiento(listaRequerimientos);
    this.listaRequerimientos = listaRequerimientos;
  }
  // metodo que recu[era todos los datos
  recuperarLosDatosDeLosComponentes() {
    this.listaRequerimientos = this.requerimiento.getDatos();
    this.listaDatosRequisitos = this.requisitos.getDatos();
    this.listaDatosDocumentosPresentar = this.documentosPresentar.getDatos();
    this.listaDatosMerito = this.merito.getDatos();
    this.listaItemsConCalificaciones = this.calificacionConocimiento.getDatos();
    this.listaDatosEventos = this.eventos.getDatos();

    this.listaDatosRotulo = this.datosRotulo.getDatos();
    console.log("-----------------------------------------------------------------");
    console.log(this.listaDatosRotulo);
  }

  agregarBD() {
    this.recuperarLosDatosDeLosComponentes();
    this.agregarRequerimientos();
    this.agregarRequisitos();
    this.agregarDocumentosPresentar();
    this.agregarCalificaciones();
    this.agregarMeritos();
    this.agregarEventos();
    this.agregarDatosRotulo();
  }
  agregarRequerimientos(){
    if (this.listaRequerimientos.length !== 0){
      //console.log(JSON.stringify(this.listaRequerimientos));
      this.apiPHP.agregarRequerimientos(this.listaRequerimientos).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los requerimientos');
          } else {
            console.log('error con los requerimientos');
          }
        }
      );
    }
  }
  agregarRequisitos() {
    if (this.listaDatosRequisitos.length !== 0) {
      this.apiPHP.agregarRequisitos(this.listaDatosRequisitos).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los requisitos');
          } else {
            console.log('error con los requisitos');
          }
        }
      );
    }
  }
  agregarDocumentosPresentar() {
    if (this.listaDatosDocumentosPresentar.length !== 0) {
      this.apiPHP.agregarDocumentosPresentar(this.listaDatosDocumentosPresentar).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los documentos');
          } else {
            console.log('error con los documentos');
          }
        }
      );
    }
  }

  /**
   * revisar la impresion del metodo
   */
  agregarCalificaciones(){
    let resp:boolean=false;
    console.log(JSON.stringify(this.listaItemsConCalificaciones));
    for(let i in this.listaItemsConCalificaciones){
      let listaTem=this.listaItemsConCalificaciones[i].getListaTematica();
      console.log("las tematicasssss");
      console.log(JSON.stringify(listaTem));
      if (listaTem.length !== 0) {
        resp = true;
        break;
      }
    }
    if (resp) {
      this.apiPHP.agregarConocimientos(this.listaItemsConCalificaciones).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con las calificaciones');
          } else {
            console.log('error con las calificaciones');
          }
        }
      );
    }
  }

  agregarMeritos() {
    if (this.listaDatosMerito.length !== 0) {
      this.apiPHP.agregarMeritos(this.listaDatosMerito).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los meritos');
          } else {
            console.log('error con los meritos');
          }
        }
      );
    }
  }

  agregarEventos() {
    if (this.listaDatosEventos.length !== 0) {
      this.apiPHP.agregarEventos(this.listaDatosEventos).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los eventos');
          } else {
            console.log('error con los eventos');
          }
        }
      );
    }
  }
 

  agregarDatosRotulo(){
    console.log(JSON.stringify(this.listaDatosRotulo));
    if (this.listaDatosRotulo.length !== 0) {
      this.apiPHP.agregarDatosRotulo(this.listaDatosRotulo).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los datos rotulo');
          } else {
            console.log('error con los datos rotulo');
          }
        }
      );
    }
  }
}