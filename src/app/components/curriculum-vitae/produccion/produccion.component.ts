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


  listaInformacionProduc: Produccion[] = [];
  datoInfoPrd: Produccion;

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

      $('#modalProduccion').modal('hide');
      tata.success('Exitoso', 'Se guardaron sus datos');
      this.enlistarDatosFormacion(form);
    }
  }
  enlistarDatosFormacion(form: NgForm) {
    let titulo = form.controls['titulo'].value;
    let tipoDifusion = form.controls['tipoDifusion'].value;
    let medioPublicacion = form.controls['medioPublicacion'].value;
    let institucion = form.controls['institucion'].value;
    let fechaConclusion = form.controls['fechaConclusion'].value;
    const fecha = fechaConclusion.toLocaleString().split(' ')[0];
    let aux = fecha.split('/', 3);
    fechaConclusion = aux[2] + '-' + aux[1] + '-' + aux[0];

    this.datoInfoPrd = new Produccion(titulo, tipoDifusion, medioPublicacion, institucion, fechaConclusion);
    this.listaInformacionProduc.push(this.datoInfoPrd);

  }

  eliminarInformacion(dato: Produccion) {
    let listaAux: Produccion[] = [];
    for (let i = 0; i < this.listaInformacionProduc.length; i++) {
      if (!(this.listaInformacionProduc[i].getTituloDocumento() == dato.getTituloDocumento() &&
        this.listaInformacionProduc[i].getTipoDifusion() == dato.getTipoDifusion() &&
        this.listaInformacionProduc[i].getMdioPublicacion() == dato.getMdioPublicacion() &&
        this.listaInformacionProduc[i].getInstitucionEntrega() == dato.getInstitucionEntrega() &&
        this.listaInformacionProduc[i].getFechaConclusion() == dato.getFechaConclusion())) {
        listaAux.push(this.listaInformacionProduc[i]);
      }
    }
    this.listaInformacionProduc = listaAux;
  }
  getDatosProduccion():Produccion[]{
    return this.listaInformacionProduc;
  }
}
