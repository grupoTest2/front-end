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

  // lista de los datos de los diferentes componentes
  listaDatosRequerimientos: Requerimiento[] = [];
  listaDatosRequisitos: Requisito[] = [];
  listaDatosDocumentosPresentar: DocumentoPresentar[] = [];
  listaDatosMerito: Merito[] = [];
  listaItemsConCalificaciones: Requerimiento[] = [];
  listaDatosEventos: Evento[] = [];
  listaDatosRotulo: DatoRotulo[] = [];
  //listaJhon: Requerimiento[];
  // lista de los requerimientos
  listaRequerimientos: Requerimiento[] = [];
  tituloConvocatoria: string = '';
  gestionConvocatoria: string = '';
  idTipo: string = '';
  bandera: boolean;
  href: string = '';
  @BlockUI() blockUI: NgBlockUI;
  subscription: Subscription;

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("Processing beforeunload...");
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

  estaHabilitado() {
    return this.requerimiento.estaHabilitado();
  }
  // modificando la lsta de codigos de la componente calificaciones
  setListaRequerimientos(listaRequerimientos: Requerimiento[]) {
    this.calificacionConocimiento.setListaRequerimiento(listaRequerimientos);
    this.listaRequerimientos = listaRequerimientos;
  }
  // metodo que recu[era todos los datos
  recuperarLosDatosDeLosComponentes() {
    this.listaRequerimientos = this.requerimiento.getDatos();
    this.listaDatosRequisitos = this.requisitos.getDatos();
    this.listaDatosDocumentosPresentar = this.documentosPresentar.getDatos();
    this.listaDatosMerito = this.merito.getDatos();
    //this.listaItemsConCalificaciones = this.calificacionConocimiento.getDatos();
    this.listaDatosEventos = this.eventos.getDatos();
    this.listaDatosRotulo = this.datosRotulo.getDatos();
  }



  habilitar(): boolean {
    let habilitar = true;
    let mensaje = 'Error';
    if (this.requerimiento.estaHabilitado() && this.requisitos.estaHabilitado() && this.documentosPresentar.estaHabilitado()
        && this.merito.estaHabilitado() && this.calificacionConocimiento.estaHabilitado() && this.eventos.estaHabilitado()
        && this.datosRotulo.estaHabilitado()
        ) {
      this.lanzarConvocatoria();
      habilitar = true;
      console.log("habilita bien")
    }
    else {
      if (!this.requerimiento.estaHabilitado()) {
        mensaje += 'Campo Requerimiento, ';
      }
      if (!this.requisitos.estaHabilitado()) {
        mensaje += '</br>Campo requisitos, ';
      }
      if (!this.documentosPresentar.estaHabilitado()) {
        mensaje += '</br>Campo documentos a presentar, ';
      }
      if (!this.merito.estaHabilitado()) {
        mensaje += '</br>Campo meritos, ';
      }
      if (!this.calificacionConocimiento.estaHabilitado()) {
        mensaje += '</br>Campo calificacion conocimiento, ';
      }
      if (!this.eventos.estaHabilitado()) {
        mensaje += '</br>Campo eventos, ';
      }
      if (!this.datosRotulo.estaHabilitado()) {
        mensaje += "</br>Campo datos rotulo, "
      }
      habilitar = false
      this.mensajeToastErrorBD(mensaje + '<hr>A llenar faltantes!');
      console.log("Falla algo")
    }
    return habilitar;
  }

  // metodo para lanzar convocatoria
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

  mensajeToastErrorBD(mensaje) {
    tata.error('Error', mensaje, {
      duration: 3000
    });

  }
  mensajeToastExito(mensaje) {
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
        this.router.navigate(['/home']);
      }
    });
  }

  prueba(){
    console.log("okkkk 2do")
  }

  /*agregarBD() {
    let agregar = false;
    this.recuperarLosDatosDeLosComponentes();
    if(this.agregarRequerimientos() && this.agregarRequisitos() && this.agregarDocumentosPresentar() &&
    this.agregarCalificaciones() && this.agregarMeritos() && this.agregarEventos() && this.agregarDatosRotulo()){
      agregar = true;
    }
    return agregar;
  }*/
  agregarBD() {
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
      //console.log(JSON.stringify(this.listaRequerimientos));
      this.apiPHP.agregarRequerimientos(this.listaRequerimientos).subscribe(
        respuesta => {
          if (respuesta['resultado'] === 'correcto') {
            console.log('todo bien con los requerimientos');
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
  agregarDocumentosPresentar() {
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

  /**
   * revisar la impresion del metodo
   */
  /*agregarCalificaciones() {
    let agregar: boolean = true;
    let resp: boolean = false;
    console.log(JSON.stringify(this.listaItemsConCalificaciones));
    for (let i in this.listaItemsConCalificaciones) {
      let listaTem = this.listaItemsConCalificaciones[i].getListaTematica();
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

  }*/

  agregarMeritos() {
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

  agregarEventos() {
    let agregar: boolean = true;
    if (this.listaDatosEventos.length !== 0) {
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


  agregarDatosRotulo() {
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