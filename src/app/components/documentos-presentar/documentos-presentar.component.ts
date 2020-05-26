import { Component, OnInit } from '@angular/core';
import { DocumentoPresentar } from 'src/app/models/convocatoria-docente/documento-presentar';

@Component({
  selector: 'app-documentos-presentar',
  templateUrl: './documentos-presentar.component.html',
  styleUrls: ['./documentos-presentar.component.css']
})
export class DocumentosPresentarComponent implements OnInit {
  //objeto para generar que recoorra el ngFor
  documento: DocumentoPresentar;//////////////////
  listaDocumentos: DocumentoPresentar[] = [];/////
  indice:number=0;
  /////////////////////////////////////////////
  constructor() { }

  ngOnInit(): void {
  }

  // metodos para almacenar lo de la interfaz
  guardarRequerimientos() {
    /*let descripcionDocumento = $('#descripcionDocumento').val());
    let conIndice=this.indice+") "+String.fromCharCode(68)

    this.requerimiento = new Requerimiento(numeroItems, horasM, nombreMateria);
    this.listaRequerimientos.push(this.requerimiento);
    console.log(this.requerimiento);
    console.log(String.fromCharCode(68) + "--------------------------");
    console.log(String.fromCharCode(68).toLocaleLowerCase() + "--------------------------");
  }
  
  setIndice(indice:number){
     this.indice=indice;*/
  }
}
