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

  seleccionTodo: number = null;

  seleccion: SeleccionTipoDatoRotulo;
  isChecked: boolean = false;
  isCheckedInit = false;


  constructor(private apiPHP: PhpServeConvocatoria) {
    this.getTipoDatosRotulo();
  }
  ngOnInit(): void {
  }
  /**
   * metodos que interactuan con la base de datos
   */
  getTipoDatosRotulo() {
    let listaTipos: object[] = new Array();
    console.log("----------------------------");
    console.log("----------------------------");
    console.log("----------------------------");
    console.log("----------------------------");

    this.apiPHP.getTipoDatosRotulo().subscribe(
      resultado => {
        for (let i in resultado) {
          listaTipos.push(resultado[i]);
        }
        this.seleccion = new SeleccionTipoDatoRotulo(listaTipos);
        console.log(JSON.stringify(this.seleccion.getListaTiposDatosRotulo()));
      }
    );
  }

  cambioBandera(index: number): void {
    this.isChecked =this.isCheckedInit;
    $('#select').css('toggle','false')
    if (this.seleccion.getListaTiposDatosRotulo()[index].getSeleccionado()) {
      this.seleccion.getListaTiposDatosRotulo()[index].setSeleccionado(false);
    } else {
      this.seleccion.getListaTiposDatosRotulo()[index].setSeleccionado(true);
    }
  }

  seleccionarTodo() {
    this.seleccionTodo += 1;
    if (this.seleccionTodo !== null) {
      if (this.seleccionTodo % 2 !== 0) {
        for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
          this.seleccion.getListaTiposDatosRotulo()[i].setSeleccionado(true);
        }
      }
      else {
        this.isChecked = true;
        $('#select').css('toggle','true')
        for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
          this.seleccion.getListaTiposDatosRotulo()[i].setSeleccionado(false);
        }
      }
    }
  }

}