import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from  '@angular/cdk/stepper' ;
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field/form-field';

@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.css'],
  providers: [
    {provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}},
   ]
})
export class CurriculumVitaeComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  isLinear=false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  agregarDatosCvBD(){
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
