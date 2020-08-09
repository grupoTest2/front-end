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
  nombreEventos:EventoBD[]=[];

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

  ruta():boolean{
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    }else{
      return false;
    }
  }
  quitarNombreEvento(evento:Evento){
    /*let listaAux:string[]=[];
    for(let i in this.nombreEventos){
      if(evento.getNombre()!=this.nombreEventos[i]){
        listaAux.push(this.nombreEventos[i]);
      }
    }
    this.nombreEventos=listaAux;*/
  }

  agregarEvento(): void {
    let nombreNombre = $('#nombreEvento').val();
    let fecha = $('#fecha').val();
    let hora = $('#hora').val();
    this.evento = new Evento(nombreNombre, fecha, hora);
    this.evento.setAccion("insertar");
    let resp = this.seleccionEventos.agregarEvento(this.evento);
    if (resp==='exito') {
      tata.success('Agregado.', 'Se agregó con exito.');
      $('#tablaFechas').modal('hide');
      this.formEventos.reset();
      $('#hora').val("");
    } else {
       this.ErrorAlInsertarEvento(resp);
    }
    this.listaEventosSeleccionados = this.seleccionEventos.getListaEventosSeleccionados();
  }

  ErrorAlInsertarEvento(mensaje:string='Formulario invalido'):void{
    this.formEventos.markAllAsTouched();
      tata.error('Error', mensaje);
  }

  getindice(indice: number): string {
    let caracter: string = String.fromCharCode(indice + 65).toLocaleLowerCase() + ")     ";
    return caracter;
  }

  getDatos(): Evento[] {
    return this.listaEventosSeleccionados;
  }

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

  get eventoForm():any {
    return this.formEventos.get('evento');
  }
  get eventoFormIsValid():boolean {
    return this.eventoForm.touched && this.eventoForm.valid;
  }
  get eventoFormIsInvalid():boolean {
    return this.eventoForm.touched && this.eventoForm.invalid;
  }

  get fechaForm():any {
    return this.formEventos.get('fecha');
  }

  get fechaIsValid():boolean {
    return this.fechaForm.touched && this.fechaForm.valid;
  }

  get fechaIsInvalid():boolean {
    return this.fechaForm.touched && this.fechaForm.invalid;
  }

  formValido():void {
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
  
  estaHabilitado(): string{
    return this.listaEventosSeleccionados.length>1? "bien": "establecer al menos 2 eventos!!";
  }

  getNombreEventosBD(){
    let idDep=1;
    this.apiPHP.getNombreEventos(idDep).subscribe(
      resp=>{
        for(let i in resp){
          this.nombreEventos.push(new EventoBD(resp[i].idEvento,resp[i].nombre));
        }
      }
    );
  }

  getEventosBD():void{
    if(localStorage.getItem("idConv")===""){
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

            this.seleccionEventos.agregarEvento(this.evento);
            this.quitarNombreEvento(this.evento);
          }
          this.listaEventosSeleccionados=this.seleccionEventos.getListaEventosSeleccionados();
        }
      )
    }
  }
}

export class EventoBD{
  private idEvento: number;
  private nombre: string;
  private seleccionado: boolean;
  public constructor(idEvento: number,nombre:string,seleccionado:boolean=false){
    this.idEvento= idEvento;
    this.nombre= nombre;
    this.seleccionado=seleccionado;
  }

  public getNombre(){
    return this.nombre;
  }

  public getIdEvento(){
    return this.idEvento;
  }

  public getSeleccionado(){
    return this.seleccionado;
  }
}
