import { Component, OnInit } from '@angular/core';
import { Convocatoria } from '../../../models/clases/convocatoria/convocatoria';

@Component({
  selector: 'app-convocatorias-asignadas',
  templateUrl: './convocatorias-asignadas.component.html',
  styleUrls: ['./convocatorias-asignadas.component.css']
})
export class ConvocatoriasAsignadasComponent implements OnInit {

  listaConv:Convocatoria[]=[];
  constructor() { }

  ngOnInit(): void {
    this.cargarDatosP();
  }

  cargarDatosP() {
    let convocatoria = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");
    let convocatoria1 = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");
    let convocatoria2 = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");
    let convocatoria3 = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");
    let convocatoria4 = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");
    let convocatoria5 = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");

    this.listaConv.push(convocatoria);
    this.listaConv.push(convocatoria1);
    this.listaConv.push(convocatoria2);
    this.listaConv.push(convocatoria3);
    this.listaConv.push(convocatoria4);
    this.listaConv.push(convocatoria5);

  }
}
