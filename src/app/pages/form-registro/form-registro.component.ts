import { Component, OnInit } from '@angular/core';

import {TipoDatoRotulo } from 'src/app/models/clases/convocatoria/tipo-dato-rotulo';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.css']
})
export class FormRegistroComponent implements OnInit {

listaDatosRotulo:TipoDatoRotulo[]=[];
  constructor() { }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(){
    this.listaDatosRotulo.push(new TipoDatoRotulo("nombre",true,true,"text"));
    this.listaDatosRotulo.push(new TipoDatoRotulo("correo",true,true,"email"));
    this.listaDatosRotulo.push(new TipoDatoRotulo("telefono",true,true,"number"));
    this.listaDatosRotulo.push(new TipoDatoRotulo("edad",true,true,"number"));
    this.listaDatosRotulo.push(new TipoDatoRotulo("correo2",true,true,"email"));
    this.listaDatosRotulo.push(new TipoDatoRotulo("codigosis",true,true,"number"));
  }
}
