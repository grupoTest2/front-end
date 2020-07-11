import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Produccion } from '../../../models/curriculum-vitae/datos-produccion';


declare var tata: any;
declare var $: any;


@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent implements OnInit {


  form: NgForm = new NgForm([], []);


  listaEstudiosCusrsosTomados: Produccion[] = [];
  estudioCurso: Produccion;

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
    console.log("metodoooooooooooooooo")
    if (form.invalid) {
      Object.values(form.controls).forEach(
        control => {
          control.markAllAsTouched();
        }
      );
      tata.error('Error', 'Llene todos los campos por favor');
    } else {

      $('#modalProduccion').modal('hide');
      tata.success('Exitoso', 'Se guardaron sus datos');
      this.enlistarDatosFormacion(form);
    }
  }
  enlistarDatosFormacion(form: NgForm) {
    /*let tipoDocumento = form.controls['tipoDocumento'].value;
    let tituloDocumento = form.controls['tituloDocumento'].value;
    let institucion = form.controls['institucion'].value;
    let lugar = form.controls['lugar'].value;
    let fechaObtuvoDoc = form.controls['fecha'].value;
    const fecha = fechaObtuvoDoc.toLocaleString().split(' ')[0];
    let aux = fecha.split('/', 3);
    fechaObtuvoDoc = aux[2] + '-' + aux[1] + '-' + aux[0];

    console.log(fechaObtuvoDoc + "++++++++++++++++");

    this.estudioCurso = new EstudiosCursosTomados(tipoDocumento, tituloDocumento, institucion, lugar, fechaObtuvoDoc);
    this.listaEstudiosCusrsosTomados.push(this.estudioCurso);*/

  }

  /*eliminarInformacion(dato: EstudiosCursosTomados) {
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
  }*/
}
