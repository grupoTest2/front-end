import { Component, OnInit, ViewChild } from '@angular/core';
import { PostulantesAsignadasComponent } from '../../components/usuario-comision-evaluadora/postulantes-asignadas/postulantes-asignadas.component';

declare var $: any;

@Component({
  selector: 'app-evaluacion-requisitos',
  templateUrl: './evaluacion-requisitos.component.html',
  styleUrls: ['./evaluacion-requisitos.component.css']
})
export class EvaluacionRequisitosComponent implements OnInit {
  @ViewChild('postulantes') postulantes: PostulantesAsignadasComponent;
   banderaPostulantes=false;
   banderaEvaluacion=false;
  constructor() { }

  ngOnInit(): void {
  }

  listarPos(idConv: number) {
    console.log("ingresooooooooo");
    this.banderaPostulantes=true;
    this.postulantes.listarPostulantes(idConv);
    $("#postulantes").click();
    $("#postulantes").removeClass('invisible')
  }




}
