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
import { CurriculumService } from 'src/app/servicios/curriculum-vitae/curriculum.service';
import { concat } from 'rxjs';
import { Router } from '@angular/router';

declare var swal: any;

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
  botonGuardar = 0;
  isLinear = false;

  //variables para los datos de los diferentes componentes
  llenoDatosPersonales = false;
  datosPersonales: DatosPersonales = new DatosPersonales("", "", "", new Date(), "", "", "", "", "", "", "", "", 0, "", "", "", new Date(), "", "");
  listaDatosFormacionAcademica: FormacionAcademica[];
  listaDatosEstudios: EstudiosCursosTomados[];
  listaExperienciaUniversitaria: ExperienciaUniversitaria[];
  listaExperienciaExtraU: ExperienciaExtraUniversitaria[];
  listaDatosProduccion: Produccion[];

  constructor(private _formBuilder: FormBuilder, private serviceCv: CurriculumService, private router: Router) {
    let datosPostulante= JSON.parse(localStorage.getItem("postulante"));
    this.llenoDatosPersonales=datosPostulante.llenoCv==1;
   }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.botonGuardar = 0;
  }

  alertSalir(): void {
    swal.fire({
      title: 'Salir',
      text: "¿Está seguro de salir?, Se perderan sus datos",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/home']);
      }
    });
  }

  recuperarLosDatosDeLosComponentes() {
    if (!this.llenoDatosPersonales) {
      this.datosPersonales = this.datos_personales.getDatosPersonales();
      console.log(this.datosPersonales + "----------");
      // if (this.datosPersonales.getIdiomas() == undefined || this.datosPersonales.getIdiomas() == []) {
        this.datosPersonales.getIdiomas().push(new Idioma("español", "bien", "bien", "bien"));
      // }
    }
    this.listaDatosFormacionAcademica = this.formacion_academica.getDatosFC();
    this.listaDatosEstudios = this.estudios_cursos.getDatosEC();
    this.listaExperienciaUniversitaria = this.experiencia_universitaria.getDatosEU();
    this.listaExperienciaExtraU = this.experiencia_extra_universitaria.getDatosEEU();
    this.listaDatosProduccion = this.produccion.getDatosProduccion();
    if (!this.llenoDatosPersonales){
      console.log(JSON.stringify(this.datosPersonales));
    }
    console.log("          ******    " + JSON.stringify(this.datosPersonales.getIdiomas()) + "    ---------   " + JSON.stringify(this.listaDatosFormacionAcademica) + "iiiiiiiiiiiiiiiiiiii" + JSON.stringify(this.listaDatosEstudios) + "*******1**" + JSON.stringify(this.listaExperienciaUniversitaria) + "*************2*********" + JSON.stringify(this.listaExperienciaExtraU) + "********3**********" + JSON.stringify(this.listaDatosProduccion), "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
  }

  guardar() {
    if (this.llenoDatosPersonales) {
      this.recuperarLosDatosDeLosComponentes();
      this.registrarDatosPersonalesCvBD();
    }
    else {
      if (this.datos_personales.guardar()) {
        this.recuperarLosDatosDeLosComponentes();
        this.registrarDatosPersonalesCvBD();
      }
    }
  }
  mostrarBoton() {
    this.botonGuardar++;
    console.log(this.botonGuardar);
  }

  registrarDatosPersonalesCvBD() {
    let datosPos = JSON.parse(localStorage.getItem("postulante"));
    if (datosPos.llenoCv == 0) {
      this.serviceCv.agregarDatosPersonales(this.datosPersonales).subscribe(
        resultado => {
          if (resultado['resultado'] == 'correcto') {
            alert("todo posi");
            this.registrarIdiomas();
            this.registrarFormacionAcademicaBD();
            this.registrarEstudiosCursosBD();
            this.registrarExperienciaUniBD();
            this.registrarExperienciaExtraUniBD();
            this.registrarDatosProduccion();
            /*swal.fire(
              'Exitoso!',
              'Se guardaron los usuarios.',
              'success'
            ).then((result) => {
            this.router.navigate(['/convocatoriasEnCurso']);
            });*/
          } else {
            alert("algo anda mal");
          }
        }
      )
    } else {
      this.registrarFormacionAcademicaBD();
      this.registrarEstudiosCursosBD();
      this.registrarExperienciaUniBD();
      this.registrarExperienciaExtraUniBD();
      this.registrarDatosProduccion();
    }
  }

  registrarIdiomas() {
    this.serviceCv.agregarIdiomas(this.datosPersonales.getIdiomas()).subscribe(
      resp => {
        if (resp == 'correcto') {
          console.log("todo bien con los idiomas");
        } else {
          console.log("error con los idiomas")
        }
      }
    )
  }

  registrarFormacionAcademicaBD() {
    this.serviceCv.agregarFormacionAcademica(this.listaDatosFormacionAcademica).subscribe(
      resp => {
        if (resp == 'correcto') {
          console.log("todo bien con la formacion academica");
        } else {
          console.log("error con la formacion academica");
        }
      }
    );
  }

  registrarEstudiosCursosBD() {
    this.serviceCv.agregarEstudiosCursosTomados(this.listaDatosEstudios).subscribe(
      resp => {
        if (resp == 'correcto') {
          console.log("todo bien con los estudios cursos");
        } else {
          console.log("error con los estudios cursos");
        }
      }
    );
  }

  registrarExperienciaUniBD() {
    this.serviceCv.agregarExperienciaUniversitaria(this.listaExperienciaUniversitaria).subscribe(
      resp => {
        if (resp == 'correcto') {
          console.log("todo bien con la experiencia universitaria");
        } else {
          console.log("error con la experiencia universitaria");
        }
      }
    );
  }

  registrarExperienciaExtraUniBD() {
    this.serviceCv.agregarExperienciaExtraUniversitaria(this.listaExperienciaExtraU).subscribe(
      resp => {
        if (resp == 'correcto') {
          console.log("todo bien con la experiencia extra universitaria");
        } else {
          console.log("error con la experiencia extra universitaria");
        }
      }
    );
  }

  registrarDatosProduccion() {
    this.serviceCv.agregarProduccion(this.listaDatosProduccion).subscribe(
      resp => {
        if (resp == 'correcto') {
          console.log("todo bien con los datos produccion");
        } else {
          console.log("error con los datos produccion");
        }
      }
    );
  }
}
