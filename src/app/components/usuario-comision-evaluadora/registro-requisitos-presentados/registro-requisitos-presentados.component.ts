import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Requisito } from '../../../models/clases/convocatoria/requisito';
import { PostulanteEvaluado } from 'src/app/models/clases/postulante/postulante-evaluado';
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
  postulante: PostulanteEvaluado;
  @Output() datosPostl = new EventEmitter();

  constructor() { }

  ngOnInit(): void {  }

  cargarDatosPrueva() {
    let requisto1: Requisito = new Requisito("CARNET DE IDENTIDAD", 1)
    let requisto2: Requisito = new Requisito("CARNET DE IDENTIDAD", 1)
    let requisto3: Requisito = new Requisito("CARNET DE IDENTIDAD", 1)
    let requisto4: Requisito = new Requisito("CARNET DE IDENTIDAD", 1)
    let requisto5: Requisito = new Requisito("CARNET DE IDENTIDAD", 1)
    let requisto6: Requisito = new Requisito("CARNET DE IDENTIDAD", 1)
    let requisto7: Requisito = new Requisito("CARNET DE IDENTIDAD", 1)
    let requisto8: Requisito = new Requisito("CARNET DE IDENTIDAD", 1)

    this.listaRequisitos.push(requisto1);
    this.listaRequisitos.push(requisto2);
    this.listaRequisitos.push(requisto3);
    this.listaRequisitos.push(requisto4);
    this.listaRequisitos.push(requisto5);
    this.listaRequisitos.push(requisto6);
    this.listaRequisitos.push(requisto7);
    this.listaRequisitos.push(requisto8);
  }

  setSeleccionado(requisto: Requisito): void {
    if (!requisto.getSeleccionado()) {
      requisto.setSeleccionado(true);
    } else {
      requisto.setSeleccionado(false);
    }
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
        )
        this.guardraRegistro();
        this.redireccionPostulantes();
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

  redireccionPostulantes(){
    this.datosPostl.emit()
  }

}
