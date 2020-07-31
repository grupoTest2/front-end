import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm } from '@angular/forms';
import { PaisService } from 'src/app/servicios/Paises/pais.service';
import { DatosPersonales } from '../../../models/curriculum-vitae/datos-personales';

import { Router } from '@angular/router';
import { Idioma } from 'src/app/models/curriculum-vitae/datos-idiomas';
declare var tata: any;
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  name = ""
  formCurriculum: FormGroup
  formBuilder: any;
  data: any = {};
  paises: any[] = [];
  datosPersonales: DatosPersonales=new DatosPersonales("","","",new Date(),"","","","","","","","",0,"","","",new Date(),"","");
  idioma: Idioma;
  form2: NgForm = new NgForm([], []);
  form: NgForm = new NgForm([], []);
  listaIdiomas: Idioma[] = [];
  datosPostulante:any;
  apellidoPaterno = ""
  apellidoMaterno = ""
  nombres = ""
  llenoCv=false;
  banderaEgresado = false;
  constructor(private paisService: PaisService, private router: Router) {
    this.datosPostulante= JSON.parse(localStorage.getItem("postulante")); 
    this.nombres=this.datosPostulante.nombre;
    this.apellidoMaterno=this.datosPostulante.apellidoM;
    this.apellidoPaterno=this.datosPostulante.apellidoP;
    this.llenoCv=this.datosPostulante.llenoCv!=0;

  }
  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(paises => {
        this.paises = paises;
        this.paises.unshift({
          nombre: 'Seleccione un País',
          codigo: ''
        })
      });
    $('#subir').click(function () {
      window.scrollTo(0, 0);
    });
  }

  reset():void {
    this.form2.resetForm();
  }

  asignacion(form: NgForm):boolean {
    this.form2 = form;
    return true;
  }
  asignacionDatos(form: NgForm):boolean {
    this.form = form;
    return true;
  }

  eliminarInformacion(dato: Idioma): void {
    let listaAux: Idioma[] = [];
    for (let i = 0; i < this.listaIdiomas.length; i++) {
      if (!(this.listaIdiomas[i].getIdiomas() == dato.getIdiomas() &&
        this.listaIdiomas[i].getHabla() == dato.getHabla() &&
        this.listaIdiomas[i].getLee() == dato.getLee() &&
        this.listaIdiomas[i].getEscribe() == dato.getEscribe())) {
        listaAux.push(this.listaIdiomas[i]);
      }
    }
    this.listaIdiomas = listaAux;

  }

  guardar():boolean {
    let bb = false;
    if(this.guardar2()){
      this.registrar(this.form);
      bb = true;
    }
    return bb;
  }

  guardar2():boolean {
    var bandera = false;
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(
        control => {
          control.markAllAsTouched();
        }
      );
      tata.error('Error', 'Formulario invalido');
    } else {
      bandera = true;
    }
    return bandera;
  }

  guardarIdiomas(form: NgForm):void {
    if (form.invalid) {
      Object.values(form.controls).forEach(
        control => {
          control.markAllAsTouched();
        }
      );
      tata.error('Error', 'Formulario invalido');
    } else {
      tata.success('Exitoso', 'Se guardaron sus datos');
      this.enlistarIdiomas(form);
      $('#modalIdiomas').modal('hide');
    }
  }

  enlistarIdiomas(form: NgForm):void {
    let idioma = form.controls['idioma'].value;
    let habla = form.controls['habla'].value;
    let lee = form.controls['lee'].value;
    let escribe = form.controls['escribe'].value;
    this.idioma = new Idioma(idioma, habla, lee, escribe);
    this.listaIdiomas.push(this.idioma);
  }


  cambiarBanderaEgresado():void {
    this.banderaEgresado = true;
  }

  cambiarBanderaNoEgresado():void {
    this.banderaEgresado = false;
  }

  registrar(form: NgForm):void {
    let apellidoP = this.apellidoPaterno;
    let apellidoM = this.apellidoMaterno;
    let nombre = this.nombres;
    let fechaNac = form.controls['fechaNac'].value;
    const fecha = fechaNac.toLocaleString().split(' ')[0];
    let aux = fecha.split('/', 3);
    fechaNac = aux[2] + '-' + aux[1] + '-' + aux[0];
    let lugarNac = form.controls['lugar'].value;
    let ci = form.controls['ci'].value;
    let emision = form.controls['emision'].value;
    let paisN = form.controls['pais'].value;
    let genero = form.controls['genero'].value;
    let estadoCivil = form.controls['estadoCivil'].value;
    let direccion = form.controls['direccion'].value;
    let numeroDireccion = $('#numeroDomicilio').val();
    let telefono = form.controls['telefono'].value;
    let correo = form.controls['correo'].value;
    let colegio = form.controls['colegio'].value;
    let tipoColegio = form.controls['tipoColegio'].value;
    let fechaBachiller = form.controls['fechaBachiller'].value;
    const fecha2 = fechaBachiller.toLocaleString().split(' ')[0];
    let aux2 = fecha2.split('/', 3);
    fechaBachiller = aux2[2] + '-' + aux2[1] + '-' + aux2[0];
    let carrera = form.controls['carrera'].value;
    let semestre = form.controls['semestre'].value;
    this.datosPersonales = new DatosPersonales(apellidoP, apellidoM, nombre, fechaNac, lugarNac, ci, emision, paisN, genero, estadoCivil, direccion, numeroDireccion, telefono, correo, colegio, tipoColegio, fechaBachiller, carrera, semestre);
    this.datosPersonales.setIdiomas(this.listaIdiomas);
    this.datosPersonales.setEgresado(this.banderaEgresado);
    if (this.banderaEgresado) {
      let fechaEgreso = $('#fechaEgreso').val();
      const fecha3 = fechaEgreso.toLocaleString().split(' ')[0];
      let aux3 = fecha3.split('/', 3);
      fechaEgreso = aux3[2] + '-' + aux3[1] + '-' + aux3[0];
      this.datosPersonales.setFechaEgreso(fechaEgreso);
    }else{
      this.datosPersonales.setEgresado(false);
    }
  }

  getDatosPersonales(): DatosPersonales {
    return this.datosPersonales;
  }
}
