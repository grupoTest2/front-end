import { Component, OnInit } from '@angular/core';
import { Merito } from '../../models/convocatoria-docente/merito';

@Component({
  selector: 'app-meritos',
  templateUrl: './meritos.component.html',
  styleUrls: ['./meritos.component.css']
})


export class MeritosComponent implements OnInit {

  tablasMeritos: Merito[] = [];

  indice1: number = 0;
  indice2: number = 0;
  indice3: number = 0;

  //detalles merito
  merito1: Merito=new Merito(" "," ",0,[]);
  tituloMerito: String=" ";
  porcentajeMerito: number=0;
  descripcionMerito: String=" ";

  constructor() {
  }

  ngOnInit(): void {
  }


  //nivel 1------------------------------------------------------------
  agregarMeritoNivel1() {
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloM1")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentajeM1")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitosM1")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);
    this.tablasMeritos.push(merito);

  }

  //nivel 2------------------------------------------------------------
  agregarMeritoNivel2() {
    var tituloSubMerito = (<HTMLInputElement>document.getElementById("titulo2")).value;
    var porcentajeSubMerito = parseInt((<HTMLInputElement>document.getElementById("porcentaje2")).value);
    var merito: Merito = new Merito( tituloSubMerito, '', porcentajeSubMerito, []);

    this.tablasMeritos[this.indice1].getListaMeritos().push(merito);
    console.log(this.tablasMeritos);
    console.log("------------------------------------------------------");
  }

  // nivel 3 ----------------------------------------------------------
  agregarMeritoNivel3() {
     var tituloMerito = (<HTMLInputElement>document.getElementById("tituloMerito3")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentaje3")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitos3")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);

    this.tablasMeritos[this.indice1].getListaMeritos()[this.indice2].getListaMeritos().push(merito);
    console.log(this.tablasMeritos, "ngFor 3 ----------------------------");
  }

// nivel 4 -----------------------------------------------------------------------
/*agregarMeritoNivel4() {
  var tituloMerito = (<HTMLInputElement>document.getElementById("tituloMerito2")).value;
  var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentaje2")).value);
  var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitos2")).value;
  var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);

  this.tablasMeritos[this.indice1].getListaMeritos()[this.indice2]
    .getListaMeritos()[this.indice3]
    .getListaMeritos().push(merito);
  console.log(this.tablasMeritos, "ngFor 3---------------------------------------");
}*/

//indice1 -------------------------------------------------------------------------------
  setIndice1(i: number) {
    this.indice1 = i;
  }
  setIndice2(j: number) {
    this.indice2 = j;
  }
  setIndice3(k: number) {
    this.indice3 = k;
  }
  setVariosIndices2(j:number, k: number) {
    this.indice1 = j;
    this.indice2 = k;
  }
  /*
  setVariosIndices3(j:number, k: number, l:number) {
    this.indice1 = j;
    this.indice2 = k;
    this.indice3 = l;
  }*/
}

