import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/convocatoria-docente/Evento';
import * as $ from 'jquery';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';
import { SeleccionEventos } from 'src/app/models/convocatoria-docente/seleccion-eventos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
declare var tata: any;
declare var $: any;
declare function init_plugins();
moment.locale('es');
@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  f : Date;
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
  }
  ngOnInit(): void {
    init_plugins();
    this.getEventos();
    $('.clockpicker').clockpicker();
  }

  private buildForm() {
    this.formEventos = this.formBuilder.group({
      evento: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      fecha: ['', [Validators.required]],
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

  get fechaForm() {
    return this.formEventos.get('fecha');
  }
  get fechaIsValid() {
    return this.fechaForm.touched && this.fechaForm.valid;
  }
  get fechaIsInvalid() {
    return this.fechaForm.touched && this.fechaForm.invalid;
  }
  formValido(){
    if(this.formEventos.valid){
      this.agregarEvento();
    }else{
      this.formEventos.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }
  listaVacia(){
    
  }
  resetForm(){
    if(this.listaEvento.length == 0){
      $('#nombreEvento').val("Publicacíon de la convocatoria");
      this.formEventos.get('evento').setErrors(null);
      $('#nombreEvento').prop('readonly', true);
      $('#nombreEvento').css("background-color","#fff");
    }else{
      this.buildForm();
      $('#nombreEvento').prop('readonly', false);

    }
  }

  getFechaInicio(){}

  getFechaFin(){}

  hora(){
    $('.clockpicker').clockpicker();
  }
  
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
    let fecha = $('#fecha').val();
    let hora = $('#hora').val();
    this.f= new Date(fecha);
    console.log("qqqqqqqqq",this.f);
    this.evento = new Evento(nombreNombre, fecha, hora);
    this.listaEvento.push(this.evento);
    tata.success('Agregado.', 'Se agregó con exito.');
    this.formEventos.reset();
    $('#tablaFechas').modal('hide');
    console.log(this.evento);
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
