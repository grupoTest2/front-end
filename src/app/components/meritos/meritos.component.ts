import { Component, OnInit } from '@angular/core';
import { Merito } from '../../models/convocatoria-docente/merito';

@Component({
  selector: 'app-meritos',
  templateUrl: './meritos.component.html',
  styleUrls: ['./meritos.component.css']
})


export class MeritosComponent implements OnInit {

  tablasMeritos: Merito[] = [];
  indiceMerito: number = 0;
  indiceMerito2: number = 0;
  indiceSubMerito: number = 0;
  static merito1: Merito = new Merito("","",0,[]);

  constructor() {
  }


  ngOnInit(): void {
  }

  agregar(){
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloMerito1")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentaje1")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitos1")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);
    this.tablasMeritos.push(merito);
    console.log(merito);
  }

  setIndiceMerito(i: number){
    this.indiceMerito = i;
  }
  setIndiceSubMerito(j: number){
    this.indiceSubMerito = j;
  }

  // indices segundo ngFor ----------------------
  setIndiceMerito1(indiceMerito1: number, indiceMerito2: number){
    this.indiceMerito = indiceMerito1;
    this.indiceMerito2 = indiceMerito2;
  }

  getIndiceSubMerito(){
    return this.indiceSubMerito;
  }
  // segundo ngFor------------------------
  addMeritos(){
    var tituloSubMerito = (<HTMLInputElement>document.getElementById("detalleSubMerito")).value;
    var porcentajeSubMerito = parseInt((<HTMLInputElement>document.getElementById("porcentajeSubMerito")).value);
    var merito: Merito = new Merito(tituloSubMerito, '', porcentajeSubMerito, []);

    this.tablasMeritos[this.indiceSubMerito].getListaMeritos().push(merito);
    console.log(this.tablasMeritos);
  }

  // tercero ngFor -----------------------
  agregarMeritos(){
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloMerito2")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentaje2")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitos2")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);

    this.tablasMeritos[this.indiceMerito].getListaMeritos()[this.indiceMerito2].getListaMeritos().push(merito);
    console.log(this.tablasMeritos, "ngFor 3");
  }

  agregarDatosMeritos(nombre: string, descripcion: string, porcentaje: number){
    const merito: Merito = new Merito(nombre, descripcion, porcentaje, []);
    this.tablasMeritos.push(merito);
  }

  crearSubTablasMeritos(nombre: string, descripcion: string, porcentaje: number, i: number){
    const merito: Merito = new Merito(nombre, descripcion, porcentaje, []);
    this.tablasMeritos[i].getListaMeritos().push(merito);
  }

  mostrarMerito(merito:Merito){
    console.log("---------------------------------", merito);
  }
}

