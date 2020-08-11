import { Component, OnInit, ViewChild, Input, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
// models
import { Requerimiento } from 'src/app/models/clases/convocatoria/requerimiento2';
import { Requisito } from 'src/app/models/clases/convocatoria/requisito';
import { Evento } from 'src/app/models/clases/convocatoria/evento';
import { Merito } from 'src/app/models/clases/convocatoria/merito';
import { DocumentoPresentar } from 'src/app/models/clases/convocatoria/documento-presentar';
import { DatoRotulo } from 'src/app/models/clases/convocatoria/dato-rotulo';

// componentes
import { RequerimientosComponent } from 'src/app/components/form-convocatoria/requerimientos/requerimientos.component';
import { RequisitosComponent } from 'src/app/components/form-convocatoria/requisitos/requisitos.component';
import { DocumentosPresentarComponent } from 'src/app/components/form-convocatoria/documentos-presentar/documentos-presentar.component';
import { MeritosComponent } from 'src/app/components/form-convocatoria/meritos/meritos.component';
import { FechasComponent } from 'src/app/components/form-convocatoria/fechas/fechas.component';
import { CalificacionConocimientosComponent } from 'src/app/components/form-convocatoria/calificacion-conocimientos/calificacion-conocimientos.component';
import { DatosRotuloComponent } from 'src/app/components/form-convocatoria/datos-rotulo/datos-rotulo.component';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';

// servicios
import { DatosConvocatoriaService } from '../../servicios/datos-convocatoria.service';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NavigationStart, Router } from '@angular/router';
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';
declare var $: any;
declare var swal: any;
declare var tata: any;

export let browserRefresh = false;

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

  listaDatosRequerimientos: Requerimiento[] = [];
  listaDatosRequisitos: Requisito[] = [];
  listaDatosDocumentosPresentar: DocumentoPresentar[] = [];
  listaDatosMerito: Merito[] = [];
  listaItemsConCalificaciones: Requerimiento[] = [];
  listaDatosEventos: Evento[] = [];
  listaDatosRotulo: DatoRotulo[] = [];
  listaRequerimientos: Requerimiento[] = [];
  tituloConvocatoria: string = '';
  gestionConvocatoria: string = '';
  idTipo: string = '';
  bandera: boolean;
  href: string = '';
  @BlockUI() blockUI: NgBlockUI;
  subscription: Subscription;

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
  }

  constructor(private datosConvocatoria: DatosConvocatoriaService,
    private apiPHP: PhpServeConvocatoria,
    private router: Router,
    private editarConv: EditarConvocatoriaServicePhp) {
    this.tituloConvocatoria = localStorage.getItem('tituloConvocatoria');
    this.gestionConvocatoria = localStorage.getItem('gestionConvocatoria');
    this.idTipo = localStorage.getItem('idTipo');
    datosConvocatoria.idTipoConvocatoria = this.idTipo;
  }


  ngOnInit(): void {
    this.href = this.router.url;
  }

  ruta() {
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    } else {
      return false;
    }
  }

  estaHabilitado():any {
    return this.requerimiento.estaHabilitado();
  }

  setListaRequerimientos(listaRequerimientos: Requerimiento[]) :void{
    this.calificacionConocimiento.setListaRequerimiento(listaRequerimientos);
    this.listaRequerimientos = listaRequerimientos;
  }

  recuperarLosDatosDeLosComponentes():void {
    this.listaRequerimientos = this.requerimiento.getDatos();
    this.listaDatosRequisitos = this.requisitos.getDatos();
    this.listaDatosDocumentosPresentar = this.documentosPresentar.getDatos();
    this.listaDatosMerito = this.merito.getDatos();
    this.listaItemsConCalificaciones = this.calificacionConocimiento.getDatos();
    this.listaDatosEventos = this.eventos.getDatos();
    this.listaDatosRotulo = this.datosRotulo.getDatos();
  }



  habilitar(): boolean {
    let habilitar = true;
    let mensaje = '';
    let req:string = this.requerimiento.estaHabilitado();
    let requi:string = this.requisitos.estaHabilitado();
    let doc: string =this.documentosPresentar.estaHabilitado();
    let me: string =this.merito.estaHabilitado();
    let calif: string =this.calificacionConocimiento.estaHabilitado();
    let eventos: string=this.eventos.estaHabilitado();
    let datos: string=this.datosRotulo.estaHabilitado();
    if(req=="bien"&&requi=="bien"&&doc=="bien"&&me=="bien"&&calif=="bien"&&eventos=="bien"&&datos=="bien"){
      this.lanzarConvocatoria();
      habilitar = true;
    }else{
      if (req!="bien") {
        mensaje += '<hr>'+req;
      }
      if (requi!="bien") {
        mensaje += '<hr>'+requi;
      }
      if (doc!="bien") {
        mensaje += '<hr>'+doc;
      }
      if (me!="bien") {
        mensaje += '<hr>'+me;
      }
      if (calif!="bien") {
        mensaje += '<hr>'+calif;
      }
      if (eventos!="bien") {
        mensaje += '<hr>'+eventos;
      }
      if (datos!="bien") {
        mensaje += '<hr>'+datos;
      }
      habilitar = false
      this.mensajeToastErrorBD(mensaje);
    }
    return habilitar;
  }

  lanzarConvocatoria() {
    let idConv: number = parseInt(localStorage.getItem("idConv"));
    this.editarConv.habilitarConvocatoria(idConv).subscribe(
      resultado => {
        if (resultado['resultado'] === 'correcto') {
          this.mensajeToastExito('la convocatoria esta habilitada');
        } else {
          this.mensajeToastErrorBD('no se pudo habilitar la convocatoria');
        }
      }
    )

  }

  mensajeToastErrorBD(mensaje):void {
    tata.error('Error', mensaje, {
      duration: 10000
    });

  }
  mensajeToastExito(mensaje) :void{
    tata.success('Registro Exitoso', mensaje);
  }

  alertAgregar(): void {
    swal.fire({
      title: 'Guardar Datos',
      text: "¿Está seguro de guardar los datos?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        if(this.agregarBD()){
          swal.fire(
            {title: 'Exitoso',
            text: "¿Desea habilitar la convocatoria?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ir a habilitar',
            cancelButtonText: 'Cancelar'}
          ).then((result) => {
            if (result.value) {
              this.router.navigate(['/habilitarConvocatoria/formulario']);
            }else{
              this.router.navigate(['/editar/convocatorias']);
            }
          });
        }else{
          swal.fire(
            'Error!',
            'Error al guardar los datos.',
            'error'
          )
        }
      } else {
        swal.fire(
          'Cancelado!',
          'Los datos no fueron guardados.',
          'error'
        );
      }
    });
  }

  alertHabilitar(): void {
    swal.fire({
      title: 'Habilitar convocatoria',
      text: '¿Está seguro de habilitar la convocatoria?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        if(this.habilitar()){
          swal.fire(
            'Exitoso!',
            'La convactoria fue habilitada correctamente',
            'success'
          );
          this.router.navigate(['/editar/convocatorias']);
          }else{
            swal.fire(
              {title: 'Editar convocatoria',
              text: "¿Desea completar los datos faltantes?",
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ir a editar',
              cancelButtonText: 'Cancelar'}
            ).then((result) => {
              if (result.value) {
                this.router.navigate(['/editarConvocatoria/formulario']);
              }else{
                this.router.navigate(['/editar/convocatorias']);
              }
            });
          }
      } else {
        swal.fire(
          'Cancelado!',
          'La convocatoria no fue habilitada.',
          'error'
        );
        this.router.navigate(['/editar/convocatorias']);
      }
    });
  }

  agregarBD():boolean {
    let agregar = false;
    this.recuperarLosDatosDeLosComponentes();
    if(this.agregarRequerimientos() && this.agregarRequisitos() && this.agregarDocumentosPresentar() &&
    this.agregarMeritos() && this.agregarEventos() && this.agregarDatosRotulo()){
      agregar = true;
    }
    return agregar;
  }
 
  agregarRequerimientos(): boolean {
    let agregar: boolean = true;
    if (this.listaRequerimientos.length !== 0) {
      this.apiPHP.agregarRequerimientos(this.listaRequerimientos).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            this.agregarCalificaciones();
          } else {
            console.log('error con los requerimientos');
            agregar = false;
          }
        }
      );
    }
    return agregar;
  }
  agregarRequisitos(): boolean {
    let agregar: boolean = true;
    if (this.listaDatosRequisitos.length !== 0) {
      this.apiPHP.agregarRequisitos(this.listaDatosRequisitos).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los requisitos');
          } else {
            console.log('error con los requisitos');
            agregar = false;
          }
        }
      );
    }
    return agregar;
  }
  agregarDocumentosPresentar():boolean {
    let agregar: boolean = true;
    if (this.listaDatosDocumentosPresentar.length !== 0) {
      this.apiPHP.agregarDocumentosPresentar(this.listaDatosDocumentosPresentar).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los documentos');
          } else {
            console.log('error con los documentos');
            agregar = false;
          }
        }
      );
    }
    return agregar;

  }

  agregarCalificaciones():boolean {
    let agregar: boolean = true;
    let resp: boolean = false;
    //console.log(JSON.stringify(this.listaItemsConCalificaciones));
    for (let i in this.listaItemsConCalificaciones) {
      let listaTem = this.listaItemsConCalificaciones[i].getListaTematicas();
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
            agregar = false;
          }
        }
      );
    }
    return agregar;
  }

  agregarMeritos():boolean {
    let agregar: boolean = true;
    if (this.listaDatosMerito.length !== 0) {
      this.apiPHP.agregarMeritos(this.listaDatosMerito).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los meritos');
          } else {
            console.log('error con los meritos');
            agregar = false;
          }
        }
      );
    }
    return agregar;
  }

  agregarEventos():boolean {
    let agregar: boolean = true;
    if (this.listaDatosEventos.length !== 0) {
      console.log(JSON.stringify(this.listaDatosEventos));
      this.apiPHP.agregarEventos(this.listaDatosEventos).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los eventos');
          } else {
            console.log('error con los eventos');
            agregar = false;
          }
        }
      );
    }
    return agregar;
  }


  agregarDatosRotulo():boolean {
    let agregar: boolean = true;
    console.log(JSON.stringify(this.listaDatosRotulo));
    if (this.listaDatosRotulo.length !== 0) {
      this.apiPHP.agregarDatosRotulo(this.listaDatosRotulo).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los datos rotulo');
          } else {
            console.log('error con los datos rotulo');
            agregar = false;
          }
        }
      );
    }
    return agregar;
  }
}