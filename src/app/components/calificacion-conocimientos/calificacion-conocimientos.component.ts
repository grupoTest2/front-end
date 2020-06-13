import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// rutas
import { Router } from '@angular/router';

// formularios
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// model
import { Tematica } from '../../models/clases/convocatoria/tematica';
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

  // formalario validaciones
  formCalificacion: FormGroup;

  href: string = '';

  /*----- evento para envio de datos ------------*/
  @Output() datosCalificacionConocimiento = new EventEmitter();

  // lista de calificaciom conocimientos de laboratorio
  listaConocimientosAxLabo: CalificacionConocimiento[] = [];
  listaTematicas: string[] = [];

  // agregando a la lista tematicas los codigos de los items requerimineto
  listaItems: Requerimiento[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.href = this.router.url;
  }

  getindice(indice: number) {
    let caracter: String = String.fromCharCode(indice + 65).toLocaleLowerCase() + ")     ";
    return caracter;
  }

  /*-------------- metodo para recuperar los datos de este componente*/
  getDatos() {
    return this.listaItems;
  }


  rutaActual() {
    if (this.href === '/crearConvocatoria/tipo/2') {
      return true;
    } else {
      return false;
    }
  }


  setListaRequerimiento(listaRequeriminetos) {
    this.listaItems = listaRequeriminetos;
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getListaTematica().length == 0) {
        for (let j = 0; j < this.listaTematicas.length; j++) {
          this.listaItems[i].getListaTematica().push(new Tematica(this.listaTematicas[j], 0));
        }
      }
    }
  }

  agregarTematica() {
    var nombreTematica = $('#nombreTematica').val();
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
        let tematica: Tematica = new Tematica(nombreTematica, nota);
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


  hayDatos(): boolean {
   var bandera=false;
    for (let i = 0; i < this.listaItems.length; i++) {
            if (this.listaItems[i].getNotaDisponible() > 0) {
            bandera=true;
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

  save(event: Event) {
    event.preventDefault();
    if (this.formCalificacion.valid) {
      const value = this.formCalificacion.value;
    } else {
      this.formCalificacion.markAllAsTouched();
    }
  }

  resetForm() {
    $('input').removeClass('is-invalid');
    this.buildForm();
  }

  validarNota() {
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
          }else{
            (<HTMLInputElement>document.getElementById(id)).classList.remove('is-invalid');
          }
        }
        contador++;
      }
    }
    if (aux === contador || bandera) {
      if(bandera){
        tata.error('Error', 'La nota excede el porcentaje disponible en: ' + codigo);
      }else{
        tata.error('Error', 'La tematica debe tener minimo una nota asignada');
      }
    } else {
      this.agregarTematica();
    }
  }

  formValido() {
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
