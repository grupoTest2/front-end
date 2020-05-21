import { Component, OnInit } from '@angular/core';
//import {UserService} from '../../servicios/form-convocatoria-docencia/user.service';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';
@Component({
  selector: 'app-form-convocatoria-docencia',
  templateUrl: './form-convocatoria-docencia.component.html',
  styleUrls: ['./form-convocatoria-docencia.component.css']
})
export class FormConvocatoriaDocenciaComponent implements OnInit {

  constructor(private apiPHP: PhpServeService) { }
  //la lista de materias que se obtendran de la base de datos
  materias=null;
  //objeto materia que se enviara a la base de datos
  materia={
    nombreMat:null,
    idMat:null,
    cantidadAux: null,
    hrsMes:null
  }
  ngOnInit(): void {
    this.getNombreMaterias();
  }
  getNombreMaterias(){
    this.apiPHP.getNombreMaterias().subscribe(
      result => this.materias = result
    );
  }

  agregarRequisitos(){
    document.getElementById("tablaRequisitos").innerHTML =
   '<textarea class="form-control m-3" rows="3">Hola</textarea>';
  }

}