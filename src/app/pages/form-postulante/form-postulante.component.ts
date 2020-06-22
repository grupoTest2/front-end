import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {TipoDatoRotulo } from 'src/app/models/clases/convocatoria/tipo-dato-rotulo';


@Component({
  selector: 'app-form-postulante',
  templateUrl: './form-postulante.component.html',
  styleUrls: ['./form-postulante.component.css']
})
export class FormPostulanteComponent implements OnInit {

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
