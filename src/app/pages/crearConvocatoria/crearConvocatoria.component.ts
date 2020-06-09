import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoConvocatoria } from '../../models/clases/crear-convocatoria/tipo-convocatoria';
import { Router } from '@angular/router';


declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-crear-convocatoria',
  templateUrl: './crearConvocatoria.component.html',
  styleUrls: ['./crearConvocatoria.component.css']
})
export class crearConvocatoriaComponent implements OnInit {

  //formulario validaciones
  formCrearConv: FormGroup;
  tipo1: TipoConvocatoria = new TipoConvocatoria(1, 'docencia');
  tipo2: TipoConvocatoria = new TipoConvocatoria(2, 'laboratorio');
  listaTiposConvocatoria: TipoConvocatoria[] = [this.tipo1, this.tipo2];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
  }


  // Validaciones -------------------------------------------------------------------------
  private buildForm() {
    this.formCrearConv = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      gestion: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });

    this.formCrearConv.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }
  save(event: Event) {
    event.preventDefault();
    if (this.formCrearConv.valid) {
      const value = this.formCrearConv.value;
      console.log(value);
    } else {
      this.formCrearConv.markAllAsTouched();
      console.log('marca');
    }
  }

  resetForm(){
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
   // Fin validaciones -------------------------------------------------------------------------

  //  Rutas -------------------------------------------------------------------------------------
  ruta(){
    var id = $('#tipoConvocatoria').val();
    this.router.navigate(['crearConvocatoria/tipo', id]);
  }
}
