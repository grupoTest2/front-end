import { Component, OnInit , ViewChild } from '@angular/core';
import { PostulantesAsignadasComponent } from '../../components/usuario-comision-evaluadora/postulantes-asignadas/postulantes-asignadas.component';
import { RegistroRequisitosPresentadosComponent } from '../../components/usuario-comision-evaluadora/registro-requisitos-presentados/registro-requisitos-presentados.component';
import { ConvocatoriasAsignadasComponent } from '../../components/usuario-comision-evaluadora/convocatorias-asignadas/convocatorias-asignadas.component';

import { PostulanteEvaluado } from 'src/app/models/clases/postulante/postulante-evaluado';
import { Convocatoria } from '../../models/clases/convocatoria/convocatoria';
import { Usuario } from '../../models/clases/comision/usuario';

declare var $: any;


@Component({
  selector: 'app-evaluacion-requisitos-postulante',
  templateUrl: './evaluacion-requisitos-postulante.component.html',
  styleUrls: ['./evaluacion-requisitos-postulante.component.css']
})
export class EvaluacionRequisitosPostulanteComponent implements OnInit {
  @ViewChild('postulantes') postulantes: PostulantesAsignadasComponent;
  @ViewChild('datosPost') datosPost: RegistroRequisitosPresentadosComponent;
  @ViewChild('convocatorias') convocatorias: ConvocatoriasAsignadasComponent;
  banderaPostulantes = false;
  banderaEvaluacion = false;

  usuarioComision:Usuario= new Usuario(1,"","","","");
  constructor() { 
    let datos=JSON.parse(localStorage.getItem("usuario"));
    this.usuarioComision=new Usuario(datos.idUsuario,datos.nombres,datos.apellidoPaterno,datos.apellidoMaterno,datos.correo);
    
  }

  ngOnInit(): void {
  }

  listarPos(conv:Convocatoria) {
    console.log("ingresooooooooo");
    this.banderaPostulantes = true;
    this.postulantes.listarPostulantes(conv);
    $("#postulantes").click();
    $("#postulantes").removeClass('invisible')
    this.enviarUsuario();
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
  requisitosEvaluadosPost(postulante:PostulanteEvaluado){
     this.datosPost.listarRequisitos(postulante);
  }


  enviarUsuario(){
    this.postulantes.setUsuario(this.usuarioComision);
    this.datosPost.setUsuario(this.usuarioComision);
    this.convocatorias.setUsuario(this.usuarioComision);
    return true;
  }
}
