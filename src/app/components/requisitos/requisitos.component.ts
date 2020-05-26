import { Component, OnInit } from '@angular/core';
import { Requisito } from 'src/app/models/convocatoria-docente/requisito';
import * as $ from 'jquery';
@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styleUrls: ['./requisitos.component.css']
})
export class RequisitosComponent implements OnInit {
requisito:Requisito;
listaRequisito:Requisito[]=[];

  constructor() { }

  ngOnInit(): void {
  }

  agregarRequisito(){
    let descripcionRequisito = $('#descripcionRequisito').val();
    this.requisito=new Requisito(descripcionRequisito);
    this.listaRequisito.push(this.requisito);
    console.log(this.listaRequisito+"--------------------------------");
  }
  getindice(indice:number){
    let caracter:String=String.fromCharCode(indice+65).toLocaleLowerCase()+")     ";
    return caracter;
  }

}
