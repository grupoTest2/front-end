import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/clases/convocatoria/item'
import { Convocatoria } from '../../models/clases/convocatoria/convocatoria';
declare var $: any;

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
    return this.hora;
  }


  buscarCodigo() {
    let codigo=$('#codigo').val();
    if (codigo == "12345") {
      this.bandera = true;
    }
    return this.bandera;
  }

  limpiarDatos(){
    $('#codigo').val("");
    this.bandera = false;
  }

  guardarDatos(){
    console.log("----++++++++++--------+++++++++")
  }

}
