import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CalificacionConocimiento } from 'src/app/models/convocatoria-docente/calificacion-conocimiento';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tematica } from '../../models/clases/crear-convocatoria/tematica';
import { SeleccionCalificacion } from 'src/app/models/convocatoria-docente/seleccion-calificacion-conocimientos';
import { CalifiaccionConocimientoAuxLabo } from 'src/app/models/convocatoria-laboratorio/califiaccionConocimiento';
import { Requerimiento } from 'src/app/models/clases/crear-convocatoria/requerimiento';

// import * as $ from 'jquery';

declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-calificacion-conocimientos',
  templateUrl: './calificacion-conocimientos.component.html',
  styleUrls: ['./calificacion-conocimientos.component.css']
})
export class CalificacionConocimientosComponent implements OnInit {

  calificacion: CalificacionConocimiento;
  listaCalificacion: CalificacionConocimiento[] = [];
  seleccionCalificacionCono: SeleccionCalificacion;
  formCalificacion: FormGroup;

  href: string = "";

  /*----- evento para envio de datos ------------*/
  @Output() datosCalificacionConocimiento = new EventEmitter();

  //lista de calificaciom conocimientos de laboratorio
  listaConocimientosAxLabo: CalifiaccionConocimientoAuxLabo[] = [];
  listaTematicas: String[] = [];

  //agregando a la lista tematicas los codigos de los items requerimineto
  listaItems: Requerimiento[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.seleccionCalificacionCono = new SeleccionCalificacion();
    this.buildForm();
  }

  ngOnInit(): void {
    this.href = this.router.url;
  }

  save(event: Event) {
    event.preventDefault();
    if (this.formCalificacion.valid) {
      const value = this.formCalificacion.value;
    } else {
      this.formCalificacion.markAllAsTouched();
    }
  }

  agregarCalificacion() {
    let descripcionCalificacion = $('#descripcionCalificacion').val();
    let porcentaje = $('#porcentajeCalificacion').val();
    this.calificacion = new CalificacionConocimiento(descripcionCalificacion, porcentaje);
    let resp = this.seleccionCalificacionCono.agregarCalificacionConocimiento(this.calificacion);
    if (resp) {
      //se agrego correctamente la calificacion
    } else {
      //el porcentaje de la calificacion excede el porcenaje disponible
    }
    this.listaCalificacion = this.seleccionCalificacionCono.getListaCalifConocimientosSeleccionada();
    //this.listaCalificacion.push(this.calificacion);

  }

  getindice(indice: number) {
    let caracter: String = String.fromCharCode(indice + 65).toLocaleLowerCase() + ")     ";
    return caracter;
  }

  /*-------------- metodo para recuperar los datos de este componente*/
  getDatos() {
    return this.listaItems;
  }


  rutaActual() {
    if (this.href === '/crearConvocatoria/tipo/2') {
      return true;
    } else {
      return false;
    }
  }

  //nuevsa pruebas 
  setListaRequerimiento(listaRequeriminetos) {
    this.listaItems = listaRequeriminetos;
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getListaTematica().length == 0) {
        for (let j = 0; j < this.listaTematicas.length; j++) {
          this.listaItems[i].getListaTematica().push(new Tematica(this.listaTematicas[j], 0));
        }
      }
    }
  }

  agregarTematica() {
    var nombreTematica = $('#nombreTematica').val();
    this.listaTematicas.push(nombreTematica);
    var aux = 0;
    var contador = 0;
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getNotaDisponible() > 0) {
        let id: any = this.listaItems[i].getnombreMateria();
        let nota = parseInt((<HTMLInputElement>document.getElementById(id)).value);
        if ((<HTMLInputElement>document.getElementById(id)).value === "") {
          nota = 0;
          aux++;
        }
        let tematica: Tematica = new Tematica(nombreTematica, nota);
        // this.listaItems[i].getListaTematica().push(tematica);
        if (!this.listaItems[i].agregarTematica(tematica)) {

        }
      }
      else {
        for (let j = 0; j < this.listaTematicas.length; j++) {
          if (this.listaItems[i].getListaTematica().length <= j)
            this.listaItems[i].getListaTematica().push(new Tematica(this.listaTematicas[j], 0));
        }
      }
    }
    tata.success('Agregado.', 'Se agregó la tematica con exito.');
    this.formCalificacion.reset();
    $('#modalConocimientoAuxL2').modal('hide');
  }


  //validaciones -------------------------------------------------------------------------------
  private buildForm() {
    this.formCalificacion = this.formBuilder.group({
      detalle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(/[a-zA-Z]/)])],
      nota: ['', Validators.compose([Validators.min(1), Validators.pattern(/^\d*$/)])]
    });
  }

  resetForm() {
    this.buildForm();
  }

  validarNota() {
    var aux = 0;
    var contador = 0;
    var bandera = false;
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getNotaDisponible() > 0) {
        let id: any = this.listaItems[i].getnombreMateria();
        if ((<HTMLInputElement>document.getElementById(id)).value === "") {
          aux++;
        }
        else {
          let id: any = this.listaItems[i].getnombreMateria();
          let nota = parseInt((<HTMLInputElement>document.getElementById(id)).value);
          if (nota > this.listaItems[i].getNotaDisponible()) {
            aux++;
            console.log("error al insertar debudo a que exede la nota disponible" + this.listaItems[i].getnombreMateria());
            bandera = true;
          }
        }
        contador++;
      }
    }
    if (aux == contador || bandera) {
      tata.error('Error', 'La tematica debe tener minimo una nota asignada');
    } else {
      this.agregarTematica();
    }
  }

  formValido() {
    if (this.formCalificacion.valid) {
      this.validarNota();
    } else {
      this.formCalificacion.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }

  get detalle() {
    return this.formCalificacion.get('detalle');
  }
  get detalleIsValid() {
    return this.detalle.touched && this.detalle.valid;
  }
  get detalleIsInvalid() {
    return this.detalle.touched && this.detalle.invalid;
  }

  get nota() {
    return this.formCalificacion.get('nota');
  }
  get notaIsValid() {
    return this.nota.touched && this.nota.valid;
  }
  get notaIsInvalid() {
    return this.nota.touched && this.nota.invalid;
  }
}
