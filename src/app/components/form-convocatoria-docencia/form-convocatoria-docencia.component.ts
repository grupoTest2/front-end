import { Component, OnInit } from '@angular/core';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
// import { PruebaModule } from 'src/app/modulos/prueba/prueba.module';
// import { ConsoleReporter } from 'jasmine';
import $ from "jquery";
import { SeleccionMateria } from 'src/app/models/convocatoria-docente/requerimientos';
declare var swal: any;
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
      items: ['',  Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      horasMes: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      materia: ['', [Validators.required]],
    });

    this.formRequerimientos.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }
  save(event: Event){
      event.preventDefault();
      if(this.formRequerimientos.valid){
        const value = this.formRequerimientos.value;
      console.log(value);
      }else{
        this.formRequerimientos.markAllAsTouched();
        console.log("marca");
      }
  }

  get materiaForm(){
    return this.formRequerimientos.get('materia');
  }
  get materiaFormIsValid(){
    return this.materiaForm.touched && this.materiaForm.valid;
  }
  get materiaFormIsInvalid(){
    return this.materiaForm.touched && this.materiaForm.invalid;
  }

  get horasMes(){
    return this.formRequerimientos.get('horasMes');
  }
  get horasMesIsValid(){
    return this.horasMes.touched && this.horasMes.valid;
  }
  get horasMesIsInvalid(){
    return this.horasMes.touched && this.horasMes.invalid;
  }

  get item(){
    return this.formRequerimientos.get('items');
  }
  get itemIsValid(){
    return this.item.touched && this.item.valid;
  }
  get itemIsInvalid(){
    return this.item.touched && this.item.invalid;
  }

  getNombreMaterias() {
    this.apiPHP.getNombreMaterias(this.idDepartamento).subscribe(
      result => {
        for (let i in result) {
          this.listaMaterias.push(result[i]);
        }
        this.seleccionMateria = new SeleccionMateria(this.listaMaterias);
        this.listaMateriasDisponibles = this.seleccionMateria.getListaMateriasDisponibles();
      }
    );
  }
  guardarMateria() {
    console.log(this.materia.cantidadAux);
    console.log(this.materia.hrsMes);
    console.log(this.materia.nombreMat);
    let objAux = JSON.parse(JSON.stringify(this.materia));
    this.seleccionMateria.agregarMateriaSeleccionada(objAux);
    this.materiasSeleccionadas = this.seleccionMateria.getMateriasSeleccionadas();
    //console.log(this.materiasSeleccionadas); 
    console.log("funciona el boton");
  }
  agregarMateria() {

    this.materia.cantidadAux = null;
    this.materia.hrsMes = null;
    this.listaMateriasDisponibles = this.seleccionMateria.getListaMateriasDisponibles();
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



  // crea tabla meritos-----------------------------------
  crearTablaMeritos(){
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloMerito")).value;
    var porcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    var descripcionMerito = (<HTMLInputElement>document.getElementById("descripcionMerito")).value;
    document.getElementById("tablasMeritos").innerHTML='<table class="table align-middle table-hover table-bordered">'
                                                          +'<thead class="thead-light">'+'<tr>'
                                                          +'<th class="text-center" scope="col">'+tituloMerito+'</th>'
                                                          +'<th class="text-center" scope="col">'+porcentaje+' %</th>'
                                                          +'<th class="text-center" scope="col">'
                                                          +'<button class="btn btn-outline-primary" type="button">'
                                                          +'<i class="fa fa-plus"></i>'
                                                              +'</button></th>'
                                                          +'</tr>'+'</thead>'
                                                        +'</table>'

    $('#modalMeritos').modal('hide');
    (<HTMLInputElement>document.getElementById("tituloMerito")).value = "";
    (<HTMLInputElement>document.getElementById("porcentaje")).value="";

  }

  

}
