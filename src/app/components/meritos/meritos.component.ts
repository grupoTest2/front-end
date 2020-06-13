import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Merito } from '../../models/clases/convocatoria/merito';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeleccionMerito } from 'src/app/models/convocatoria/seleccion-meritos';

declare var tata: any;
declare var $: any;
@Component({
  selector: 'app-meritos',
  templateUrl: './meritos.component.html',
  styleUrls: ['./meritos.component.css']
})


export class MeritosComponent implements OnInit {

  tablasMeritos: Merito[] = [];
  formMeritos: FormGroup;
  seleccionMerito: SeleccionMerito = new SeleccionMerito();
  indice1: number = 0;
  indice2: number = 0;
  indice3: number = 0;

  //detalles merito
  merito1: Merito = new Merito(" ", " ", 0, []);
  tituloMerito: String = " ";
  porcentajeMerito: number = 0;
  descripcionMerito: String = " ";

  constructor(private formBuilder: FormBuilder) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })
    this.buildForm();
    //this.seleccionMerito=new SeleccionMerito();
  }

  ngOnInit(): void {
  }
  private buildForm() {
    this.formMeritos = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      porcentaje: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])]
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.formMeritos.valid) {
      const value = this.formMeritos.value;
    } else {
      this.formMeritos.markAllAsTouched();
    }
  }

  resetForm() {
    this.buildForm();
  }

  get titulo() {
    return this.formMeritos.get('titulo');
  }
  get tituloIsValid() {
    return this.titulo.touched && this.titulo.valid;
  }
  get tituloIsInvalid() {
    return this.titulo.touched && this.titulo.invalid;
  }

  get porcentaje() {
    return this.formMeritos.get('porcentaje');
  }
  get porcentajeIsValid() {
    return this.porcentaje.touched && this.porcentaje.valid;
  }
  get porcentajeIsInvalid() {
    return this.porcentaje.touched && this.porcentaje.invalid;
  }

  formValido1() {
    if (this.formMeritos.valid) {
      this.agregarMeritoNivel1();
    } else {
      this.formMeritos.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }
  formValido2() {
    if (this.formMeritos.valid) {
      this.agregarMeritoNivel2();
    } else {
      this.formMeritos.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }
  formValido3() {
    if (this.formMeritos.valid) {
      this.agregarMeritoNivel3();
    } else {
      this.formMeritos.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }


  //nivel 1------------------------------------------------------------
  agregarMeritoNivel1() {
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloM1")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentajeM1")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitosM1")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);
    let resp = this.seleccionMerito.agregarMerito(merito);
    this.tablasMeritos = this.seleccionMerito.getTablaMeritos();
    if (resp) {
      //el porcentaje esta en el rango que corresponde

      $('#modal1').modal('hide');
      if (this.formMeritos.valid) {
        this.toastExitoso();
      }
    } else {
      //el porcentaje supera los limites
      this.toastError()
    }

    //resetea valores a vacio
    (<HTMLInputElement>document.getElementById("requisitosM1")).value = "";
    this.formMeritos.reset();
  }

  //nivel 2------------------------------------------------------------
  agregarMeritoNivel2() {
    var tituloSubMerito = (<HTMLInputElement>document.getElementById("titulo2")).value;
    var porcentajeSubMerito = parseInt((<HTMLInputElement>document.getElementById("porcentaje2")).value);
    var merito: Merito = new Merito(tituloSubMerito, '', porcentajeSubMerito, []);

    let resp = this.seleccionMerito.agregarSubMerito(merito, this.indice1);
    this.tablasMeritos = this.seleccionMerito.getTablaMeritos();

    if (resp) {
      //el porcentaje esta en el rango que corresponde
      $('#modal2').modal('hide');
      if (this.formMeritos.valid) {
        this.toastExitoso();
      }
    } else {
      //el porcentaje supera los limites
      this.toastError()
    }

    this.formMeritos.reset();
  }

  // nivel 3 ----------------------------------------------------------
  agregarMeritoNivel3() {
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloMerito3")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentaje3")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitos3")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);
    let resp = this.seleccionMerito.agregarSubSubMerito(merito, this.indice1, this.indice2);
    this.tablasMeritos = this.seleccionMerito.getTablaMeritos();
    if (resp) {
      //el porcentaje esta en el rango que corresponde
      $('#modal3').modal('hide');
      if (this.formMeritos.valid) {
        this.toastExitoso();
      }
    } else {
      //el porcentaje supera los limites
      this.toastError()
    }

    (<HTMLInputElement>document.getElementById("requisitos3")).value = "";
    this.formMeritos.reset();

  }

  tieneMeritos(merito: Merito): boolean {
    return merito.getListaMeritos().length !== 0;
  }
  indicesSubMeritos(x: number, y: number) {
    this.indice1 = x;
    this.indice2 = y;
  }
  mostrarSubMeritos() {
    return this.seleccionMerito.getSubSubMeritos(this.indice1, this.indice2);
  }
  toastExitoso() {
    tata.success('Agregado.', 'El merito fue creado con exito.', {
      duration: 2000,
      animate: 'slide'
    });
  }
  toastError() {
    tata.error('Elinimado', 'no se pudo crear el merito, porcentaje no valido', {
      duration: 3000,
      animate: 'slide'
    });
  }

  //indice1 -------------------------------------------------------------------------------
  setIndice1(i: number) {
    this.indice1 = i;
  }
  setIndice2(j: number) {
    this.indice2 = j;
  }
  setIndice3(k: number) {
    this.indice3 = k;
  }
  setVariosIndices2(j: number, k: number) {
    this.indice1 = j;
    this.indice2 = k;
  }

  /*-------------- metodo para recuperar los datos de este componente*/
  getDatos() {
    return this.tablasMeritos;
  }

}

