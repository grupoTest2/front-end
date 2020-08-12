import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Requisito } from '../../../models/clases/convocatoria/requisito';
import { PostulanteEvaluado } from 'src/app/models/clases/postulante/postulante-evaluado';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { HabilitacionService } from 'src/app/servicios/habilitacionPostulantes/habilitacion.service';
import { parse } from 'path';
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
  postulante: PostulanteEvaluado = new PostulanteEvaluado(0, 0, 0, "", "");
  @Output() datosPostl = new EventEmitter();
  usuario: Usuario;
  banderaSoloLectura = false;
  constructor(private habilitacion: HabilitacionService) {
  }

  ngOnInit(): void {
  }

  comparar(): void {
    for (let i = 0; i < this.listaRequisitos.length; i++) {
      for (let j = 0; j < this.listaRequisitosPresentados.length; j++) {
        if (this.listaRequisitos[i].getIdRequisito() == this.listaRequisitosPresentados[j].getIdRequisito()) {
          this.listaRequisitos[i].setSeleccionado(true);
        }
      }
    }
  }

  setRequisitoSeleccionado(requisto: Requisito, index): void {
    if (!this.banderaSoloLectura) {
      if (!requisto.getSeleccionado()) {
        requisto.setSeleccionado(true);
      } else {
        requisto.setSeleccionado(false);
      }
    }
  }

  guardraRegistro(): void {
    for (let index = 0; index < this.listaRequisitos.length; index++) {
      if (this.listaRequisitos[index].getSeleccionado()) {
        this.postulante.getListaRequisitos().push(this.listaRequisitos[index]);
      }
    }
    if (this.postulante.getListaRequisitos().length == this.listaRequisitos.length) {
      this.postulante.setEstado('habilitado');
    } else {
      this.postulante.setEstado('inhabilitado');
    }
    this.postulante.setNombreUsuario(this.usuario.getNombres());
    this.postulante.setIdUsuarioHab(this.usuario.getIdUsuario());
    this.guardarRequisitosPostulanteBD();
  }

  alertConfirmacion():void {
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
        this.guardraRegistro()

      } else {
        swal.fire(
          'Cancelado!',
          'No se guardó el registro',
          'info'
        )
      }
    })
  }
  Inhavilitado(value, idex) {
    $('#' + value + idex).click();
  }

  listarRequisitos(postulante: PostulanteEvaluado):void {
    this.listaRequisitos = [];
    this.listaRequisitosPresentados = [];
    this.postulante = postulante;
    this.banderaSoloLectura = false;
    this.getRequisitosConvBD();
  }

  listarRequisitosLectura(postulante: PostulanteEvaluado):void {
    this.listaRequisitos = [];
    this.listaRequisitosPresentados = [];
    this.postulante = postulante;
    this.listaRequisitosPresentados = postulante.getListaRequisitos();
    this.banderaSoloLectura = true;
    this.getRequisitosConvBD();

  }

  redireccionPostulantes():void {
    this.listaRequisitos = [];
    this.listaRequisitosPresentados = [];
    this.datosPostl.emit()
  }
  setUsuario(usuario: Usuario):void {
    this.usuario = usuario;
  }

  getRequisitosConvBD():void {
    this.habilitacion.getRequisitosConv(this.postulante.getIdConv()).subscribe(
      resp => {
        for (let i in resp) {
          this.listaRequisitos.push(new Requisito(resp[i].descripcion, resp[i].idRequisito));
        }
        this.comparar();
      }
    )
  }

  guardarRequisitosPostulanteBD():void {
    let datos={
      "postulante": this.postulante,
      "idItem": parseInt(localStorage.getItem('idca'))
    }
    console.log(JSON.stringify(datos));
    this.habilitacion.registrarCumplimientoRequisitos(datos).subscribe(
      resp => {
        if (resp == 'correcto') {
          swal.fire(
            'Exitoso!',
            'El registro fue guardado',
            'success'
          ).then(() => {
            this.redireccionPostulantes();
          })
        } 
      }
    )
  }
}
