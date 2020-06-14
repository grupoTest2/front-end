import { Component, OnInit, ViewChild, Input } from '@angular/core';

// models
import { Requerimiento } from 'src/app/models/clases/convocatoria/requerimiento';
import { Requisito } from 'src/app/models/clases/convocatoria/requisito';
import { Evento } from 'src/app/models/clases/convocatoria/evento';
import { Merito } from 'src/app/models/clases/convocatoria/merito';
import { DocumentoPresentar } from 'src/app/models/clases/convocatoria/documento-presentar';

// componentes
import { RequerimientosComponent } from 'src/app/components/requerimientos/requerimientos.component';
import { RequisitosComponent } from 'src/app/components/requisitos/requisitos.component';
import { DocumentosPresentarComponent } from 'src/app/components/documentos-presentar/documentos-presentar.component';
import { MeritosComponent } from 'src/app/components/meritos/meritos.component';
import { FechasComponent } from 'src/app/components//fechas/fechas.component';
import { CalificacionConocimientosComponent } from 'src/app/components/calificacion-conocimientos/calificacion-conocimientos.component';

// servicios
import { DatosConvocatoriaService } from '../../servicios/datos-convocatoria.service';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';

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


  // lista de los datos de los diferentes componentes
  listaDatosRequerimientos: Requerimiento[] = [];
  listaDatosRequisitos: Requisito[] = [];
  listaDatosDocumentosPresentar: DocumentoPresentar[] = [];
  listaDatosMerito: Merito[] = [];
  listaItemsConCalificaciones: Requerimiento[] = [];
  listaDatosEventos: Evento[] = [];

  // lista de los requerimientos
  listaRequerimientos: any = [];
  tituloConvocatoria: string = '';
  gestionConvocatoria: string = '';
  idTipo: string = '';
  bandera: boolean;

  constructor(private datosConvocatoria: DatosConvocatoriaService, private apiPHP: PhpServeConvocatoria) {
    this.tituloConvocatoria = localStorage.getItem('tituloConvocatoria');
    this.gestionConvocatoria = localStorage.getItem('gestionConvocatoria');
    this.idTipo = localStorage.getItem('idTipo');
    datosConvocatoria.idTipoConvocatoria = this.idTipo;

  }
  ngOnInit(): void {
  }

  // modificando la lsta de codigos de la componente calificaciones
  setListaRequerimientos(listaRequerientos) {
    this.calificacionConocimiento.setListaRequerimiento(listaRequerientos);
    this.listaRequerimientos = listaRequerientos;
  }

  // metodo que recu[era todos los datos
  recuperarLosDatosDeLosComponentes(): void {
    this.listaRequerimientos = this.requerimiento.getDatos();
    this.listaDatosRequisitos = this.requisitos.getDatos();
    this.listaDatosDocumentosPresentar = this.documentosPresentar.getDatos();
    this.listaDatosMerito = this.merito.getDatos();
    this.listaItemsConCalificaciones = this.calificacionConocimiento.getDatos();
    this.listaDatosEventos = this.eventos.getDatos();
  }

  agregarBD(): void {
    this.recuperarLosDatosDeLosComponentes();
    this.agregarRequerimientos();
    this.agregarRequisitos();
    this.agregarDocumentosPresentar();
    this.agregarCalificaciones();
    this.agregarMeritos();
    this.agregarEventos();
  }


  // bd --------------------------------------------------------------------------------
  agregarRequerimientos(): void {
    if (this.listaRequerimientos.length !== 0) {
      console.log(this.listaRequerimientos);
      this.apiPHP.agregarRequerimientos(this.listaRequerimientos).subscribe(
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

  agregarRequisitos() {
    if (this.listaDatosRequisitos.length !== 0) {
      this.apiPHP.agregarRequisitos(this.listaDatosRequisitos).subscribe(
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

  agregarDocumentosPresentar(): void {
    if (this.listaDatosDocumentosPresentar.length !== 0) {
      this.apiPHP.agregarDocumentosPresentar(this.listaDatosDocumentosPresentar).subscribe(
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

  agregarCalificaciones(): void {
    if (this.listaItemsConCalificaciones.length !== 0) {
      this.apiPHP.agregarConocimientos(this.listaItemsConCalificaciones).subscribe(
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

  agregarMeritos(): void {
    if (this.listaDatosMerito.length !== 0) {
      this.apiPHP.agregarMeritos(this.listaDatosMerito).subscribe(
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

  agregarEventos(): void {
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
}