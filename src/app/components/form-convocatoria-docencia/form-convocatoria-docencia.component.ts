import { Component, OnInit } from '@angular/core';
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
    selecionado:null,
    hrsMes:null
  }
  lista:Object[]= new Array();
  prueba=null;
  ngOnInit(): void {
    this.getNombreMaterias();
    this.xd();
  }
  getNombreMaterias(){
    this.apiPHP.getNombreMaterias().subscribe(
      result=> {
        //this.materias=result
        for (let elemento in result){
          this.lista.push(result[elemento]);
        }
      }

    );
    //alert(this.materias);
  }
  xd(){
    const usersJson: any[] = Array.of(this.materias);
    console.log(this.lista);
    let miarray: number[] = [1,2,3,4,5];
    console.log("tpy aqui");
    for (let elemento of miarray) {
      console.log(elemento);
    }
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
