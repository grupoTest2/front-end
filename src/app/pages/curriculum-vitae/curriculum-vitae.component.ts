import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm } from '@angular/forms';
import { PaisService } from 'src/app/servicios/Paises/pais.service';
import { DatosPesoanles} from '../../models/curriculum-vitae/datos-personales';
import { FormacionAcademica} from '../../models/curriculum-vitae/datos-formacion-academica';
declare var tata: any;
declare var $: any;



@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.css']
})
export class CurriculumVitaeComponent implements OnInit {
  
  name=""
  formCurriculum: FormGroup
  form: FormGroup
  formBuilder: any;
  data: any = {};
  paises: any[] = [];
  datosPersonales= new DatosPesoanles();
  listaFormacionAcademica:FormacionAcademica[]=[];
  constructor(private paisService: PaisService) {
  }
  ngOnInit( ): void {
    this.paisService.getPaises()
      .subscribe( paises => {
        this.paises = paises;
/*
        this.paises.unshift({
          nombre: 'Seleccione un País',
          codigo: ''
        })
*/
        console.log( this.paises );
      });
      $('#subir').click(function(){  //referimos el elemento ( clase o identificador de acción )
        window.scrollTo(0, 0);
      });
  }

  guardar( form: NgForm ){
    if(form.invalid){
      Object.values(form.controls).forEach(
        control =>{
          control.markAllAsTouched();
        }
      );
    }
    // console.log()
    console.log(form.value);
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
   this.datosPersonales.setNuvelEnCurso(semestre);
   this.datosPersonales.setEgresado(fechaEgreso);
   this.datosPersonales.setEgresado(egreso);
   console.log(this.datosPersonales)



   //datos de los formacion academica.
   this.listaFormacionAcademica.push();
  }

  resetForm(): void {
    
  }

}
