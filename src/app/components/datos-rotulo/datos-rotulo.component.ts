import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { SeleccionTipoDatoRotulo } from 'src/app/models/convocatoria/seleccion-tipo-dato-rotulo';
import { TipoDatoRotulo } from 'src/app/models/clases/convocatoria/tipo-dato-rotulo';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { logging } from 'protractor';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Evento } from 'src/app/models/clases/convocatoria/evento';

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
  constructor(private apiPHP: PhpServeConvocatoria) {
    this.getTipoDatosRotulo();
  }
  ngOnInit(): void {
    $('.switch').click(function () {
      $(this).toggleClass("switchOn");
    });
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
        //console.log(JSON.stringify(this.seleccion.getListaTiposDatosRotulo()));
      }
    );
  }

  cambioBandera(index: number): void {
    console.log(this.contador + "-----deiferencia----" + this.seleccion.getListaTiposDatosRotulo().length);

    if (this.bandera && this.contador == this.seleccion.getListaTiposDatosRotulo().length) {
      console.log(this.contador + "-----deiferencia----" + this.seleccion.getListaTiposDatosRotulo().length);
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
      conteoEnLista+=1;
     }
    }
    this. numeroDeEnLista=this.seleccion.getListaTiposDatosRotulo().length-conteoEnLista;
  }

  ocultarBtnGuardar(){
    let bandera3=true;
    for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
      if(!this.seleccion.getListaTiposDatosRotulo()[i].getEnLista()){
        bandera3=false;
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
}