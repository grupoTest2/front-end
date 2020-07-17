import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/clases/convocatoria/item'
import { Convocatoria } from '../../models/clases/convocatoria/convocatoria';
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
  hora = "";
  item: Item;
  listaItems: Item[] = [];
  convocatoria: Convocatoria;
  listaAuxiliar = ['nombre: jhonn', 'apellidos: Camacho Ledezma', 'correo: jhonnwcl@gmail.com', 'codigo_sis: 2010342'];
  bandera = false;

  constructor() {
    this.getHora();
  }

  ngOnInit(): void {
    this.cargarPruebas();
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

  getHora() {
    this.hora = "";
    let res = "PM"
    if (this.fecha.getHours().toString().length == 1) {
      this.hora += "0" + this.fecha.getHours() + ":";

    }
    else {
      this.hora += this.fecha.getHours() + ":";
    }
    if (this.fecha.getMinutes().toString().length == 1) {
      this.hora += "0" + this.fecha.getMinutes();
    }
    else {
      this.hora += this.fecha.getMinutes();
    }
    let aux = this.fecha.getHours();
    if (this.fecha.getHours() < 12) {
      res = "AM";
    }
    this.hora += " " + res;
    return this.hora;
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
    console.log(numeroDoc + "----" + hora);
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
  
  alertConfirmacion(){
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
