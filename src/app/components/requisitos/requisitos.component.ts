import { Component, OnInit } from '@angular/core';
import { Requisito } from 'src/app/models/convocatoria-docente/requisito';
import * as $ from 'jquery';
import { SeleccionRequisito } from 'src/app/models/convocatoria-docente/seleccion-requisitos';
@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styleUrls: ['./requisitos.component.css']
})
export class RequisitosComponent implements OnInit {
  requisito:Requisito;
  listaRequisitos:Requisito[]=[];
  seleccionRequisitos:SeleccionRequisito= new SeleccionRequisito();
  constructor() { }

  ngOnInit(): void {

  }

  agregarRequisito(){
    console.log("aqui toy");
    let descripcionRequisito = $('#descripcionRequisito').val();
    this.requisito=new Requisito(descripcionRequisito);
    this.seleccionRequisitos.agregarRequisito(this.requisito);
    this.listaRequisitos=this.seleccionRequisitos.getListaRequisitosSeleccionados();
  }
  getindice(indice:number){
    let caracter:String=String.fromCharCode(indice+97)+")     ";
    return caracter;
  }

}
