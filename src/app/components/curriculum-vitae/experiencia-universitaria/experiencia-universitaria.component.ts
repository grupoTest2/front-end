import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ExperienciaUniversitaria } from '../../../models/curriculum-vitae/datos-experiencia-universitaria';


declare var tata: any;
declare var $: any;
@Component({
  selector: 'app-experiencia-universitaria',
  templateUrl: './experiencia-universitaria.component.html',
  styleUrls: ['./experiencia-universitaria.component.css']
})
export class ExperienciaUniversitariaComponent implements OnInit {

  form: NgForm = new NgForm([], []);

  listaExperienciaUniversitaria: ExperienciaUniversitaria[] = [];
  datoExperienciaU: ExperienciaUniversitaria;
  constructor() { }

  ngOnInit(): void {
  }

  reset() {
    this.form.resetForm();
  }

  asignacion(form: NgForm) {
    this.form = form;
    return true;
  }
  guardar(form: NgForm) {
    this.form = form;
    if (form.invalid) {
      Object.values(form.controls).forEach(
        control => {
          control.markAllAsTouched();
        }
      );
      tata.error('Error', 'Llene todos los campos por favor');
    } else {

      $('#modalExperienciaUniversitaria').modal('hide');
      tata.success('Exitoso', 'Se guardaron sus datos');
      this.enlistarDatosExperienciaU(form);
    }
  }
  
  enlistarDatosExperienciaU(form: NgForm) {
    let tipoGestion = form.controls['tipoGestion'].value;
    let facultad = form.controls['facultad'].value;
    let carrera = form.controls['carrera'].value;
    let materia = form.controls['materia'].value;
    let cargaHoraria = form.controls['cargaHoraria'].value;
   let titular =$('input:radio[name=titular]:checked').val();

   console.log(titular+"----------------");
   
   let bandera=true;
   if(titular=='no'){
     bandera=false;
   }   
   
   let fechaInicio = form.controls['fechaInicio'].value;
    const fecha = fechaInicio.toLocaleString().split(' ')[0];
    let aux = fecha.split('/', 3);
    fechaInicio = aux[2] + '-' + aux[1] + '-' + aux[0];


    let fechaConclusion = form.controls['fechaConclusion'].value;
    const fechaC = fechaConclusion.toLocaleString().split(' ')[0];
    let auxx = fechaC.split('/', 3);
    fechaConclusion = auxx[2] + '-' + auxx[1] + '-' + auxx[0];

    this.datoExperienciaU = new ExperienciaUniversitaria(tipoGestion, facultad, carrera, materia, cargaHoraria,bandera,fechaInicio,fechaConclusion);
    this.listaExperienciaUniversitaria.push(this.datoExperienciaU);

  }

  eliminarInformacion(dato: ExperienciaUniversitaria) {
    let listaAux: ExperienciaUniversitaria[] = [];
    for (let i = 0; i < this.listaExperienciaUniversitaria.length; i++) {
      if (!(this.listaExperienciaUniversitaria[i].getTipoDeGestion() == dato.getTipoDeGestion() &&
        this.listaExperienciaUniversitaria[i].getFacultad() == dato.getFacultad() &&
        this.listaExperienciaUniversitaria[i].getCarrera() == dato.getCarrera() &&
        this.listaExperienciaUniversitaria[i].getMateria() == dato.getMateria() &&
        this.listaExperienciaUniversitaria[i].getCargaHoraria() == dato.getCargaHoraria()&&
        this.listaExperienciaUniversitaria[i].getTitular() == dato.getTitular() &&
        this.listaExperienciaUniversitaria[i].getFechaInicio() == dato.getFechaInicio()&&
        this.listaExperienciaUniversitaria[i].getFechaFin() == dato.getFechaFin())) {
        listaAux.push(this.listaExperienciaUniversitaria[i]);
      }
    }
    this.listaExperienciaUniversitaria = listaAux;
  }

  changeValue(dato:boolean):string{
  let res="no"
  if(dato){
    res="si"
  }
    return res;
  }

  getDatosEU():ExperienciaUniversitaria[]{
    return this.listaExperienciaUniversitaria;
  }


  
}
