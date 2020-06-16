import { Component, OnInit } from '@angular/core';
import { SeleccionTipoDatoRotulo } from 'src/app/models/convocatoria/seleccion-tipo-dato-rotulo';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';

@Component({
  selector: 'app-datos-rotulo',
  templateUrl: './datos-rotulo.component.html',
  styleUrls: ['./datos-rotulo.component.css']
})
export class DatosRotuloComponent implements OnInit {

  constructor(private apiPHP: PhpServeConvocatoria) { 
    this.getTipoDatosRotulo();
  }
  ngOnInit(): void {
  }

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
  }
}
