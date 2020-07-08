import { Component, OnInit } from '@angular/core';

//validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//servicio
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';

//models
import { Evento } from 'src/app/models/clases/convocatoria/evento';
import { SeleccionEventos } from 'src/app/models/convocatoria/seleccion-eventos';

import { Router } from '@angular/router';


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

  seleccionEventos: SeleccionEventos;
  href: string = '';
  

  constructor(private apiPHP: PhpServeConvocatoria, 
    private formBuilder: FormBuilder,
    private editarConv:EditarConvocatoriaServicePhp,
    private router: Router) {
    this.buildForm();
    this.seleccionEventos = new SeleccionEventos();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 5, 12, 31);
    this.maxDate = new Date(currentYear + 5, 12, 31);
    this.getEventosBD();
  }

  ngOnInit(): void {
    this.href = this.router.url;
    init_plugins();
    $('.clockpicker').clockpicker();
  }

  ruta(){
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    }else{
      return false;
    }
  }

  agregarEvento(): void {
    let nombreNombre = $('#nombreEvento').val();
    let fecha = $('#fecha').val();
    let hora = $('#hora').val();
    //creamos el evento
    this.evento = new Evento(nombreNombre, fecha, hora);
    //agregamos el evento
    this.evento.setAccion("insertar");
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
    console.log(this.listaEventosSeleccionados);
    //this.seleccionEventos.convertirEventosBD();
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
      evento: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
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
  /**
   *indica si la convocatoria es apta para ser lanzada 
   */
  estaHabilitado(): string{
    return this.listaEventosSeleccionados.length>1? "bien": "establecer al menos 2 eventos!!";
  }

 /**
  * metodos que interactuan con la base de datos
  */
  getEventosBD(){
    if(localStorage.getItem("idConv")===""){
      console.log("esta vacio en los eventos");
    }else{
      let idConv: number =  parseInt(localStorage.getItem("idConv"));
      this.editarConv.getEventos(idConv).subscribe(
        resultado=>{
          for(let i in resultado){
            this.evento=new Evento(
              resultado[i].nombre,
              resultado[i].fechaFin,
              resultado[i].horaFin,
              resultado[i].horaInicio,
              resultado[i].idEvento
            );
            //this.evento.setFechaIniString(resultado[i].fechaInicio);
            //this.evento.setFechaFinString(resultado[i].fechaFin)
            this.seleccionEventos.agregarEvento(this.evento);
          }
          //console.log(this.seleccionEventos.getListaEventosSeleccionados());
          this.listaEventosSeleccionados=this.seleccionEventos.getListaEventosSeleccionados();
        }
      )
    }
  }
}
