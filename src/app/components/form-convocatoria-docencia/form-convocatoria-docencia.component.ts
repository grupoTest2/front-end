import { Component, OnInit } from '@angular/core';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';
// import $ from "jquery";
declare var swal: any;
declare var $: any;
@Component({
  selector: 'app-form-convocatoria-docencia',
  templateUrl: './form-convocatoria-docencia.component.html',
  styleUrls: ['./form-convocatoria-docencia.component.css']
})
export class FormConvocatoriaDocenciaComponent implements OnInit {
  idDepartamento=1;
  seleccionMateria:SeleccionMateria;
  materia={
    nombreMat:null,
    idMat:null,
    cantidadAux: null,
    hrsMes:null
  }
  materiasSeleccionadas:Object[]= new Array();
  listaMaterias:Object[]=new Array();
  listaMateriasDisponibles:String[];

  constructor(private apiPHP: PhpServeService) { }
  
  ngOnInit(): void {
    this.getNombreMaterias();
  }
  getNombreMaterias(){
    this.apiPHP.getNombreMaterias(this.idDepartamento).subscribe(
      result =>{ 
        for(let i in result){
          this.listaMaterias.push(result[i]);
        }
      this.seleccionMateria=new SeleccionMateria(this.listaMaterias);
      this.listaMateriasDisponibles=this.seleccionMateria.getListaMateriasDisponibles();
      }
    );
  }
  guardarMateria(){
    console.log(this.materia.cantidadAux);
    console.log(this.materia.hrsMes);
    console.log(this.materia.nombreMat);
    let objAux= JSON.parse(JSON.stringify(this.materia));
    this.seleccionMateria.agregarMateriaSeleccionada(objAux);
    this.materiasSeleccionadas=this.seleccionMateria.getMateriasSeleccionadas();
    //console.log(this.materiasSeleccionadas); 
  }
  agregarMateria(){
    
    this.materia.cantidadAux=null;
    this.materia.hrsMes=null;
    this.listaMateriasDisponibles=this.seleccionMateria.getListaMateriasDisponibles();
    console.log(this.listaMateriasDisponibles);
    
  }
  agregarMateriaBD(){
    this.apiPHP.agregarMateria(this.seleccionMateria.getMateriasSeleccionadas()).subscribe(
      datos => {
         alert(datos['mensaje']);
       }
       );
    }
    
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
class SeleccionMateria{
  //mis atributos
  private materiasSeleccionadas:Object[];
  private listaMaterias:Object[];
  private listaMateriasDisponibles:String[];

  constructor(listaMat){
    this.materiasSeleccionadas=new Array();
    this.listaMaterias=listaMat;
    //console.log(this.listaMaterias);
    this.actualizarListaMatDisponibles();
  }

  public actualizarListaMatDisponibles(){
    this.listaMateriasDisponibles=new Array();
    for(let i in this.listaMaterias){
      let mat:any=this.listaMaterias[i];
      if(!mat.seleccionado){
        this.listaMateriasDisponibles.push(mat.nombreMat);
        
      }
    }
    //console.log(this.listaMateriasDisponibles);
  }
  //devuelve el id de la materia que se esta buscando
  getIdMateria(nombMat){
    let res=-1;
    for(let i in this.listaMaterias){
      let mat:any=this.listaMaterias[i];
      if(mat.nombreMat==nombMat){
        res= mat.idMat;
        break;
      }
    }
    return res;
  }

  public agregarMateriaSeleccionada(materia){
    if(materia.nombreMat!=null && materia.cantidadAux!=null && materia.hrsMes!=null){
      let idMateria=this.getIdMateria(materia.nombreMat);
      if(idMateria!=-1){
        materia.idMat=idMateria;   
        this.deshabilitarSeleccion(materia.nombreMat);
        this.materiasSeleccionadas.push(materia);
        console.log(JSON.stringify(this.materiasSeleccionadas));
      }
    }
  }

  public deshabilitarSeleccion(nombreMatForm){
    for(let i in this.listaMaterias){
      let mat:any=this.listaMaterias[i];
      if(mat.nombreMat==nombreMatForm){
        mat.seleccionado=true;
      }
    }
    this.actualizarListaMatDisponibles();
  }
  public existeMateriasSeleccionas(){
    return this.materiasSeleccionadas.length>0;
  }
  
  public getListaMateriasDisponibles(){
    return this.listaMateriasDisponibles;
  }

  public getMateriasSeleccionadas(){
    return this.materiasSeleccionadas;
  }
}
