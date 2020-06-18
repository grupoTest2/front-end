import { Component, OnInit } from '@angular/core';

// form y validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-convocatoria',
  templateUrl: './editar-convocatoria.component.html',
  styleUrls: ['./editar-convocatoria.component.css']
})
export class EditarConvocatoriaComponent implements OnInit {

  formCrearConv: FormGroup;
  titulo = 'CONVOCATORIA A CONCURSO DE MÉRITOS Y PRUEBAS DE CONOCIMIENTOS PARA OPTAR A AUXILIATURAS EN LABORATORIO DE COMPUTACIÓN, DE MANTENIMIENTO Y DESARROLLO';

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  // Validaciones -------------------------------------------------------------------------
  private buildForm(): void {
    this.formCrearConv = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      gestion: ['', [Validators.required]]
    });
  }
  save(event: Event): void {
    event.preventDefault();
    if (this.formCrearConv.valid) {
      const value = this.formCrearConv.value;
    } else {
      this.formCrearConv.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.buildForm();
  }

  get tituloForm() {
    return this.formCrearConv.get('titulo');
  }
  get tituloFormIsValid() {
    return this.tituloForm.touched && this.tituloForm.valid;
  }
  get tituloFormIsInvalid() {
    return this.tituloForm.touched && this.tituloForm.invalid;
  }

  get gestionForm() {
    return this.formCrearConv.get('gestion');
  }
  get gestionFormIsValid() {
    return this.gestionForm.touched && this.gestionForm.valid;
  }
  get gestionFormIsInvalid() {
    return this.gestionForm.touched && this.gestionForm.invalid;
  }

  get tipoForm() {
    return this.formCrearConv.get('tipo');
  }
  get tipoFormIsValid() {
    return this.tipoForm.touched && this.tipoForm.valid;
  }
  get tipoFormIsInvalid() {
    return this.tipoForm.touched && this.tipoForm.invalid;
  }
}
