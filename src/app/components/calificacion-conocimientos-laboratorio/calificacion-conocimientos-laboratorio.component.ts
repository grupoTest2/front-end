import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificacion-conocimientos-laboratorio',
  templateUrl: './calificacion-conocimientos-laboratorio.component.html',
  styleUrls: ['./calificacion-conocimientos-laboratorio.component.css']
})
export class CalificacionConocimientosLaboratorioComponent implements OnInit {

  codigos: string[] =["aux", "aux2"];
  constructor() { }

  ngOnInit(): void {
  }

}
