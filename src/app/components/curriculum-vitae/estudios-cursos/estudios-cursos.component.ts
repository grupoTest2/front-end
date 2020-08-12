import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


//models
import { EstudiosCursosTomados } from '../../../models/curriculum-vitae/datos-estudios-cursos-tomados';


declare var tata: any;
declare var $: any;
@Component({
  selector: 'app-estudios-cursos',
  templateUrl: './estudios-cursos.component.html',
  styleUrls: ['./estudios-cursos.component.css']
})

export class EstudiosCursosComponent implements OnInit {

  max: Date;
  form: NgForm = new NgForm([], []);
  listaEstudiosCusrsosTomados: EstudiosCursosTomados[] = [];
  estudioCurso: EstudiosCursosTomados;
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
      $('#modalEstudiosCursosTomados').modal('hide');
      tata.success('Exitoso', 'Se guardaron sus datos');
      this.enlistarDatosFormacion(form);
    }
  }
  
  enlistarDatosFormacion(form: NgForm):void {
    let tipoDocumento = form.controls['tipoDocumento'].value;
    let tituloDocumento = form.controls['tituloDocumento'].value;
    let institucion = form.controls['institucion'].value;
    let lugar = form.controls['lugar'].value;
    let fechaObtuvoDoc = form.controls['fecha'].value;
    const fecha = fechaObtuvoDoc.toLocaleString().split(' ')[0];
    let aux = fecha.split('/', 3);
    fechaObtuvoDoc = aux[2] + '-' + aux[1] + '-' + aux[0];
    this.estudioCurso = new EstudiosCursosTomados(tipoDocumento, tituloDocumento, institucion, lugar, fechaObtuvoDoc);
    this.listaEstudiosCusrsosTomados.push(this.estudioCurso);
  }

  eliminarInformacion(dato: EstudiosCursosTomados):void {
    let listaAux: EstudiosCursosTomados[] = [];
    for (let i = 0; i < this.listaEstudiosCusrsosTomados.length; i++) {
      if (!(this.listaEstudiosCusrsosTomados[i].getTipoDocumento() == dato.getTipoDocumento() &&
        this.listaEstudiosCusrsosTomados[i].getTituloDocumento() == dato.getTituloDocumento() &&
        this.listaEstudiosCusrsosTomados[i].getInstitucionObtencionDcumento() == dato.getInstitucionObtencionDcumento() &&
        this.listaEstudiosCusrsosTomados[i].getLugarObtencionDocumento() == dato.getLugarObtencionDocumento() &&
        this.listaEstudiosCusrsosTomados[i].getFechaDocumento() == dato.getFechaDocumento())) {
        listaAux.push(this.listaEstudiosCusrsosTomados[i]);
      }
    }
    this.listaEstudiosCusrsosTomados = listaAux;
  }


  getDatosEC():EstudiosCursosTomados[]{
    return this.listaEstudiosCusrsosTomados;
  }
}


