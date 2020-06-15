import { Component, OnInit } from '@angular/core';

//validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//servicio
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';

//models
import { Evento } from 'src/app/models/clases/convocatoria/evento';
import { SeleccionEventos } from 'src/app/models/convocatoria/seleccion-eventos';

//jquery toast 
declare var tata: any;
declare var $: any;
declare function init_plugins();

@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  //Formulario
  formEventos: FormGroup
  evento: Evento;
  listaEventosSeleccionados: Evento[] = [];
  listaEventos: Object[] = new Array();
  seleccionEventos: SeleccionEventos;

  constructor(private apiPHP: PhpServeConvocatoria, private formBuilder: FormBuilder) {
    this.buildForm();
    this.seleccionEventos = new SeleccionEventos();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 5, 12, 31);
    this.maxDate = new Date(currentYear + 5, 12, 31);
  }

  ngOnInit(): void {
    init_plugins();
    $('.clockpicker').clockpicker();
  }

  agregarEvento(): void {
    let nombreNombre = $('#nombreEvento').val();
    let fecha = $('#fecha').val();
    let hora = $('#hora').val();
    //creamos el evento
    this.evento = new Evento(nombreNombre, fecha, hora);
    //agregamos el evento
    let resp = this.seleccionEventos.agregarEvento(this.evento);
    if (resp==='exito') {
      //la fecha es valida respecto a la anterior
      tata.success('Agregado.', 'Se agregó con exito.');
      $('#tablaFechas').modal('hide');
      this.formEventos.reset();
      $('#hora').val("");

    } else {
      //fecha incorrecta
       //tata.error('Error', 'debe ser una fecha posterior a la ultima');
       this.ErrorAlInsertarEvento(resp);
       //$('#hora').val("");
    }
    this.listaEventosSeleccionados = this.seleccionEventos.getListaEventosSeleccionados();
    this.seleccionEventos.convertirEventosBD();
  }

  ErrorAlInsertarEvento(mensaje:string='Formulario invalido'){
    this.formEventos.markAllAsTouched();
      tata.error('Error', mensaje);
  }

  getindice(indice: number): string {
    let caracter: string = String.fromCharCode(indice + 65).toLocaleLowerCase() + ")     ";
    return caracter;
  }


  /*-------------- metodo para recuperar los datos de este componente*/
  getDatos(): Evento[] {
    return this.listaEventosSeleccionados;
  }

  // validaciones -----------------------------------------------------
  private buildForm(): void {
    this.formEventos = this.formBuilder.group({
      evento: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      fecha: ['', [Validators.required]],
    });
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.formEventos.valid) {
      const value = this.formEventos.value;
    } else {
      this.formEventos.markAllAsTouched();
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

  formValido() {
    if (this.formEventos.valid) {
      this.agregarEvento();
    } else {
      this.formEventos.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }

  resetForm(): void {
    if (this.listaEventosSeleccionados.length == 0) {
      $('#nombreEvento').val("Publicacíon de la convocatoria");
      this.formEventos.get('evento').setErrors(null);
      $('#nombreEvento').prop('readonly', true);
      $('#nombreEvento').css("background-color", "#fff");
      this.formEventos.markAsUntouched();
      $('#hora').val("");
    } else {
      this.buildForm();
      $('#nombreEvento').prop('readonly', false);
      this.formEventos.reset();
      $('#hora').val("");
    }
  }


  //bd-----------------------------------------------------------------------
  agregarEventosBD(): void {
    this.apiPHP.agregarEventos(this.seleccionEventos.getListaEventosSeleccionados()).subscribe(
      datos => {
        alert(datos['mensaje']);
      }
    );
  }
}
