import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostulanteEvaluado } from 'src/app/models/clases/postulante/postulante-evaluado';
import { Usuario } from '../../../models/clases/comision/usuario';
import { Convocatoria } from '../../../models/clases/convocatoria/convocatoria';

@Component({
  selector: 'app-postulantes-asignadas',
  templateUrl: './postulantes-asignadas.component.html',
  styleUrls: ['./postulantes-asignadas.component.css']
})
export class PostulantesAsignadasComponent implements OnInit {


  listaPostulantes: PostulanteEvaluado[] = [];
  @Output() datosPostulante = new EventEmitter();
  @Output() requisitosEvaluadosPost = new EventEmitter();
  filtroCodigo = '';
  titulo = "";
  gestion = "";
  usuario: Usuario;
  constructor() {

  }

  ngOnInit(): void {
  }

  listarTodo() {
    this.filtroCodigo = '';
  }
  cargarDatosPrueba() {
    let postlulante1 = new PostulanteEvaluado(1, 2021333, "pepe", "predes", "gomes", "inhabilitado", new Usuario(0, "", "", "", ""));
    let postlulante2 = new PostulanteEvaluado(1, 42021, "pepemmm", "predes", "gomes", "sin evaluar", new Usuario(0, "", "", "", ""));
    let postlulante3 = new PostulanteEvaluado(1, 52021, "pepeuuu", "predes", "gomes", "habilitado", new Usuario(0, "", "", "", ""));
    let postlulante4 = new PostulanteEvaluado(1, 62021, "pepajj", "predes", "gomes", "habilitado", new Usuario(0, "", "", "", ""));
    let postlulante5 = new PostulanteEvaluado(1, 7202144, "pepew", "predes", "gomes", "sin evaluar", new Usuario(0, "", "", "", ""));
    let postlulante6 = new PostulanteEvaluado(1, 82021, "pepee", "predes", "gomes", "sin evaluar", new Usuario(0, "", "", "", ""));
    let postlulante7 = new PostulanteEvaluado(1, 2021, "pepedd", "predes", "gomes", "habilitado", new Usuario(0, "", "", "", ""));
    let postlulante8 = new PostulanteEvaluado(1, 920216, "pepeww", "predes", "gomes", "sin evaluar", new Usuario(0, "", "", "", ""));
    let postlulante9 = new PostulanteEvaluado(1, 2021, "pepeuuu", "predes", "gomes", "inhabilitado", new Usuario(0, "", "", "", ""));


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

  listarPostulantes(conv: Convocatoria) {
    this.titulo = conv.getTitulo();
    this.gestion = conv.getGestion();
    console.log("estamos en postulantes");
    this.cargarDatosPrueba();
  }

  registrarRequisitos(postulante: PostulanteEvaluado) {
    console.log("primero")
    this.datosPostulante.emit(postulante);
  }
  revisarRequisitos(postulante: PostulanteEvaluado) {
    this.requisitosEvaluadosPost.emit(postulante);
  }
  setUsuario(usuario: Usuario) {
    console.log("postulantes")
    this.usuario = usuario;
  }

}
