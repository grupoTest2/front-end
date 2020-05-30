import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/convocatoria-docente/Evento';
import * as $ from 'jquery';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';
import { SeleccionEventos } from 'src/app/models/convocatoria-docente/seleccion-eventos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var tata: any;
declare var $: any;
@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  fecha: Date;
  //Formulario
  formEventos: FormGroup

  evento: Evento;
  //los eventos seleccionados
  listaEvento: Evento[] = [];
  //lista auxiliar nomas
  listaEventos: Object[] = new Array();
  //los eventos disponibles para seleccionar
  listaEventosDisponibles: String[];
  //objeto que controla los eventos
  seleccionEventos: SeleccionEventos;
  constructor(private apiPHP: PhpServeService, private formBuilder: FormBuilder) {
    this.buildForm();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 12, 31);
    this.fecha = new Date();
  }

  ngOnInit(): void {
    this.getEventos();
  }

  private buildForm() {
    this.formEventos = this.formBuilder.group({
      evento: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
    });

    this.formEventos.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }
  save(event: Event) {
    event.preventDefault();
    if (this.formEventos.valid) {
      const value = this.formEventos.value;
      console.log(value);
    } else {
      this.formEventos.markAllAsTouched();
      console.log('marca');
    }
  }

  get eventoForm() {
    return this.formEventos.get('evento');
  }
  get eventoFormIsValid() {
    return this.eventoForm.touched && this.eventoForm.valid;
  }
  get eventoFormIsInvalid() {
    return this.eventoForm.touched && this.eventoForm.invalid;
  }

  get fechaInicioForm() {
    return this.formEventos.get('fechaInicio');
  }
  get fechaInicioIsValid() {
    return this.fechaInicioForm.touched && this.fechaInicioForm.valid;
  }
  get fechaInicioIsInvalid() {
    return this.fechaInicioForm.touched && this.fechaInicioForm.invalid;
  }

  get fechaFinForm() {
    return this.formEventos.get('fechaFin');
  }
  get fechaFinIsValid() {
    return this.fechaFinForm.touched && this.fechaFinForm.valid;
  }
  get fechaFinIsInvalid() {
    return this.fechaFinForm.touched && this.fechaFinForm.invalid;
  }
  formValido(){
    if(this.formEventos.valid){
      this.agregarEvento();
    }else{
      this.formEventos.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }
  resetForm(){
    this.buildForm();
  }

  getFechaInicio(){}

  getFechaFin(){}
  
  getEventos() {
    this.apiPHP.getEventos(1).subscribe(
      resultado => {
        for (let i in resultado) {
          this.listaEventos.push(resultado[i]);
        }
        this.seleccionEventos = new SeleccionEventos();
        this.listaEventosDisponibles = this.seleccionEventos.getListaEventosDisponibles();
        console.log(this.listaEventos);
        console.log(this.listaEventosDisponibles);
      }
    );
  }
  agregarEvento() {
    let nombreNombre = $('#nombreEvento').val();
    let fechaInicio = $('#fechaInicio').val();
    let fechaFin = $('#fechaFin').val();
    this.evento = new Evento(nombreNombre, fechaInicio, fechaFin);
    this.listaEvento.push(this.evento);
    tata.success('Agregado.', 'Se agregó con exito.');
    this.formEventos.reset();
    $('#tablaFechas').modal('hide');
    console.log(this.listaEvento + "--------------------------------");
  }
  getindice(indice: number) {
    let caracter: String = String.fromCharCode(indice + 65).toLocaleLowerCase() + ")     ";
    return caracter;
  }
  agregarEventosBD() {
    this.apiPHP.agregarEventos(this.seleccionEventos.getListaEventosSeleccionados()).subscribe(
      datos => {
        alert(datos['mensaje']);
      }
    );
  }
}
