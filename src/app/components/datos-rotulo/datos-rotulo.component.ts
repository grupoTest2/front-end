import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { SeleccionTipoDatoRotulo } from 'src/app/models/convocatoria/seleccion-tipo-dato-rotulo';
import { TipoDatoRotulo } from 'src/app/models/clases/convocatoria/tipo-dato-rotulo';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { logging } from 'protractor';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Evento } from 'src/app/models/clases/convocatoria/evento';
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-datos-rotulo',
  templateUrl: './datos-rotulo.component.html',
  styleUrls: ['./datos-rotulo.component.css']
})
export class DatosRotuloComponent implements OnInit {

  listaAseleccionarr: string[] = ['codigo sis', 'nombre', 'apellido paterno', 'apellido materno', 'correo electronico', 'carrera', 'edad']

  seleccionTodo: boolean = true;

  bandera: boolean = true;
  bandera2: boolean = true;

  seleccion: SeleccionTipoDatoRotulo;
  contador: number = 0;
  numeroDeEnLista:number=0;
  href: string = '';

  banderaAuxiliar =false;
  
  constructor(private apiPHP: PhpServeConvocatoria,private editarConv: EditarConvocatoriaServicePhp, private router: Router) {
    this.getTipoDatosRotulo();
    this.getTipoDatosRotuloBD();
  }
  ngOnInit(): void {
    this.href = this.router.url;
    $('.switch').click(function () {
      $(this).toggleClass("switchOn");
    });
  }

  ruta(){
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    }else{
      return false;
    }
  }
  
  cambioBandera(index: number): void {
    if (this.bandera && this.contador == this.seleccion.getListaTiposDatosRotulo().length) {
      this.bandera = false;
      this.seleccionTodo = true;
      $('.switch').click();
    }
    if (this.seleccion.getListaTiposDatosRotulo()[index].getSeleccionado()) {
      this.seleccion.getListaTiposDatosRotulo()[index].setSeleccionado(false);
      this.contador -= 1;
    } else {
      this.seleccion.getListaTiposDatosRotulo()[index].setSeleccionado(true);
      this.contador += 1;
    }
    if (this.contador == this.seleccion.getListaTiposDatosRotulo().length||this.contador ==this.numeroDeEnLista) {
      this.bandera = true;
      this.seleccionTodo = true;
      $('.switch').click();
    }
  }

  limppiar(){
    for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
      this.seleccion.getListaTiposDatosRotulo()[i].setSeleccionado(false);
    }
  }

  cambio() {
    if (this.bandera) {
      this.contador = 0;
      if (this.seleccionTodo) {
        for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
          this.seleccion.getListaTiposDatosRotulo()[i].setSeleccionado(true);
          this.contador += 1;
        }
        this.seleccionTodo = false;
      }
      else {
        for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
          this.seleccion.getListaTiposDatosRotulo()[i].setSeleccionado(false);
        }
        this.seleccionTodo = true;
      }
    }
    this.bandera = true;
  }

  guardar() {
    this.contador = 0;
    this.bandera = true;
    this.bandera2 = true;
    let conteoEnLista=0;
    for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
     if(this.seleccion.getListaTiposDatosRotulo()[i].getSeleccionado()){
      this.seleccion.getListaTiposDatosRotulo()[i].setEnLista(true);
      this.seleccion.getListaTiposDatosRotulo()[i].setAccion("insertar");
      conteoEnLista+=1;
     }
    }
    console.log(this.seleccion.getListaTiposDatosRotulo());
    this. numeroDeEnLista=this.seleccion.getListaTiposDatosRotulo().length-conteoEnLista;
  }

  ocultarBtnGuardar(){
    let bandera3=true;
    if(this.banderaAuxiliar){
    for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
      if(!this.seleccion.getListaTiposDatosRotulo()[i].getEnLista()){
        bandera3=false;
      }
     }
    }
     return bandera3;
  }

  presionando(){
    $('.switch').click();
  }

  getDatos(){
    let   listaDatosR: TipoDatoRotulo[] = [];
    for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
          if(this.seleccion.getListaTiposDatosRotulo()[i].getEnLista()){
            listaDatosR.push(this.seleccion.getListaTiposDatosRotulo()[i]);
          }      
    }
    return listaDatosR;
  }
  
  /**
   *indica si la convocatoria es apta para ser lanzada 
   */
  estaHabilitado(){
    return this.seleccion.cantDatosEnLista() > 0;
    
  }

  /**
   * metodos que interactuan con la base de datos
   */
  getTipoDatosRotulo() {
    let listaTipos: object[] = new Array();
    this.apiPHP.getTipoDatosRotulo().subscribe(
      resultado => {
        for (let i in resultado) {
          listaTipos.push(resultado[i]);
        }
        this.seleccion = new SeleccionTipoDatoRotulo(listaTipos);
        //console.log(JSON.stringify(this.seleccion.getListaTiposDatosRotulo()));sss
      }
    );
  }
  /**
   * recupera la configuracion de una convocatoria
   */
  getTipoDatosRotuloBD(){
    let idConv: number= parseInt(localStorage.getItem("idConv"));
    this.editarConv.getDatosRotulo(idConv).subscribe(
      resultado=>{
        for(let i in resultado){
          console.log("------------------------lista datos");
          console.log(resultado[i]);
          this.seleccion.setDatoRotulo(resultado[i].nombre);
        }
        this.banderaAuxiliar=true;
      }
    )
  }


}