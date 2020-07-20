import { Component, OnInit, ViewChild } from '@angular/core';
import { PostulantesAsignadasComponent } from '../../components/usuario-comision-evaluadora/postulantes-asignadas/postulantes-asignadas.component';
import { RegistroRequisitosPresentadosComponent } from '../../components/usuario-comision-evaluadora/registro-requisitos-presentados/registro-requisitos-presentados.component';
import { PostulanteEvaluado } from 'src/app/models/clases/postulante/postulante-evaluado';
import { Convocatoria } from '../../models/clases/convocatoria/convocatoria';

declare var $: any;

@Component({
  selector: 'app-evaluacion-requisitos',
  templateUrl: './evaluacion-requisitos.component.html',
  styleUrls: ['./evaluacion-requisitos.component.css']
})
export class EvaluacionRequisitosComponent implements OnInit {
  @ViewChild('postulantes') postulantes: PostulantesAsignadasComponent;
  @ViewChild('datosPost') datosPost: RegistroRequisitosPresentadosComponent;
  banderaPostulantes = false;
  banderaEvaluacion = false;
  constructor() { }

  ngOnInit(): void {
  }

  listarPos(conv:Convocatoria) {
    console.log("ingresooooooooo");
    this.banderaPostulantes = true;
    this.postulantes.listarPostulantes(conv);
    $("#postulantes").click();
    $("#postulantes").removeClass('invisible')
  }

  datosPostulante(postulante: PostulanteEvaluado) {
    console.log("ingresooooooooo");
    this.banderaEvaluacion = true;
    this.datosPost.listarRequisitos(postulante);
    $("#evaluacion").click();
    $("#evaluacion").removeClass('invisible')
  }

  redireccion() {
    console.log("ingresooooooooo");
    this.banderaPostulantes = true;
    $("#postulantes").click();
    $("#evaluacion").addClass('invisible')
  }
}
