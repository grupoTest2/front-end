import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//servicios
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';
//models
import { Requisito } from 'src/app/models/clases/convocatoria/requisito';
import { SeleccionRequisito } from 'src/app/models/convocatoria/seleccion-requisitos';
import { Router } from '@angular/router';

//jquery  toast
declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styleUrls: ['./requisitos.component.css']
})

export class RequisitosComponent implements OnInit {
  formRequisitos: FormGroup;
  requisito: Requisito;
  listaRequisitos: Requisito[] = [];
  seleccionRequisitos: SeleccionRequisito = new SeleccionRequisito();
  href: string = '';

  constructor(private editarConv: EditarConvocatoriaServicePhp, private formBuilder: FormBuilder, private router: Router) {
    this.buildForm();
    this.getRequisitosBD();
  }

  ngOnInit(): void {
    this.href = this.router.url;

  }

  ruta():boolean {
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    } else {
      return false;
    }
  }

  getDatos(): Requisito[] {
    return this.listaRequisitos;
  }

  agregarRequisito(): void {
    let descripcionRequisito = $('#descripcionRequisito').val();
    this.requisito = new Requisito(descripcionRequisito);
    this.requisito.setAccion("insertar");
    let respuesta = this.seleccionRequisitos.agregarRequisito(this.requisito);
    if (respuesta === 'exito') {
      this.listaRequisitos = this.seleccionRequisitos.getListaRequisitosSeleccionados();
      console.log(this.listaRequisitos);
      tata.success('Agregado.', 'Se agregó con exito.');
      this.formRequisitos.reset();
      $('#tablaRequisitos').modal('hide');
    }
    else {
      this.ErrorAlInsertarRequisito(respuesta);
    }
  }

  editar(i: number): void {
    this.formRequisitos.get('detalle').setErrors(null);
    this.formRequisitos.markAllAsTouched();
    $('#descripcionRequisito').val(this.listaRequisitos[i].getDescripcion());
  }

  formValido(): void {
    if (this.formRequisitos.valid) {
      this.agregarRequisito();
    } else {
      this.ErrorAlInsertarRequisito();
    }
  }

  ErrorAlInsertarRequisito(mensaje: string = 'Formulario invalido') {
    this.formRequisitos.markAllAsTouched();
    tata.error('Error', mensaje);
  }

  getindice(indice: number): string {
    let caracter: string = String.fromCharCode(indice + 97) + ")     ";
    return caracter;
  }

  private buildForm(): void {
    this.formRequisitos = this.formBuilder.group({
      detalle: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.formRequisitos.valid) {
      const value = this.formRequisitos.value;
    } else {
      this.formRequisitos.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.buildForm();
  }

  get detalleForm():any {
    return this.formRequisitos.get('detalle');
  }
  get detalleFormIsValid():boolean {
    return this.detalleForm.touched && this.detalleForm.valid;
  }

  get detalleFormIsInvalid():boolean {
    return this.detalleForm.touched && this.detalleForm.invalid;
  }

  estaHabilitado():string {
    return this.listaRequisitos.length > 0?"bien":"establecer al menos un requisito!!";
  }

  getRequisitosBD():void {
    if(localStorage.getItem("idConv")===""){
    }else{
      let idConv: number = parseInt(localStorage.getItem("idConv"));
      this.editarConv.getRequisitos(idConv).subscribe(
        resultado => {
          for (let i in resultado) {
            this.requisito = new Requisito(resultado[i].descripcion, resultado[i].idRequisito);
            this.seleccionRequisitos.agregarRequisito(this.requisito);
          }
          this.listaRequisitos = this.seleccionRequisitos.getListaRequisitosSeleccionados();
        }
      )
    }
  }
}
