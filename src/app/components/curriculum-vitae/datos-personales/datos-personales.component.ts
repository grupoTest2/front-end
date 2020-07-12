import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm } from '@angular/forms';
import { PaisService } from 'src/app/servicios/Paises/pais.service';
import { DatosPesoanles} from '../../../models/curriculum-vitae/datos-personales';

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
  name=""
  formCurriculum: FormGroup
  form: FormGroup
  formBuilder: any;
  data: any = {};
  paises: any[] = [];
  datosPersonales= new DatosPesoanles();
  idioma:Idioma;
  form2: NgForm = new NgForm([], []);
  listaIdiomas:Idioma []=[];
  constructor(private paisService: PaisService, private router: Router) {
  }
  ngOnInit( ): void {
    this.paisService.getPaises()
      .subscribe( paises => {
        this.paises = paises;
        this.paises.unshift({
          nombre: 'Seleccione un País',
          codigo: ''
        })

        console.log( this.paises );
      });
      $('#subir').click(function(){  //referimos el elemento ( clase o identificador de acción )
        window.scrollTo(0, 0);
      });
  }
  
  reset() {
    this.form2.resetForm();
  }

  asignacion(form: NgForm) {
    this.form2 = form;
    return true;
  }

  eliminarInformacion(dato: Idioma):void{
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

  guardar( form: NgForm ){
    if(form.invalid){
      Object.values(form.controls).forEach(
        control =>{
          control.markAllAsTouched();
        }
      );
      tata.error('Error','Formulario invalido');
    }else{
      this.alertRegistrar(form);
    }
  }

  guardarIdiomas(form: NgForm ){
    if(form.invalid){
      Object.values(form.controls).forEach(
        control =>{
          control.markAllAsTouched();
        }
      );
      tata.error('Error','Formulario invalido');
    }else{
      tata.success('Exitoso', 'Se guardaron sus datos');
      this.enlistarIdiomas(form);
      $('#modalIdiomas').modal('hide');
    }
  }

  enlistarIdiomas(form: NgForm){
    //listaIdiomas
    let idioma = form.controls['idioma'].value;
    let habla = form.controls['habla'].value;
    let lee = form.controls['lee'].value;
    let escribe = form.controls['escribe'].value;
    this.idioma= new Idioma(idioma,habla,lee, escribe);
    this.listaIdiomas.push(this.idioma);
    console.log(this.listaIdiomas+"         ---------------------------------------")


  }
  registrar(form: NgForm){
    let apellidoP=form.controls['apellidoP'].value;
   let apellidoM=form.controls['apellidoM'].value;
   let nombre=form.controls['nombres'].value;
   let fechaNac=form.controls['fechaNac'].value;
   let lugarNac=form.controls['lugar'].value;
   let ci=form.controls['ci'].value;
   let emision =form.controls['emision'].value;
   let paisN=form.controls['pais'].value;
   let genero=form.controls['genero'].value;
   let estadoCivil=form.controls['estadoCivil'].value;
   let direccion=form.controls['direccion'].value;
   let numeroDireccion=$('#numeroDomicilio').val();  
   let telefono=form.controls['telefono'].value;
   let correo=form.controls['correo'].value;
   let colegio=form.controls['colegio'].value;
   let tipoColegio=form.controls['tipoColegio'].value;
   let fechaBachiller =form.controls['fechaBachiller'].value;
   let carrera=form.controls['carrera'].value;
   let semestre=form.controls['semestre'].value;
   let fechaEgreso=$('#fechaEgreso').val();  
   let egreso=$('#egresado').val();  

   this.datosPersonales.setNombreUsuario(nombre);
   this.datosPersonales.setApellidoPaterno(apellidoP);
   this.datosPersonales.setApellidoMaterno(apellidoM);
   this.datosPersonales.setFechaNacimiento(fechaNac);
   this.datosPersonales.setLugarNacimiento(lugarNac);
   this.datosPersonales.setCelulaIdentidad(ci);
   this.datosPersonales.setLugarEmisionCI(emision);
   this.datosPersonales.setNacionalidad(paisN);
   this.datosPersonales.setGenero(genero);
   this.datosPersonales.setEstadoCivil(estadoCivil);
   this.datosPersonales.setDomicilioCalle(direccion);
   this.datosPersonales.setDomicilioNumero(numeroDireccion);
   this.datosPersonales.setTelefono(telefono);
   this.datosPersonales.setCorreo(correo);
   this.datosPersonales.setNombreColegio(colegio);
   this.datosPersonales.setTipoColegio(tipoColegio);
   this.datosPersonales.setFechaTituloBachillerato(fechaBachiller);
   this.datosPersonales.setCarrera(carrera);
  // this.datosPersonales.setNuvelEnCurso(semestre);
   this.datosPersonales.setEgresado(fechaEgreso);
   this.datosPersonales.setEgresado(egreso);
   
   //datos de los formacion academica.
  }


  alertRegistrar( f: NgForm): void {
    swal.fire({
      title: 'Guardar Datos',
      text: "¿Está seguro de guardar datos?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.registrar(f);
        swal.fire(
          'Exitoso!',
          'Se guardaron los usuarios.',
          'success'
        ).then((result) => {
        this.router.navigate(['/convocatoriasEnCurso']);
        });
      } else {
        swal.fire(
          'Cancelado!',
          'Los uuarios no fueron guardados.',
          'warning'
        );

      }
    });
  }
}
