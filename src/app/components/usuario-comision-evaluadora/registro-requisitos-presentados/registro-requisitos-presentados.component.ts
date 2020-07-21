import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Requisito } from '../../../models/clases/convocatoria/requisito';
import { PostulanteEvaluado } from 'src/app/models/clases/postulante/postulante-evaluado';
import { Usuario } from 'src/app/models/clases/comision/usuario';
declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-registro-requisitos-presentados',
  templateUrl: './registro-requisitos-presentados.component.html',
  styleUrls: ['./registro-requisitos-presentados.component.css']
})
export class RegistroRequisitosPresentadosComponent implements OnInit {
  bandera = true;
  listaRequisitos: Requisito[] = [];
  listaRequisitosPresentados: Requisito[] = [];
  listaRequisitos3: Requisito[] = [];
  postulante: PostulanteEvaluado = new PostulanteEvaluado(0, 0, "", "", "", "", null);
  @Output() datosPostl = new EventEmitter();
  usuario: Usuario;
  constructor() {
  }

  ngOnInit(): void {
    this.cargarDatosPrueva2();
    //this.comparar();

  }

  cargarDatosPrueva() {
    this.listaRequisitos = [];
    let requisto1: Requisito = new Requisito("CARNET DE IDENTIDAD1", 1)
    let requisto2: Requisito = new Requisito("CARNET DE IDENTIDAD2", 1)
    let requisto3: Requisito = new Requisito("CARNET DE IDENTIDAD3", 1)
    let requisto4: Requisito = new Requisito("CARNET DE IDENTIDAD4", 1)
    let requisto5: Requisito = new Requisito("CARNET DE IDENTIDAD5", 1)
    let requisto6: Requisito = new Requisito("CARNET DE IDENTIDAD6", 1)
    let requisto7: Requisito = new Requisito("CARNET DE IDENTIDAD7", 1)
    let requisto8: Requisito = new Requisito("CARNET DE IDENTIDAD8", 1)

    this.listaRequisitos.push(requisto1);
    this.listaRequisitos.push(requisto2);
    this.listaRequisitos.push(requisto3);
    this.listaRequisitos.push(requisto4);
    this.listaRequisitos.push(requisto5);
    this.listaRequisitos.push(requisto6);
    this.listaRequisitos.push(requisto7);
    this.listaRequisitos.push(requisto8);
  }
  cargarDatosPrueva2() {
    this.cargarDatosPrueva();
    this.listaRequisitos = [];
    let requisto1: Requisito = new Requisito("CARNET DE IDENTIDAD1", 1);
    requisto1.setSeleccionado(true);
    let requisto2: Requisito = new Requisito("CARNET DE IDENTIDAD2", 2)
    let requisto3: Requisito = new Requisito("CARNET DE IDENTIDAD3", 3)
    let requisto4: Requisito = new Requisito("CARNET DE IDENTIDAD4", 4)
    let requisto5: Requisito = new Requisito("CARNET DE IDENTIDAD5", 5)
    requisto2.setSeleccionado(true);
    requisto3.setSeleccionado(true);
    requisto4.setSeleccionado(true);
    requisto5.setSeleccionado(true);

    this.listaRequisitosPresentados.push(requisto1);
    this.listaRequisitosPresentados.push(requisto2);
    this.listaRequisitosPresentados.push(requisto3);
    this.listaRequisitosPresentados.push(requisto4);
    this.listaRequisitosPresentados.push(requisto5);
    this.comparar();
  }
  comparar() {
    let listaAux=this.listaRequisitosPresentados;//.slice();
    for (let i = 0; i < this.listaRequisitos.length; i++) {
      for (let j = 0; j < listaAux.length; j++) {
        if (this.listaRequisitos[i].getDescripcion() == this.listaRequisitosPresentados[j].getDescripcion()) {
          this.listaRequisitos[i].setSeleccionado(true);
        }
      }
    }
    this.listaRequisitos3 = this.listaRequisitos;
    return true;
  }
  setSeleccionado(requisto: Requisito): void {
    if (!requisto.getSeleccionado()) {
      requisto.setSeleccionado(true);
    } else {
      requisto.setSeleccionado(false);
    }
  }

  setSeleccionadoCheck(requisto,index): void {
    $('#cheacks' + index).click();
  }
  guardraRegistro() {
    for (let index = 0; index < this.listaRequisitos.length; index++) {
      if (this.listaRequisitos[index].getSeleccionado()) {
        console.log(this.listaRequisitos[index].getDescripcion() + "----");
        console.log(JSON.stringify(this.postulante) + "+++++++++++++++++++");
      }
    }
  }

  alertConfirmacion() {
    swal.fire({
      title: 'Guardar',
      text: '¿Desea guardar el registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Exitoso!',
          'El registro fue guardado',
          'success'
        ).then(() => {
          this.guardraRegistro();
          this.redireccionPostulantes();
        });
      } else {
        swal.fire(
          'Cancelado!',
          'No se guardó el registro',
          'info'
        )
      }
    })
  }


  listarRequisitos(postulante: PostulanteEvaluado) {
    this.postulante = postulante;
    this.cargarDatosPrueva();
  }

  redireccionPostulantes() {
    this.datosPostl.emit()
  }
  setUsuario(usuario: Usuario) {
    console.log("usuarios")
    this.usuario = usuario;
  }
}
