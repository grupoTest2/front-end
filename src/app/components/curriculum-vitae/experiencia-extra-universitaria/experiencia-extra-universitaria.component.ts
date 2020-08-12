import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExperienciaExtraUniversitaria } from '../../../models/curriculum-vitae/datos-experiencia-extra-universitaria';


declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-experiencia-extra-universitaria',
  templateUrl: './experiencia-extra-universitaria.component.html',
  styleUrls: ['./experiencia-extra-universitaria.component.css']
})

export class ExperienciaExtraUniversitariaComponent implements OnInit {

  max: Date;
  fechaInicio: Date;
  min:Date;
  form: NgForm = new NgForm([], []);
  listaExperienciaExtraUniversitaria: ExperienciaExtraUniversitaria[] = [];
  datoExperienciaEU: ExperienciaExtraUniversitaria;
  constructor() { 
    const dia = new Date().getDate() - 1;
    const mes = new Date().getMonth();
    const anio = new Date().getFullYear();
    this.max = new Date(anio, mes, dia);
  }

  ngOnInit(): void {
  }

  setFecha(){
    this.fechaInicio =$('#fechaI2').val();
    var fecha = ($('#fechaI2').val()).split('/');
    console.log(fecha);
    this.min = new Date(fecha[2],fecha[1]-1,fecha[0]);
    console.log(this.min,"ddddddd")
    console.log(this.fechaInicio);
    

  }

  reset():void {
    this.min = null;
    this.form.resetForm();
  }

  asignacion(form: NgForm):boolean {
    this.form = form;
    return true;
  }

  guardar(form: NgForm):void {
    this.form = form;
    if (form.invalid) {
      Object.values(form.controls).forEach(
        control => {
          control.markAllAsTouched();
        }
      );
      tata.error('Error', 'Llene todos los campos por favor');
    } else {
      $('#modalExperienciaExtraUniversitaria').modal('hide');
      tata.success('Exitoso', 'Se guardaron sus datos');
      this.enlistarDatosExperienciaEU(form);
    }
  }

  enlistarDatosExperienciaEU(form: NgForm):void {
    let nombreInstitucion = form.controls['nombreInstitucion'].value;
    let nombreCargo = form.controls['nombreCargo'].value;
    let lugar = form.controls['lugar'].value;
    let duracion = form.controls['duracion'].value;
   let fechaInicio = form.controls['fechaInicio'].value;
    const fecha = fechaInicio.toLocaleString().split(' ')[0];
    let aux = fecha.split('/', 3);
    fechaInicio = aux[2] + '-' + aux[1] + '-' + aux[0];
    let fechaConclusion = form.controls['fechaConclusion'].value;
    const fechaC = fechaConclusion.toLocaleString().split(' ')[0];
    let auxx = fechaC.split('/', 3);
    fechaConclusion = auxx[2] + '-' + auxx[1] + '-' + auxx[0];
    this.datoExperienciaEU = new ExperienciaExtraUniversitaria(nombreInstitucion, nombreCargo, lugar,duracion, fechaInicio, fechaConclusion);
    this.listaExperienciaExtraUniversitaria.push(this.datoExperienciaEU);
  }

  eliminarInformacion(dato: ExperienciaExtraUniversitaria):void {
    let listaAux: ExperienciaExtraUniversitaria[] = [];
    for (let i = 0; i < this.listaExperienciaExtraUniversitaria.length; i++) {
      if (!(this.listaExperienciaExtraUniversitaria[i].getNombreInstitucionEmpresa() == dato.getNombreInstitucionEmpresa() &&
        this.listaExperienciaExtraUniversitaria[i].getNombreCargoActividad() == dato.getNombreCargoActividad() &&
        this.listaExperienciaExtraUniversitaria[i].getLugar() == dato.getLugar() &&
        this.listaExperienciaExtraUniversitaria[i].getDuracion() == dato.getDuracion() &&
        this.listaExperienciaExtraUniversitaria[i].getFechaInicio() == dato.getFechaInicio()&&
        this.listaExperienciaExtraUniversitaria[i].getFechaFin() == dato.getFechaFin())) {
        listaAux.push(this.listaExperienciaExtraUniversitaria[i]);
      }
    }
    this.listaExperienciaExtraUniversitaria = listaAux;
  }

  
  getDatosEEU():ExperienciaExtraUniversitaria[]{
    return this.listaExperienciaExtraUniversitaria;
  }
}
