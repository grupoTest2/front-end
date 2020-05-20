import { Component, OnInit } from '@angular/core';
import {UserService} from '../../servicios/form-convocatoria-docencia/user.service'
@Component({
  selector: 'app-form-convocatoria-docencia',
  templateUrl: './form-convocatoria-docencia.component.html',
  styleUrls: ['./form-convocatoria-docencia.component.css']
})
export class FormConvocatoriaDocenciaComponent implements OnInit {

  constructor(private servicio: UserService) { }

  ngOnInit(): void {
    console.log("holaxdxdxd");
  }
  mensaje="no hay mensaje";
  prueba() {
    console.log("hola");
    alert("xxdxd");
    console.log("aasdasdasd");
    this.servicio.prueba().subscribe(
      datos => {
        if(datos['resultado'] == 'correcto') {
          alert(datos['mensaje']);
        }else{
          alert(datos['mensaje']);
        }
      }
    );
    alert("a ver a ver");
  }
}
