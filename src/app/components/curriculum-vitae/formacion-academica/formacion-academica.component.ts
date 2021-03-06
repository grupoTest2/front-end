import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormacionAcademica } from '../../../models/curriculum-vitae/datos-formacion-academica';

declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-formacion-academica',
  templateUrl: './formacion-academica.component.html',
  styleUrls: ['./formacion-academica.component.css']
})
export class FormacionAcademicaComponent implements OnInit {

  form: NgForm = new NgForm([], []);
  listaDatosFormacion: FormacionAcademica[] = [];
  datoFormacion: FormacionAcademica;
  max: Date;
  constructor() {
    const dia = new Date().getDate() - 1;
    const mes = new Date().getMonth();
    const anio = new Date().getFullYear();
    this.max = new Date(anio, mes, dia);
  }
  ngOnInit(): void {
  }

  reset():void {
    this.form.resetForm();
  }
  asignacion(form: NgForm){
    this.form=form;
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
      $('#modalFormacion').modal('hide');
      tata.success('Exitoso', 'Se guardaron sus datos');
      this.enlistarDatosFormacion(form);
    }
  }

  enlistarDatosFormacion(form: NgForm):void {
    let grado = form.controls['grado'].value;
    let titulo = form.controls['titulo'].value;
    let institucionObtuvoGrado = form.controls['institucion'].value;
    let lugarObtuvoGrado = form.controls['lugar'].value;
    let fechaObtuvoGrado = form.controls['fecha'].value;
    const fecha = fechaObtuvoGrado.toLocaleString().split(' ')[0];
    let aux = fecha.split('/', 3);
    fechaObtuvoGrado = aux[2] + '-' + aux[1] + '-' + aux[0];
    this.datoFormacion = new FormacionAcademica(grado, titulo, institucionObtuvoGrado, lugarObtuvoGrado, fechaObtuvoGrado);
    this.listaDatosFormacion.push(this.datoFormacion);
  }

  eliminarInformacion(dato:FormacionAcademica):void{
    let listaAux:FormacionAcademica []=[];
    for (let i = 0; i < this.listaDatosFormacion.length; i++) {
      if(!(this.listaDatosFormacion[i].getGrado() == dato.getGrado()&&
      this.listaDatosFormacion[i].getTitulo() == dato.getTitulo()&&
      this.listaDatosFormacion[i].getInstitucionObtuvoGrado() == dato.getInstitucionObtuvoGrado()&&
      this.listaDatosFormacion[i].getLugarObtuvoGrado() == dato.getLugarObtuvoGrado()&&
      this.listaDatosFormacion[i].getFechaObtuvoGrado() == dato.getFechaObtuvoGrado())){
        listaAux.push(this.listaDatosFormacion[i]);
      }      
    }
    this.listaDatosFormacion=listaAux;
  }
  getDatosFC():FormacionAcademica[]{
    return this.listaDatosFormacion;
  }
}
