import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { UsuarioComision } from 'src/app/models/clases/comision/usuario-comision';
import { TipoUsuario } from 'src/app/models/clases/comision/tipo-usuario';
import { Comision } from 'src/app/models/clases/comision/comision';
import { Tematica } from 'src/app/models/clases/convocatoria/tematica';
declare var $: any;

@Component({
  selector: 'app-asingacion-area-conocimiento',
  templateUrl: './asingacion-area-conocimiento.component.html',
  styleUrls: ['./asingacion-area-conocimiento.component.css']
})


export class AsingacionAreaConocimientoComponent implements OnInit {


  comision: Comision = new Comision(0, []);  //	constructor(idTipoComision: number,listaUsuarios:UsuarioComision[]=[]) {
  listaUsuarios: Usuario[] = [];
  listaUsuariosComision: UsuarioComision[] = [];
  listaTiposUsuario: TipoUsuario[] = [];
  listaTematicas: Tematica[] = [];
  indiceActual = 0;
  tituloActual = "";
  constructor() {
    this.agragarUsuariosPrueba();
  }

  ngOnInit(): void {
  }
  agragarUsuariosPrueba() {
    this.listaUsuarios.push(new Usuario(1, "pepe", "gomes", "lopez", "pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(2, "jose", "gomes", "lopez", "pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(3, "kewin", "gomes", "lopez", "pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(4, "josue", "gomes", "lopez", "pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(5, "cunao", "gomes", "lopez", "pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(6, "mongolo", "gomes", "lopez", "pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(7, "pepa", "gomes", "lopez", "pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(8, "felipa", "gomes", "lopez", "pepe@gmail.com"));
    this.listaTiposUsuario.push(new TipoUsuario(1, "evaluador"));
    this.listaTiposUsuario.push(new TipoUsuario(2, "veedor"));
    this.listaUsuariosComision.push(new UsuarioComision(1, "insertar", 2));
    this.listaUsuariosComision.push(new UsuarioComision(2, "insertar", 2));
    this.listaUsuariosComision.push(new UsuarioComision(3, "insertar", 1));
    this.listaUsuariosComision.push(new UsuarioComision(4, "insertar", 1));
    this.listaUsuariosComision.push(new UsuarioComision(5, "insertar", 2));
    this.listaUsuariosComision.push(new UsuarioComision(6, "insertar", 2));
    this.listaUsuariosComision.push(new UsuarioComision(7, "insertar", 1));
    this.listaUsuariosComision.push(new UsuarioComision(8, "insertar", 2));
    this.comision = new Comision(1, this.listaUsuariosComision);

    this.listaTematicas.push(new Tematica("introduccon", 0, 0));
    this.listaTematicas.push(new Tematica("psicologia", 0, 0));
    this.listaTematicas.push(new Tematica("matematicas", 0, 0));
    this.listaTematicas.push(new Tematica("matematicas", 0, 0));
    this.listaTematicas.push(new Tematica("fisica", 0, 0));
    this.listaTematicas.push(new Tematica("tecnicas", 0, 0));
    this.listaTematicas.push(new Tematica("tayjhutsu", 0, 0));

  }

  getTipoUsuario(id: number) {
    let res = "";
    for (let index = 0; index < this.comision.getListaUsuarios().length; index++) {
      if (this.comision.getListaUsuarios()[index].getIdUsuario() == this.listaUsuarios[id].getIdUsuario()) {
        for (let i = 0; i < this.listaTiposUsuario.length; i++) {
          if (this.comision.getListaUsuarios()[index].getIdTipoUsuario() == this.listaTiposUsuario[i].getIdTipoUsuario()) {
            res = this.listaTiposUsuario[i].getNombre();
          }
        }
      }
    }
    return res;
  }

  mostrarMensaje(ind: number) {
    this.indiceActual = ind;
    this.tituloActual = "Por El Usuario: " + this.listaUsuarios[this.indiceActual].getNombres() + " " + this.listaUsuarios[this.indiceActual].getApellidoPaterno() + " " + this.listaUsuarios[this.indiceActual].getApellidoMaterno();
    this.quitarSeleecionTematicas();
    $("#tablaDatosSeleccionables").modal("show");
    for (let i = 0; i < this.comision.getListaUsuarios().length; i++) {
      if (this.comision.getListaUsuarios()[i].getIdUsuario() == this.listaUsuarios[this.indiceActual].getIdUsuario()) {
        console.log("ingreso" + (i + 1));
        for (let index = 0; index < this.comision.getListaUsuarios()[i].getListaTematica().length; index++) {
          for (let j = 0; j < this.listaTematicas.length; j++) {
            if (this.listaTematicas[j].getNombre() == this.comision.getListaUsuarios()[i].getListaTematica()[index].getNombre()) {
              this.listaTematicas[j].setSeleccionado(true);
            }
          }
        }
      }
    }
  }

  seleccionado(index: number): void {
    if (this.listaTematicas[index].getSeleccionado())
      this.listaTematicas[index].setSeleccionado(false);
    else {
      this.listaTematicas[index].setSeleccionado(true);
    }
  }

  //metodo para agregar tematicas a evaluar para e usuario
  agregarTematicasEvaluar() {
    let listaTemporalTematica: Tematica[] = [];
    let banderaSeleccionado=false;
    for (let i = 0; i < this.comision.getListaUsuarios().length; i++) {
      if (this.comision.getListaUsuarios()[i].getIdUsuario() == this.listaUsuarios[this.indiceActual].getIdUsuario()) {
        for (let index = 0; index < this.listaTematicas.length; index++) {
          if (this.listaTematicas[index].getSeleccionado()) {
            listaTemporalTematica.push(this.listaTematicas[index]);
            banderaSeleccionado=true;
          }
        }
        this.comision.getListaUsuarios()[i].setListaTematica(listaTemporalTematica);
      }
    }
    this.quitarSeleecionTematicas();
    if(banderaSeleccionado){
      this.listaUsuarios[this.indiceActual].setSeleccionado(true);
    }
  }


  quitarSeleecionTematicas() {
    for (let index = 0; index < this.listaTematicas.length; index++) {
      this.listaTematicas[index].setSeleccionado(false);
    }
  }
}

