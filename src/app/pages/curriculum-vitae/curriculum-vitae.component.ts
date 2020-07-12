import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field/form-field';


// componentes
import { DatosPersonalesComponent } from 'src/app/components/curriculum-vitae/datos-personales/datos-personales.component';
import { EstudiosCursosComponent } from 'src/app/components/curriculum-vitae/estudios-cursos/estudios-cursos.component';
import { ExperienciaExtraUniversitariaComponent } from 'src/app/components/curriculum-vitae/experiencia-extra-universitaria/experiencia-extra-universitaria.component';
import { ExperienciaUniversitariaComponent } from 'src/app/components/curriculum-vitae/experiencia-universitaria/experiencia-universitaria.component';
import { FormacionAcademicaComponent } from 'src/app/components/curriculum-vitae/formacion-academica/formacion-academica.component';
import { ProduccionComponent } from 'src/app/components/curriculum-vitae/produccion/produccion.component';


//models
import { DatosPersonales } from '../../models/curriculum-vitae/datos-personales';
import { FormacionAcademica } from '../../models/curriculum-vitae/datos-formacion-academica';
import { EstudiosCursosTomados } from '../../models/curriculum-vitae/datos-estudios-cursos-tomados';
import { ExperienciaUniversitaria } from '../../models/curriculum-vitae/datos-experiencia-universitaria';
import { ExperienciaExtraUniversitaria } from 'src/app/models/curriculum-vitae/datos-experiencia-extra-universitaria';
import { Produccion } from '../../models/curriculum-vitae/datos-produccion';
import { Idioma } from '../../models/curriculum-vitae/datos-idiomas';
import { JsonpInterceptor } from '@angular/common/http';


@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.css'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } },
  ]
})
export class CurriculumVitaeComponent implements OnInit {
  @ViewChild('datos_personales') datos_personales: DatosPersonalesComponent;
  @ViewChild('formacion_academica') formacion_academica: FormacionAcademicaComponent;
  @ViewChild('estudios_cursos') estudios_cursos: EstudiosCursosComponent;
  @ViewChild('experiencia_universitaria') experiencia_universitaria: ExperienciaUniversitariaComponent;
  @ViewChild('experiencia_extra_universitaria') experiencia_extra_universitaria: ExperienciaExtraUniversitariaComponent;
  @ViewChild('produccion') produccion: ProduccionComponent;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  isLinear = false;

  //variables para los datos de los diferentes componentes
  banderaDatosPersonales = true;
  datosPersonales: DatosPersonales;
  listaDatosFormacionAcademica: FormacionAcademica[];
  listaDatosEstudios: EstudiosCursosTomados[];
  listaExperienciaUniversitaria: ExperienciaUniversitaria[];
  listaExperienciaExtraU: ExperienciaExtraUniversitaria[];
  listaDatosProduccion: Produccion[];
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  recuperarLosDatosDeLosComponentes() {
    if (this.banderaDatosPersonales) {
      this.datosPersonales = this.datos_personales.getDatosPersonales();
    }

    console.log
    if(this.datosPersonales.getIdiomas()!=undefined){
      this.datosPersonales.getIdiomas().push(new Idioma("español", "bien", "bien", "bien"));
    }
    this.listaDatosFormacionAcademica = this.formacion_academica.getDatosFC();
    this.listaDatosEstudios = this.estudios_cursos.getDatosEC();
    this.listaExperienciaUniversitaria = this.experiencia_universitaria.getDatosEU();
    this.listaExperienciaExtraU = this.experiencia_extra_universitaria.getDatosEEU();
    this.listaDatosProduccion = this.produccion.getDatosProduccion();
    console.log(JSON.stringify(this.datosPersonales) + "          ******    " + JSON.stringify(this.datosPersonales.getIdiomas())+ "    ---------   " + JSON.stringify(this.listaDatosFormacionAcademica)+"iiiiiiiiiiiiiiiiiiii"+ JSON.stringify(this.listaDatosEstudios)+"*******1**"+JSON.stringify(this.listaExperienciaUniversitaria)+"*************2*********"+JSON.stringify(this.listaExperienciaExtraU)+"********3**********"+JSON.stringify(this.listaDatosProduccion), "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
  }

  guardar() {
    if (this.datos_personales.guardar()) {
      console.log("metodooooooooooooooooooooooooooo")
      this.recuperarLosDatosDeLosComponentes();
    }
  }

  agregarDatosCvBD() {
    /*  this.phpService.agregarDatosCv(this.datosPersonales).subscribe(
        resultado=>{
          if(resultado['resultado']=='correcto'){
            swal.fire(
              'Exitoso!',
              'Se guardaron los usuarios.',
              'success'
            ).then((result) => {
            this.router.navigate(['/convocatoriasEnCurso']);
            });
          }
        },
        error=>{
          alert("lo datos de este postulante para esta convocatoria ya existen");
        }
      
      )
    }*/
  }
}
