import { Component, OnInit } from '@angular/core';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';

declare var swal: any;
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
  materiasSeleccionadas:Object[]= new Array();
  listaMaterias:Object[]=new Array();
  ngOnInit(): void {
    this.getNombreMaterias();
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
  guardarMateria(){
    console.log(this.materia.cantidadAux);
    console.log(this.materia.hrsMes);
    this.materia.nombreMat="introduccion a la programacion";
    let objAux= JSON.parse(JSON.stringify(this.materia));
    this.materiasSeleccionadas.push(objAux);
    console.log(this.materiasSeleccionadas);
  }
  agregarMateria(){
    this.materia.cantidadAux=null;
    this.materia.hrsMes=null;
  }
  agregarMateriaBD(){
    this.apiPHP.agregarMateria(this.materia).subscribe(
      datos => {
        if(datos['resultado'] == 'correcto') {}
          //indicar que se agrego correctamente
      });}
  alertEliminar(){
    swal.fire({
      title: 'Eliminar',
      text: "¿Desea eliminar el campo seleccionado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Exitoso!',
          'El campo fue eliminado.',
          'success'
        )
      }else{
        swal.fire(
          'Cancelado!',
          'El campo no fue eliminado.',
          'error'
        )
      }
    })
  }

}

