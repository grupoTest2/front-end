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


  //lista de los datos de los diferentes componentes
  listaDatosRequerimientos: Requerimiento[] = [];
  listaDatosRequisitos: Requisito[] = [];
  listaDatosDocumentosPresentar: DocumentoPresentar[] = [];
  listaDatosMerito: Merito[] = [];
  listaMeritoConCalificaciones: Requerimiento[] = [];
  listaDatosEventos: Evento[] = [];

  //lista de los requerimientos
  listaRequerimientos: any = [];
  tituloConvocatoria: string = "";
  gestionConvocatoria: string = "";
  idTipo: string = "";
  bandera:boolean;
  constructor(private datosConvocatoria: DatosConvocatoriaService, private apiPHP: PhpServeConvocatoria) {
    this.tituloConvocatoria = localStorage.getItem("tituloConvocatoria");
    this.gestionConvocatoria = localStorage.getItem("gestionConvocatoria");
    this.idTipo = localStorage.getItem("idTipo");
    datosConvocatoria.idTipoConvocatoria = this.idTipo;

  }
  ngOnInit(): void {
  }

  //metodo que recu[era todos los datos]
  recuperarLosDatosDeLosComponentes() {
    this.listaRequerimientos = this.requerimiento.getDatos();
    //console.log(this.listaRequerimientos);
    this.listaDatosRequisitos = this.requisitos.getDatos();
    //console.log(this.listaDatosRequisitos);
    this.listaDatosDocumentosPresentar = this.documentosPresentar.getDatos();
    //console.log(this.listaDatosDocumentosPresentar);
    this.listaDatosMerito = this.merito.getDatos();
    //console.log("los datos de meritos son:");
    //console.log(JSON.stringify(this.listaDatosMerito));
    this.listaMeritoConCalificaciones=this.calificacionConocimiento.getDatos();
    this.listaDatosEventos = this.eventos.getDatos();
    //console.log(this.listaDatosEventos);

  }
  guardarBD(){
    this.recuperarLosDatosDeLosComponentes();
    this.bandera=true;
    if(this.bandera){
      this.agregarRequerimientos();
      if(this.bandera){
        this.bandera=this.agregarRequisitos();
        if(this.bandera){
          this.bandera=this.agregarDocumentosPresentar();
          if(this.bandera){
            this.bandera=this.agregarCalificaciones();
            if(this.bandera){
              this.bandera=this.agregarMeritos();
              if(this.bandera){
                this.bandera=this.agregarEventos();
                if(this.bandera){
                  console.log("todo posi");
                }else{
                  console.log("error en los eventos");
                }
              }else{
                console.log("error en los meritos");
              }
            }else{
              console.log("error en las calificaciones");
            }
          }else{
            console.log("error en documentos a presentar");
          }
        }else{
          console.log("error en requisitos");
        }
      }else{
        console.log("error en requerimientos")
      }
    }
  }

  agregarRequerimientos(){
    this.apiPHP.agregarRequerimientos(this.listaDatosRequerimientos).subscribe(
      respuesta=>{
        if(respuesta['resultado']=='correcto'){
          this.bandera=true;
        }
      }
    );
  }
  agregarRequisitos(){
    let res=false;
    this.apiPHP.agregarRequisitos(this.listaDatosRequisitos).subscribe(
      respuesta=>{
        if(respuesta['resultado']=='correcto'){
          res=true;
        }
      }
    );
    return res;
  }
  agregarDocumentosPresentar(){
    let res=false;
    this.apiPHP.agregarDocumentosPresentar(this.listaDatosDocumentosPresentar).subscribe(
      respuesta=>{
        if(respuesta['resultado']=='correcto'){
          res=true;
        }
      }
    );
    return res;
  }
  agregarCalificaciones(){
    let res=false;
    this.apiPHP.agregarConocimientos(this.listaMeritoConCalificaciones).subscribe(
      respuesta=>{
        if(respuesta['resultado']=='correcto'){
          res=true;
        }
      }
    );
    return res;
  }
  agregarMeritos(){
    let res=false;
    this.apiPHP.agregarMeritos(this.listaDatosMerito).subscribe(
      respuesta=>{
        if(respuesta['resultado']=='correcto'){
          res=true;
        }
      }
    );
    return res;
  }
  agregarEventos(){
    let res=false;
    this.apiPHP.agregarEventos(this.listaDatosEventos).subscribe(
      respuesta=>{
        if(respuesta['resultado']=='correcto'){
          res=true;
        }
      }
    );
    return res;
  }
  //modificando la lsta de codigos de la componente calificaciones
  setListaRequerimientos(listaRequerientos) {
    this.calificacionConocimiento.setListaRequerimiento(listaRequerientos);
    this.listaRequerimientos = listaRequerientos;
  }

}