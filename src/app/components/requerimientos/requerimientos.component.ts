import { Component, OnInit } from '@angular/core';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import { SeleccionMateria } from 'src/app/models/convocatoria-docente/seleccion-materias';
import { Requerimiento } from 'src/app/models/convocatoria-docente/requerimiento';
declare var swal: any;
declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {

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

  //objeto para generar que recoorra el ngFor
  requerimiento: Requerimiento;//////////////
  listaRequerimientos: Requerimiento[] = [];/////////////
  ///////////////////////////////////////////

  materias: string[] = ["mat1", "mat2", "mat3"];
  constructor(private formBuilder: FormBuilder, private apiPHP: PhpServeService) {
    this.buildForm();

  }

  ngOnInit(): void {
    this.getNombreMaterias();
  }

  // formularios con validaciones
  private buildForm() {
    this.formRequerimientos = this.formBuilder.group({
      items: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      horasMes: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      materia: ['', [Validators.required]],
    });

    this.formRequerimientos.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }
  save(event: Event) {
    event.preventDefault();
    if (this.formRequerimientos.valid) {
      const value = this.formRequerimientos.value;
      console.log(value);
    } else {
      this.formRequerimientos.markAllAsTouched();
      console.log("marca");
    }
  }

  get materiaForm() {
    return this.formRequerimientos.get('materia');
  }
  get materiaFormIsValid() {
    return this.materiaForm.touched && this.materiaForm.valid;
  }
  get materiaFormIsInvalid() {
    return this.materiaForm.touched && this.materiaForm.invalid;
  }

  get horasMes() {
    return this.formRequerimientos.get('horasMes');
  }
  get horasMesIsValid() {
    return this.horasMes.touched && this.horasMes.valid;
  }
  get horasMesIsInvalid() {
    return this.horasMes.touched && this.horasMes.invalid;
  }

  get item() {
    return this.formRequerimientos.get('items');
  }
  get itemIsValid() {
    return this.item.touched && this.item.valid;
  }
  get itemIsInvalid() {
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
  // notificaciones--------------------------------
  toastExitoso() {
    tata.success('Agregado.', 'El merito fue creado con exito.', {
      duration: 2000,
      animate: 'slide'
    });
  }
  toastError() {
    tata.error('Elinimado', 'El merito fue creado exitosamente', {
      duration: 2000,
      animate: 'slide'
    });
  }

  // metodos para almacenar lo de la interfaz
  guardarRequerimientos() {
    let numeroItems = parseInt($('#itemRequerimiento').val());
    let horasM = parseInt($('#horasMesRequerimiento').val());
    let nombreMateria = $('#seleccionaMateria').val()
    console.log("00000000", nombreMateria);
    this.requerimiento = new Requerimiento(numeroItems, horasM, nombreMateria);
    this.listaRequerimientos.push(this.requerimiento);
    console.log(this.requerimiento);
    tata.success('Agregado.', 'Se agregó con exito.');
    this.formRequerimientos.reset();
    $('#tablaRequerimientos').modal('hide');

  }
  formValido(){
    if(this.formRequerimientos.valid){
      this.guardarRequerimientos();
    }else{
      tata.error('Error', 'Formulario invalido')
    }
  }
  resetForm(){
    this.buildForm();
  }
}
