import { Component, OnInit } from '@angular/core';
import { SeleccionTipoDatoRotulo } from 'src/app/models/convocatoria/seleccion-tipo-dato-rotulo';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { logging } from 'protractor';

declare var $:any;
@Component({
  selector: 'app-datos-rotulo',
  templateUrl: './datos-rotulo.component.html',
  styleUrls: ['./datos-rotulo.component.css']
})
export class DatosRotuloComponent implements OnInit {

    listaAseleccionarr:string[]=['codigo sis','nombre','apellido paterno', 'apellido materno', 'correo electronico', 'carrera', 'edad']

    bandera:boolean=false;
  constructor(private apiPHP: PhpServeConvocatoria) { 
    this.getTipoDatosRotulo();
  }
  ngOnInit(): void {
  }
  /**
   * metodos que interactuan con la base de datos
   */
  getTipoDatosRotulo(){
    let seleccion:SeleccionTipoDatoRotulo; 
    let listaTipos: object[] = new Array();
    this.apiPHP.getTipoDatosRotulo().subscribe(
      resultado => {
        for (let i in resultado) {
          listaTipos.push(resultado[i]);
        }
        seleccion=new SeleccionTipoDatoRotulo(listaTipos);
        console.log(JSON.stringify(seleccion.getListaTiposDatosRotulo()));
      }
    );
    console.log("----------------------------",listaTipos);
  }

  setBandera(){
    if(this.bandera)
    this.bandera=false;
    else
    this.bandera=true;
  }
}