import { Component, OnInit } from '@angular/core';
import { Merito } from '../../models/convocatoria-docente/merito';

@Component({
  selector: 'app-meritos',
  templateUrl: './meritos.component.html',
  styleUrls: ['./meritos.component.css']
})


export class MeritosComponent implements OnInit {

  tablasMeritos: Merito[] = [];
  static merito1: Merito = new Merito("","",0,[]);
  static merito2: Merito = new Merito("","",0,[]);

  Merito = {
    nombre: null,
    porcenaje: null,
    descripcion: null,
    listaMeritos: []
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
 listaMeritosTabla: any[] = [];
 listaSubMeritos: any[] = [];

  constructor() {
  }


  ngOnInit(): void {
  }

  agregar(){
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloMerito1")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentaje1")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitos1")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);
    // this.tablaMeritos.push({
    //   nombre: tituloMerito,
    //   porcentaje: porcentaje,
    //   descripcion: descripcionMerito,
    //   listaMeritos: [],
    //   subMeritos: []
    // });
    this.tablasMeritos.push(merito);
    // console.log(tituloMerito, porcentaje);
    console.log(merito);
  }

  tieneDescripcion(merito:Merito): boolean{
    if(merito.getDescripcion().length != 0){
      return true;
    }else{
      return false;
    }
  }

  addMeritos(){
    var tituloSubMerito = (<HTMLInputElement>document.getElementById("detalleSubMerito")).value;
    var porcentajeSubMerito = (<HTMLInputElement>document.getElementById("porcentajeSubMerito")).value;
    this.listaMeritosTabla.push(
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

  addSubMeritos(){
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloMerito2")).value;
    var porcentaje = (<HTMLInputElement>document.getElementById("porcentaje2")).value;
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitos2")).value;
    this.listaSubMeritos.push({
      nombre: tituloMerito,
      porcentaje: porcentaje,
      descripcion: descripcionMerito
    });
    this.listaMeritos.subMeritos.push ({
      nombre: tituloMerito,
      porcentaje: porcentaje,
      descripcion: descripcionMerito
    });
    console.log(this.listaSubMeritos);

     var prueba: Merito = new Merito("Merito1","soy descripcion",1,[]); //cabezera1
     var prueba2: Merito = new Merito("Merito2","soy descripcion2",2,[]);
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

