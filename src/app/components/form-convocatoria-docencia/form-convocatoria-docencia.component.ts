import { Component, OnInit } from '@angular/core';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {SeleccionMateria} from 'src/app/modulos/seleccion-materia/seleccion-materia.module';
// import $ from "jquery";
 var swal: any;
declare var $: any;
@Component({
  selector: 'app-form-convocatoria-docencia',
  templateUrl: './form-convocatoria-docencia.component.html',
  styleUrls: ['./form-convocatoria-docencia.component.css']
})
export class FormConvocatoriaDocenciaComponent implements OnInit {

  formRequerimientos: FormGroup;
  idDepartamento = 1;
  seleccionMateria: SeleccionMateria;
  materia = {
    nombreMat: null,
    idMat: null,
    cantidadAux: null,
    hrsMes: null
  }
  materiasSeleccionadas: Object[] = new Array();
  listaMaterias: Object[] = new Array();
  listaMateriasDisponibles: String[];

  constructor(private formBuilder: FormBuilder, private apiPHP: PhpServeService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getNombreMaterias();
  }

  // formularios con validaciones
  private buildForm() {
    this.formRequerimientos = this.formBuilder.group({
      items: ['',  [Validators.required]],
      cantidadAux: ['', [Validators.required]],
      horasMes: ['', [Validators.required]],
      materia: ['', [Validators.required]],
    });
    
    this.formRequerimientos.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }
  verificarNumero(num){
    return num>0;
  }
  save(event: Event){
      event.preventDefault();
      const value = this.formRequerimientos.value;
      console.log("dentro el save");
      console.log(value);
      
      console.log(value.items);
      console.log(value.cantidadAux);
      console.log(value.horasMes);
      console.log(value.materia);
  }



  getNombreMaterias() {
    this.apiPHP.getNombreMaterias(this.idDepartamento).subscribe(
      result => {
        for (let i in result) {
          this.listaMaterias.push(result[i]);
        }
        this.seleccionMateria = new SeleccionMateria(this.listaMaterias);
        this.listaMateriasDisponibles = this.seleccionMateria.getListaMateriasDisponibles();
  
        console.log(this.listaMateriasDisponibles);
      }
    );
  }
  guardarMateria() {
    //console.log(this.materia.cantidadAux);
    //console.log(this.materia.hrsMes);
    //console.log(this.materia.nombreMat);
    let objAux = JSON.parse(JSON.stringify(this.materia));
    this.seleccionMateria.agregarMateriaSeleccionada(objAux);
    this.materiasSeleccionadas = this.seleccionMateria.getMateriasSeleccionadas();
    //console.log(this.materiasSeleccionadas); 
    //console.log("funciona el boton");
  }
  agregarMateria() {

    this.materia.cantidadAux = null;
    this.materia.hrsMes = null;
    this.listaMateriasDisponibles = this.seleccionMateria.getListaMateriasDisponibles();
    console.log("despues de actualizar");
    console.log(this.listaMateriasDisponibles);

  }
  agregarMateriaBD() {
    this.apiPHP.agregarMateria(this.seleccionMateria.getMateriasSeleccionadas()).subscribe(
      datos => {
        alert(datos['mensaje']);
      }
    );
  }

  alertEliminar() {
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
      } else {
        swal.fire(
          'Cancelado!',
          'El campo no fue eliminado.',
          'error'
        )
      }
    })
  }
}

