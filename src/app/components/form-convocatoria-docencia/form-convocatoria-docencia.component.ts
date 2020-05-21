import { Component, OnInit } from '@angular/core';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';
import { ConsoleReporter } from 'jasmine';
@Component({
  selector: 'app-form-convocatoria-docencia',
  templateUrl: './form-convocatoria-docencia.component.html',
  styleUrls: ['./form-convocatoria-docencia.component.css']
})
export class FormConvocatoriaDocenciaComponent implements OnInit {

  constructor(private apiPHP: PhpServeService) { }
  //la lista de materias que se obtendran de la base de datos
  
  //objeto materia que se enviara a la base de datos
  materia={
    nombreMat:null,
    idMat:null,
    cantidadAux: null,
    hrsMes:null
  }
  listaMaterias:Object[]=new Array();
  ngOnInit(): void {
    this.getNombreMaterias();
    //this.xd();
  }
  getNombreMaterias(){
    this.apiPHP.getNombreMaterias().subscribe(
      result =>{ 
        for(let i in result){
          this.listaMaterias.push(result[i]);
        }
      }

    );
    //alert(this.materias);
  }
  xd(){
    for (let i in this.listaMaterias){
      let mat:any;
      mat=this.listaMaterias[i];
      if(mat.nombreMat=="intro"){
        mat.seleccionado=true;
      }
    }
    console.log(this.listaMaterias);
  //alert("asdasds");
  }
  agregarMateria(){
    this.apiPHP.agregarMateria(this.materia).subscribe(
      datos => {
        if(datos['resultado'] == 'correcto') {
          //indicar que se agrego correctamente

        }else{
          //no se pudo agregar
        }
      }
    );

  }

}
