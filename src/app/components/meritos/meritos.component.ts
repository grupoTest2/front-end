import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meritos',
  templateUrl: './meritos.component.html',
  styleUrls: ['./meritos.component.css']
})


export class MeritosComponent implements OnInit {

  Merito = {
    nombre: null,
    porcenaje: null,
    descripcion: null,
    listaMeritos: [],
    subMeritos: []
  };

  listaMeritos = {
    nombre: null,
    porcenaje: null,
    subMeritos: []
  };

  subMeritos = {
    nombre: null,
    porcenaje: null,
    descripcion: null
  };

 tablaMeritos: any[] = [];
 listaSubMeritos: any[] = [];

  constructor() {
  }


  ngOnInit(): void {
  }

  agregar(){
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloMerito1")).value;
    var porcentaje = (<HTMLInputElement>document.getElementById("porcentaje1")).value;
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitos1")).value;
    this.tablaMeritos.push({
      nombre: tituloMerito,
      porcentaje: porcentaje,
      descripcion: descripcionMerito,
      listaMeritos: [],
      subMeritos: []
    });
    console.log(tituloMerito, porcentaje);
  }

  addSubMeritos(){
    var tituloSubMerito = (<HTMLInputElement>document.getElementById("detalleSubMerito")).value;
    var porcentajeSubMerito = (<HTMLInputElement>document.getElementById("porcentajeSubMerito")).value;
    this.listaSubMeritos.push(
      {
        tituloSubMerito: tituloSubMerito,
        porcentajeSubMerito: porcentajeSubMerito
      }
    );
    this.tablaMeritos[0].listaMeritos.push ({
      tituloSubMerito: tituloSubMerito,
      porcentajeSubMerito: porcentajeSubMerito
    });
    console.log(tituloSubMerito, porcentajeSubMerito)
  }
}

