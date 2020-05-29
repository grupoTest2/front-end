import { Component, OnInit } from '@angular/core';
import { Requerimiento } from 'src/app/models/convocatoria-docente/requerimiento';

@Component({
  selector: 'app-form-convocatoria-docencia',
  templateUrl: './form-convocatoria-docencia.component.html',
  styleUrls: ['./form-convocatoria-docencia.component.css']
})
export class FormConvocatoriaDocenciaComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {
  }

  DatosRequerimientos(requerimientos:Requerimiento[]) {
    for (let requerimiento of requerimientos) {
      console.log("nombres de las materias de reuqrimiento ->"+requerimiento.getnombreMateria());
    }
  }
  datosDocumentosPresentar(res:any){

  }

}
