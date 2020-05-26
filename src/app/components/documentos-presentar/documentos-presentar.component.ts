import { Component, OnInit } from '@angular/core';
import { DocumentoPresentar } from 'src/app/models/convocatoria-docente/documento-presentar';
import * as $ from 'jquery';

@Component({
  selector: 'app-documentos-presentar',
  templateUrl: './documentos-presentar.component.html',
  styleUrls: ['./documentos-presentar.component.css']
})
export class DocumentosPresentarComponent implements OnInit {
  //objeto para generar que recoorra el ngFor
  documento: DocumentoPresentar;//////////////////
  listaDocumentos: DocumentoPresentar[] = [];/////
  /////////////////////////////////////////////
  constructor() { }

  ngOnInit(): void {
  }

  // metodos para almacenar lo de la interfaz
  addDocumento() {
    let descripcionDocumento = $('#descripcionDocumento').val();
   
    this.documento = new DocumentoPresentar(descripcionDocumento);
    this.listaDocumentos.push(this.documento);
    console.log("------------------------");
    console.log(this.listaDocumentos)
  }
  getindice(indice:number){
    let caracter:String=String.fromCharCode(indice+65).toLocaleLowerCase()+") ";
    return caracter;
  }
}