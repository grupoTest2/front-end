import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// rutas
import { Router } from '@angular/router';

// formularios
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

// model
import { Tematica } from '../../../models/clases/convocatoria/tematica';
import { CalificacionConocimiento } from 'src/app/models/convocatoria/calificacionConocimiento';
import { Requerimiento } from 'src/app/models/clases/convocatoria/requerimiento';

// jquery y toast
declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-calificacion-conocimientos',
  templateUrl: './calificacion-conocimientos.component.html',
  styleUrls: ['./calificacion-conocimientos.component.css']
})
export class CalificacionConocimientosComponent implements OnInit {

  calificacion: CalificacionConocimiento;
  listaCalificacion: CalificacionConocimiento[] = [];
  formCalificacion: FormGroup;
  href: string = '';
  listaTematicas: string[] = [];
  listaItems: Requerimiento[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.href = this.router.url;
  }

  getindice(indice: number): string {
    let caracter: string = String.fromCharCode(indice + 65).toLocaleLowerCase() + ")     ";
    return caracter;
  }

  /*-------------- metodo para recuperar los datos de este componente*/
  getDatos(): Requerimiento[] {
    return this.listaItems;
  }


  setListaRequerimiento(listaRequeriminetos): void {
    this.listaItems = listaRequeriminetos;
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getListaTematica().length == 0) {
        for (let j = 0; j < this.listaTematicas.length; j++) {
          this.listaItems[i].getListaTematica().push(new Tematica(this.listaTematicas[j], 0));
        }
      }
    }
  }

  agregarTematica(): void {
    var nombreTematica = $('#nombreTematica').val();
    if (!this.existeTematica(nombreTematica)) {
      this.listaTematicas.push(nombreTematica);
      var aux = 0;
      var contador = 0;
      var idInput = "";
      for (let i = 0; i < this.listaItems.length; i++) {
        if (this.listaItems[i].getNotaDisponible() > 0) {
          let id: any = this.listaItems[i].getnombreMateria();
          idInput = id;
          let nota = parseInt((<HTMLInputElement>document.getElementById(id)).value);
          if ((<HTMLInputElement>document.getElementById(id)).value === "") {
            nota = 0;
            aux++;
          }
          let tematica: Tematica = new Tematica(this.listaTematicas[this.listaTematicas.length-1], nota);
          this.listaItems[i].getListaTematica().push(tematica);
        }
        else {
          for (let j = 0; j < this.listaTematicas.length; j++) {
            if (this.listaItems[i].getListaTematica().length <= j)
              this.listaItems[i].getListaTematica().push(new Tematica(this.listaTematicas[j], 0));
          }
        }
      }
      
      (<HTMLInputElement>document.getElementById(idInput)).classList.remove("is-invalid");
      tata.success('Agregado.', 'Se agregó la tematica con exito.');
      this.formCalificacion.reset();
      $('#modalConocimientoAux').modal('hide');


    }
    else {
      this.ErrorAlInsertarDocumento(" ya existe una tematica con ese nombre!!")
    }
  }
  ErrorAlInsertarDocumento(mensaje: string = 'Formulario invalido') {
    this.formCalificacion.markAllAsTouched();
    tata.error('Error', mensaje);
  }

  private existeTematica(nombre: string): boolean {
    let existe: boolean = false;
    for (let i in this.listaTematicas) {
      if (this.listaTematicas[i] === nombre) {
        existe = true;
        break;
      }
    }
    return existe;
  }


  hayDatos(): boolean {
    var bandera = false;
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getNotaDisponible() > 0) {
        bandera = true;
      }
    }
    return bandera;
  }

  // validaciones -------------------------------------------------------------------------------
  private buildForm(): void {
    this.formCalificacion = this.formBuilder.group({
      detalle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(/[a-zA-Z]/)])],
      nota: ['', Validators.compose([Validators.min(0), Validators.max(100), Validators.pattern(/^\d*$/)])]
    });
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.formCalificacion.valid) {
      const value = this.formCalificacion.value;
    } else {
      this.formCalificacion.markAllAsTouched();
    }
  }

  resetForm(): void {
    $('input').removeClass('is-invalid');
    this.buildForm();
  }

  validarNota(): void {
    var aux = 0;
    var contador = 0;
    var bandera = false;
    var codigo: string = '';
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getNotaDisponible() > 0) {
        let id: any = this.listaItems[i].getnombreMateria();
        if ((<HTMLInputElement>document.getElementById(id)).value === '') {
          aux++;
        }
        else {
          let id: any = this.listaItems[i].getnombreMateria();
          let nota = parseInt((<HTMLInputElement>document.getElementById(id)).value);
          if (nota > this.listaItems[i].getNotaDisponible()) {
            aux++;
            (<HTMLInputElement>document.getElementById(id)).classList.add('is-invalid');
            codigo = this.listaItems[i].getCodigoAuxiliatura();
            bandera = true;
          } else {
            (<HTMLInputElement>document.getElementById(id)).classList.remove('is-invalid');
          }
        }
        contador++;
      }
    }
    if (aux === contador || bandera) {
      if (bandera) {
        tata.error('Error', 'La nota excede el porcentaje disponible en: ' + codigo);
      } else {
        tata.error('Error', 'La tematica debe tener minimo una nota asignada');
      }
    } else {
      this.agregarTematica();
    }
  }

  formValido(): void {
    if (this.formCalificacion.valid) {
      this.validarNota();
    } else {
      this.formCalificacion.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }

  get detalle() {
    return this.formCalificacion.get('detalle');
  }
  get detalleIsValid() {
    return this.detalle.touched && this.detalle.valid;
  }
  get detalleIsInvalid() {
    return this.detalle.touched && this.detalle.invalid;
  }

  get nota() {
    return this.formCalificacion.get('nota');
  }
  get notaIsValid() {
    return this.nota.touched && this.nota.valid;
  }
  get notaIsInvalid() {
    return this.nota.touched && this.nota.invalid;
  }
  // fin validaciones
}