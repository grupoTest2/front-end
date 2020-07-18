import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/clases/convocatoria/item'
import { Convocatoria } from '../../models/clases/convocatoria/convocatoria';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { getTestBed } from '@angular/core/testing';
declare var $: any;
declare var tata: any;
declare var swal: any;

@Component({
  selector: 'app-datos-presentados',
  templateUrl: './datos-presentados.component.html',
  styleUrls: ['./datos-presentados.component.css']
})
export class DatosPresentadosComponent implements OnInit {
  fecha: Date = new Date();
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;

  item: Item;
  listaItems: Item[] = [];
  convocatoria: Convocatoria;
  listaAuxiliar = ['nombre: jhonn', 'apellidos: Camacho Ledezma', 'correo: jhonnwcl@gmail.com', 'codigo_sis: 2010342'];
  bandera = false;

  constructor() {
  }

  ngOnInit(): void {
    this.cargarPruebas();
    this.horas = this.getHora();
    this.minutos=this.getMinutos();
    this.segundos=this.getSegundos();
    setInterval(() => {
      //this.getSegundos();
      this.segundos += 1;
      if (this.segundos == 60) {
        this.segundos = 0;
        this.minutos += 1;
      }
      if (this.minutos == 59) {
        this.horas += 1;
      }
      if (this.horas == 24) {
        this.horas = 1;
      }
      //this.segundos = this.fecha.getSeconds();
    }, 1000);
  }

  cargarPruebas() {//json()[i]["imagen"];
    this.item = new Item(1, "1", "Introduccion");
    this.listaItems.push(this.item);
    this.item = new Item(1, "1", "Elementos Y Estructura De Progra");
    this.listaItems.push(this.item);
    this.item = new Item(1, "1", "Teoria De Grafos");
    this.listaItems.push(this.item);
    this.convocatoria = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");

  }

  getHora():number {
    let hr = this.fecha.getHours();
    return hr;

  }
  getMinutos() {
    let mn = this.minutos = this.fecha.getMinutes();
    return mn;
  }
  getSegundos() {
    let sg = this.fecha.getSeconds();
    return sg;
  }

  buscarCodigo() {
    let codigo = $('#codigo').val();
    if (codigo == "12345") {
      this.bandera = true;
    }
    if (this.bandera) {
      tata.success("Exito:", "puede configurar el registro");
    }
    else {
      tata.error("Error:", "el codigo ingresaado no existe!");

    }
    return this.bandera;
  }

  limpiarDatos() {
    $('#codigo').val("");
    $('#numero_doc').val("");
    this.bandera = false;
    $('#hora').val(this.getHora() + "");
  }

  guardarDatos() {
    let numeroDoc = $('#numero_doc').val();
    let hora = $('#hora').val();
    console.log(numeroDoc + "----" + this.horas+":"+this.minutos+":"+this.segundos);
  }

  alertGuardar(): void {
    let numDocs = parseInt($('#numero_doc').val());
    if (numDocs != 13) {
      tata.error("Error:", "el numero de documentos es incompleto! ");
    }
    else {
      this.alertConfirmacion();
    }
  }

  alertConfirmacion() {
    swal.fire({
      title: 'Guardar',
      text: "¿Desea guardar los datos registrados",
      icon: 'question',//wrning
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
        this.guardarDatos();
      } else {
        swal.fire(
          'Cancelado!',
          'No se guardo el registro',
          'info'
        )
      }
    })
  }
}
