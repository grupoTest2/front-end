import { Component, OnInit, ViewChild, Input, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
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
import { DatosRotuloComponent } from 'src/app/components/form-convocatoria/datos-rotulo/datos-rotulo.component';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { AlertasComponent } from 'src/app/components/alertas/alertas.component';

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
  listaDatosRotulo: TipoDatoRotulo[] = [];
  listaJhon: Requerimiento[];
  // lista de los requerimientos
  listaRequerimientos: any = [];
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

  // @HostListener('window:popstate', ['$event']) onPopState(event: Event) {
  //   console.log('Back button pressed');
  //   var mensaje;
  //   var opcion = confirm("Clicka en Aceptar o Cancelar");
  //   if (opcion == true) {
  //       mensaje = "Has clickado OK";
	// } else {
  //     mensaje = "Has clickado Cancelar";
  //     event.cancelable 
	// }

  // }

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
  //   window.onbeforeunload = function() {
  //     console.log("entraaaaaaaaa refresh")
  //     return "Leaving this page will reset the wizard";
  // };
    this.href = this.router.url;
   
          //cuando presione el reload
    /* $(window).bind('load', function () {
       let mensajes=new AlertasComponent();
       mensajes.refresh();
       return false
       // alert("ojjjjjjjjjjjjjjjjjjjjjjjjj");
       //this.blockUI.start("cargando");
       //return 'are you sure you want to leave?';
       //this.alertAgregar();
 
     });*/

    /*window.onbeforeunload = function() {
      //this.preventDefault();
      let mensajes=new AlertasComponent();
      mensajes.refresh();
      return mensajes.refresh();//false //"¿Desea recargar la página web?";
    };*///



    /*window.addEventListener('load',function(e){
      e.preventDefault();
      let mensajes=new AlertasComponent();
      mensajes.refresh();
      //return false
    });*/

    window.addEventListener('keydown', (function (e) {
      /*if ((e.which || e.keyCode) == 116 || ((e.which || e.keyCode) == 82 && ctrlKeyDown)) {
        // Pressing F5 or Ctrl+R
        e.preventDefault();*/
      if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82) {
        e.preventDefault();
        let mensajes = new AlertasComponent();
        mensajes.refresh();
        //console.log("#######################"+e.which)
      }
    }))
    // this.blockUI.start("cargando");


    setTimeout(() => {
      this.blockUI.stop();
    }, 500);
    /* $(window).bind('beforeunload', function () {
       return confirm("Do you really want to refresh?");
     });*/
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
    this.listaItemsConCalificaciones = this.calificacionConocimiento.getDatos();
    this.listaDatosEventos = this.eventos.getDatos();
    this.listaDatosRotulo = this.datosRotulo.getDatos();
  }



  habilitar() {
    let mensaje = ""
    if (this.requerimiento.estaHabilitado() && this.requisitos.estaHabilitado() && this.documentosPresentar.estaHabilitado() && this.merito.estaHabilitado() && this.calificacionConocimiento.estaHabilitado() && this.eventos.estaHabilitado() && this.datosRotulo.estaHabilitado()) {
      this.lanzarConvocatoria();
    }
    else {
      if (!this.requerimiento.estaHabilitado()) {
        mensaje += "Campo Requerimiento, "
      }
      if (!this.requisitos.estaHabilitado()) {
        mensaje += "</br>Campo requisitos, "
      } if (!this.documentosPresentar.estaHabilitado()) {
        mensaje += "</br>Campo documentos a presentar, "
      } if (!this.merito.estaHabilitado()) {
        mensaje += "</br>Campo meritos, "
      } if (this.calificacionConocimiento.estaHabilitado()) {
        mensaje += "</br>Campo calificacion conocimiento, "
      } if (!this.eventos.estaHabilitado()) {
        mensaje += "</br>Campo eventos, "
      } if (!this.datosRotulo.estaHabilitado()) {
        mensaje += "</br>Campo datos rotulo, "
      }
      this.mensajeToastErrorBD(mensaje + "</br>A llenar faltantes!");
    }

  }

  //metodo para lanzar convocatoria
  lanzarConvocatoria() {
    let idConv: number = parseInt(localStorage.getItem("idConv"));
    this.editarConv.habilitarConvocatoria(idConv).subscribe(
      resultado => {
        if (resultado['resultado'] == 'correcto') {
          this.mensajeToastExito("la convocatoria esta habilitada");
        } else {
          this.mensajeToastErrorBD("no se pudo habilitar la convocatoria");
        }
      }
    )

  }

  mensajeToastErrorBD(mensaje) {
    tata.error("Error", mensaje, {
      duration: 3000
    });

  }
  mensajeToastExito(mensaje) {
    tata.success("Registro Exitoso", mensaje);
  }

  agregarBD() {
    //this.alertAgregar();
    this.recuperarLosDatosDeLosComponentes();
    this.agregarRequerimientos();
    this.agregarRequisitos();
    this.agregarDocumentosPresentar();
    this.agregarCalificaciones();
    this.agregarMeritos();
    this.agregarEventos();
    this.agregarDatosRotulo();
  }
  agregarRequerimientos() {
    if (this.listaRequerimientos.length !== 0) {
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
  agregarCalificaciones() {
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


  agregarDatosRotulo() {
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