import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostulanteEvaluado } from 'src/app/models/clases/postulante/postulante-evaluado';
import { Usuario } from '../../../models/clases/comision/usuario';

@Component({
  selector: 'app-postulantes-asignadas',
  templateUrl: './postulantes-asignadas.component.html',
  styleUrls: ['./postulantes-asignadas.component.css']
})
export class PostulantesAsignadasComponent implements OnInit {


  listaPostulantes: PostulanteEvaluado[] = [];
  @Output() datosPostulante = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {
  }
  cargarDatosPrueba() {
    let postlulante1 = new PostulanteEvaluado(1,2021,"pepe","predes","gomes","sin evaluar",new Usuario(0,"","","",""));
    let postlulante2 = new PostulanteEvaluado(1,2021,"pepemmm","predes","gomes","sin evaluar",new Usuario(0,"","","",""));
    let postlulante3 = new PostulanteEvaluado(1,2021,"pepeuuu","predes","gomes","sin evaluar",new Usuario(0,"","","",""));
    let postlulante4 = new PostulanteEvaluado(1,2021,"pepajj","predes","gomes","sin evaluar",new Usuario(0,"","","",""));
    let postlulante5 = new PostulanteEvaluado(1,2021,"pepew","predes","gomes","sin evaluar",new Usuario(0,"","","",""));
    let postlulante6 = new PostulanteEvaluado(1,2021,"pepee","predes","gomes","sin evaluar",new Usuario(0,"","","",""));
    let postlulante7 = new PostulanteEvaluado(1,2021,"pepedd","predes","gomes","sin evaluar",new Usuario(0,"","","",""));
    let postlulante8 = new PostulanteEvaluado(1,2021,"pepeww","predes","gomes","sin evaluar",new Usuario(0,"","","",""));
    let postlulante9 = new PostulanteEvaluado(1,2021,"pepeuuu","predes","gomes","sin evaluar",new Usuario(0,"","","",""));


    this.listaPostulantes.push(postlulante1);
    this.listaPostulantes.push(postlulante2);
    this.listaPostulantes.push(postlulante3);
    this.listaPostulantes.push(postlulante4);
    this.listaPostulantes.push(postlulante5);
    this.listaPostulantes.push(postlulante6);
    this.listaPostulantes.push(postlulante7);
    this.listaPostulantes.push(postlulante8);
    this.listaPostulantes.push(postlulante9);

  }

  listarPostulantes(idConv) {
    console.log("estamos en postulantes");
    this.cargarDatosPrueba();
  }

  registrarRequisitos(postulante: PostulanteEvaluado) {
    console.log("primero")
    this.datosPostulante.emit(postulante);
  }

}
