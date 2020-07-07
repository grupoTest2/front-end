import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm } from '@angular/forms';
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
  constructor() {
  }
  ngOnInit(): void {
  }

  // validaciones -----------------------------------------------------
  private buildForm(): void {
    this.formCurriculum = this.formBuilder.group({
      apellidoM: ['', [Validators.required]],
      apellidoP: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      fechaNac: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      emision: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],



      fecha: ['', [Validators.required]],
    });
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.formCurriculum.valid) {
      const value = this.formCurriculum.value;
    } else {
      this.formCurriculum.markAllAsTouched();
    }
  }

  get eventoForm() {
    return this.formCurriculum.get('evento');
  }
  get eventoFormIsValid() {
    return this.eventoForm.touched && this.eventoForm.valid;
  }
  get eventoFormIsInvalid() {
    return this.eventoForm.touched && this.eventoForm.invalid;
  }

  get fechaForm() {
    return this.formCurriculum.get('fecha');
  }

  get fechaIsValid() {
    return this.fechaForm.touched && this.fechaForm.valid;
  }

  get fechaIsInvalid() {
    return this.fechaForm.touched && this.fechaForm.invalid;
  }

  formValido() {
    if (this.formCurriculum.valid) {
    } else {
      this.formCurriculum.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
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
    console.log(form.controls['apellidoM'].value);

  }

  resetForm(): void {
    
  }

}
