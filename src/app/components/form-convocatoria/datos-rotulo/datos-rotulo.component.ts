import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { SeleccionTipoDatoRotulo } from 'src/app/models/convocatoria/seleccion-tipo-dato-rotulo';
import { DatoRotulo } from 'src/app/models/clases/convocatoria/dato-rotulo';
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
  seleccionTodo: boolean = true;
  seleccion: SeleccionTipoDatoRotulo = new SeleccionTipoDatoRotulo([]);
  href: string = '';
  banderaAuxiliar = true;
  banderaSitch = false;
  banderaSeleccion = false;
  banderaFormCheck = true;
  rotuloParaConvocatoria = true;
  
  constructor(private apiPHP: PhpServeConvocatoria, private editarConv: EditarConvocatoriaServicePhp, private router: Router) {
    this.getTipoDatosRotulo();

  }
  ngOnInit(): void {
    this.href = this.router.url;
    $('.switch').click(function () {
      $(this).toggleClass("switchOn");
    });
    this.seleccionRotulo(this.banderaFormCheck);
  }

  ruta():boolean {
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    } else {
      return false;
    }
  }

  seleccionRotulo(turn):void {
    if (this.banderaFormCheck) {
      $("#checkRotuloForm").click();
      this.banderaFormCheck = false;
      this.rotuloParaConvocatoria = true
    }
  }
  seleccionRotulo2(turn):void {
    if (this.rotuloParaConvocatoria) {
      this.rotuloParaConvocatoria = false;
    }
    else {
      this.rotuloParaConvocatoria = true;
    }
  }

  seleccionado(index: number): void {
    let bandera = true;
    if (this.seleccion.getListaTiposDatosRotulo()[index].getSeleccionado()) {
      this.seleccion.getListaTiposDatosRotulo()[index].setSeleccionado(false);
    }
    else {
      this.seleccion.getListaTiposDatosRotulo()[index].setSeleccionado(true);
    }
    for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
      if (!this.seleccion.getListaTiposDatosRotulo()[i].getEnLista() && !this.seleccion.getListaTiposDatosRotulo()[i].getSeleccionado()) {
        bandera = false;
      }
    }
    if (bandera && !this.banderaSitch) {
      this.banderaSeleccion = true;
      $('.switch').click();
      this.banderaSitch = true;
      this.banderaSeleccion = false;
    }
    if (!bandera && this.banderaSitch) {
      this.banderaSeleccion = true;
      $('.switch').click();
      this.banderaSitch = false;
      this.banderaSeleccion = false;
    }
  }

  enlistar():void {
    for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
      if (this.seleccion.getListaTiposDatosRotulo()[i].getSeleccionado()) {
        this.seleccion.getListaTiposDatosRotulo()[i].setEnLista(true);
        this.seleccion.getListaTiposDatosRotulo()[i].setAccion('insertar');
      }
    }
    this.banderaSitch = false;
    this.banderaSeleccion = false;
  }

  ocultarBtnGuardar():boolean {
    let bandera3 = true;
    if (this.banderaAuxiliar) {
      for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
        if (!this.seleccion.getListaTiposDatosRotulo()[i].getEnLista()) {
          bandera3 = false;
        }
      }
    }
    return bandera3;
  }

  presionando(bandera):void {
    if (!bandera && !this.banderaSeleccion) {
      if (!this.banderaSitch) {
        for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
          if (!this.seleccion.getListaTiposDatosRotulo()[i].getEnLista() && !this.seleccion.getListaTiposDatosRotulo()[i].getSeleccionado()) {
            this.seleccion.getListaTiposDatosRotulo()[i].setSeleccionado(true);
          }
        }
        this.banderaSitch = true;
      }
      else {
        for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
          if (!this.seleccion.getListaTiposDatosRotulo()[i].getEnLista() && this.seleccion.getListaTiposDatosRotulo()[i].getSeleccionado()) {
            this.seleccion.getListaTiposDatosRotulo()[i].setSeleccionado(false);
          }
        }
        this.banderaSitch = false;
      }
    }
    if (bandera && !this.banderaSeleccion) {
      $('.switch').click();
    }
  }

  getDatos():DatoRotulo[] {
    let listaDatosR: DatoRotulo[] = [];
    for (let i = 0; i < this.seleccion.getListaTiposDatosRotulo().length; i++) {
      if (this.seleccion.getListaTiposDatosRotulo()[i].getEnLista()) {
        listaDatosR.push(this.seleccion.getListaTiposDatosRotulo()[i]);
      }
    }
    return listaDatosR;
  }
  
  estaHabilitado(): string{
    return this.seleccion.estaHabilitado();
  }

  getTipoDatosRotulo():void {
    let listaTipos: object[] = []// new Array();
    this.apiPHP.getTipoDatosRotulo().subscribe(
      resultado => {
        for (let i in resultado) {
          listaTipos.push(resultado[i]);
        }
        this.seleccion = new SeleccionTipoDatoRotulo(listaTipos);
        //console.log(this.seleccion.getListaTiposDatosRotulo());
        this.getTipoDatosRotuloBD();
      }
    );
  }

  getTipoDatosRotuloBD():void {
    if (localStorage.getItem("idConv") === "") {
    }else{
      let idConv: number = parseInt(localStorage.getItem("idConv"));
      this.editarConv.getDatosRotulo(idConv).subscribe(
        resultado => {
          for (let i in resultado) {
            this.seleccion.setDatoRotulo(resultado[i].idTipo);
          }
          this.banderaAuxiliar = true;
        }
      )
    }
  }
}