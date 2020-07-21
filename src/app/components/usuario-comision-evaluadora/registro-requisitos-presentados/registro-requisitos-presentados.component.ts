import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Requisito } from '../../../models/clases/convocatoria/requisito';
import { PostulanteEvaluado } from 'src/app/models/clases/postulante/postulante-evaluado';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { HabilitacionService } from 'src/app/servicios/habilitacionPostulantes/habilitacion.service';
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
  postulante: PostulanteEvaluado = new PostulanteEvaluado(0,0,0,"","");
  @Output() datosPostl = new EventEmitter();
  usuario: Usuario;
  constructor(private habilitacion:HabilitacionService) {
  }

  ngOnInit(): void {
    //this.cargarDatosPrueva2();
    //this.comparar();

  }

  cargarDatosPrueva() {
    this.listaRequisitos = [];
    let requisto1: Requisito = new Requisito("CARNET DE IDENTIDAD1", 1)
    let requisto2: Requisito = new Requisito("CARNET DE IDENTIDAD2", 2)
    let requisto3: Requisito = new Requisito("CARNET DE IDENTIDAD3", 3)
    let requisto4: Requisito = new Requisito("CARNET DE IDENTIDAD4", 4)
    let requisto5: Requisito = new Requisito("CARNET DE IDENTIDAD5", 5)
    let requisto6: Requisito = new Requisito("CARNET DE IDENTIDAD6", 6)
    let requisto7: Requisito = new Requisito("CARNET DE IDENTIDAD7", 7)
    let requisto8: Requisito = new Requisito("CARNET DE IDENTIDAD8", 8)
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
  }
  comparar() {
    let listaAux=this.listaRequisitosPresentados;//.slice();
    for (let i = 0; i < this.listaRequisitos.length; i++) {
      for (let j = 0; j < listaAux.length; j++) {
        if (this.listaRequisitos[i].getIdRequisito() == listaAux[j].getIdRequisito()) {
          this.listaRequisitos[i].setSeleccionado(true);
        }
      }
    }
    return true;
  }
  prueba2(index){
  // $('#chequeo'+index).attr('checked',true);
    $('#cheacks' + index).click();
  }
  setSeleccionado(requisto: Requisito,index): void {
    if (!requisto.getSeleccionado()) {
      requisto.setSeleccionado(true);
      $('#chequeo'+index).attr('checked',true);
      $('#cheacks' + index).click();
    } else {
      requisto.setSeleccionado(false);
      $('#chequeo'+index).attr('checked',false);
    }//[checked]="requisisto.getSeleccionado()"
    //$('#cheacks' + index).click();
  }

  setSeleccionadoCheck(requisto,index): void {
    //this.setSeleccionado(requisto,index)
    }
  guardraRegistro() {
    this.postulante.setEstado("inhabilitado");
    console.log(JSON.stringify(this.listaRequisitos) + "----");
    for (let index = 0; index < this.listaRequisitos.length; index++) {
      if (this.listaRequisitos[index].getSeleccionado()) {
        //console.log(this.listaRequisitos[index].getDescripcion() + "----");
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
        this.guardraRegistro()
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
    console.log("id convocatoria: "+postulante.getIdConv());
    if(postulante.getListaRequisitos().length==0){
      console.log("cargar requisitos de la convocatoria");
      if(this.listaRequisitos.length==0){
        this.getRequisitosConvBD();
      }
    }else{
      console.log("cargar requisitos del postulante");
      this.listaRequisitos=postulante.getListaRequisitos();
    }
    //this.cargarDatosPrueva();
  }

  redireccionPostulantes() {
    this.datosPostl.emit()
  }
  setUsuario(usuario: Usuario) {
    console.log("usuarios")
    this.usuario = usuario;
  }

  //interaccion con la base de datos
  getRequisitosConvBD(){
    this.habilitacion.getRequisitosConv(this.postulante.getIdConv()).subscribe(
      resp=>{
        for(let i in resp){
          this.listaRequisitos.push(new Requisito(resp[i].descripcion,resp[i].idRequisito));
        }
      }
    )
  }
}
