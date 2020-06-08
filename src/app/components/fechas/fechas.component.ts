import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Evento } from 'src/app/models/clases/crear-convocatoria/evento';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { SeleccionEventos } from 'src/app/models/convocatoria-docente/seleccion-eventos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
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
  listaEventosSeleccionados: Evento[] = [];
  //lista auxiliar nomas
  listaEventos: Object[] = new Array();

  //objeto que controla los eventos
  seleccionEventos: SeleccionEventos;

//variable para enviar los datpsa al formulario
  @Output() listaEvent = new EventEmitter();

  constructor(private apiPHP: PhpServeConvocatoria, private formBuilder: FormBuilder) {
    this.buildForm();
    this.seleccionEventos=new SeleccionEventos();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 12, 31);
  }
  ngOnInit(): void {
    init_plugins();
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

   /*-------------- metodo para recuperar los datos de este componente*/
   getDatos() {
    this.listaEvent.emit(this.listaEventosSeleccionados);
  }

  getListaPrueba(){
    return ["hola1", "hola2", "hola3"];
  }






  resetForm(){
    if(this.listaEventosSeleccionados.length == 0){
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
  
  agregarEvento() {
    let nombreNombre = $('#nombreEvento').val();
    let fecha = $('#fecha').val();
    let hora = $('#hora').val();
    //creamos el evento
    this.evento=new Evento(nombreNombre,fecha,hora);
    console.log("mi eventoo "+this.evento)
    //agregamos el evento
    let resp=this.seleccionEventos.agregarEvento(this.evento);
    if(resp){
      //la fecha es valida respecto a la anterior
      tata.success('Agregado.', 'Se agregó con exito.');
    }else{
      //fecha incorrecta
      tata.error('Error', 'debe ser una fecha posterior a la ultima');
    }
    this.listaEventosSeleccionados=this.seleccionEventos.getListaEventosSeleccionados();
    this.seleccionEventos.convertirEventosBD();
    console.log(this.listaEventosSeleccionados);
    this.formEventos.reset();
    $('#tablaFechas').modal('hide');
    console.log("prueba de sabooo");
    console.log(JSON.stringify(this.listaEventosSeleccionados));
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
