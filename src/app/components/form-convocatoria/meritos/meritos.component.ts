import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//validacion
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//servicios
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';

//models
import { Merito } from '../../../models/clases/convocatoria/merito';
import { SeleccionMerito } from 'src/app/models/convocatoria/seleccion-meritos';
import { Router } from '@angular/router';

//jquery y toast
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
  merito1: Merito = new Merito(" ", " ", 0, []);
  tituloMerito: String = " ";
  porcentajeMerito: number = 0;
  descripcionMerito: String = " ";
  href: string = '';


  constructor(private formBuilder: FormBuilder, private editarConv: EditarConvocatoriaServicePhp, private router: Router) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })
    this.buildForm();
    this.getMeritosBD();
  }

  ngOnInit(): void {
    this.href = this.router.url;

  }

  ruta():boolean{
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    }else{
      return false;
    }
  }

  agregarMeritoNivel1(): void {
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloM1")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentajeM1")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitosM1")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);
    merito.setAccion("insertar");
    let resp = this.seleccionMerito.agregarMerito(merito);
    this.tablasMeritos = this.seleccionMerito.getTablaMeritos();
    if (resp === 'exito') {
      $('#modal1').modal('hide');
      if (this.formMeritos.valid) {
        this.toastExitoso();
      }
      (<HTMLInputElement>document.getElementById("requisitosM1")).value = "";
      this.formMeritos.reset();
    } else {
      this.ErrorAlInsertarMerito(resp);
    }
  }

  agregarMeritoNivel2(): void {
    var tituloSubMerito = (<HTMLInputElement>document.getElementById("titulo2")).value;
    var porcentajeSubMerito = parseInt((<HTMLInputElement>document.getElementById("porcentaje2")).value);
    var merito: Merito = new Merito(tituloSubMerito, '', porcentajeSubMerito, []);
    merito.setAccion("insertar");
    let resp = this.seleccionMerito.agregarSubMerito(merito, this.indice1);
    this.tablasMeritos = this.seleccionMerito.getTablaMeritos();
    if (resp === 'exito') {
      $('#modal2').modal('hide');
      if (this.formMeritos.valid) {
        this.toastExitoso();
      }
      this.formMeritos.reset();
    } else {
      this.ErrorAlInsertarMerito(resp);
    }
  }

  agregarMeritoNivel3(): void {
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloMerito3")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentaje3")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitos3")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);
    merito.setAccion("insertar");
    let resp = this.seleccionMerito.agregarSubSubMerito(merito, this.indice1, this.indice2);
    this.tablasMeritos = this.seleccionMerito.getTablaMeritos();
    console.log(this.tablasMeritos);
    if (resp === 'exito') {
      $('#modal3').modal('hide');
      if (this.formMeritos.valid) {
        this.toastExitoso();
      }
      (<HTMLInputElement>document.getElementById("requisitos3")).value = "";
      this.formMeritos.reset();
    } else {
      this.ErrorAlInsertarMerito(resp);
    }
  }


  ErrorAlInsertarMerito(mensaje: string = 'Formulario invalido'):void {
    this.formMeritos.markAllAsTouched();
    tata.error('Error', mensaje);
  }

  tieneMeritos(merito: Merito): boolean {
    return merito.getListaMeritos().length !== 0;
  }

  indicesSubMeritos(x: number, y: number): void {
    this.indice1 = x;
    this.indice2 = y;
  }

  mostrarSubMeritos(): Merito[] {
    return this.seleccionMerito.getSubSubMeritos(this.indice1, this.indice2);
  }

  setIndice1(i: number): void {
    this.indice1 = i;
  }
  setIndice2(j: number): void {
    this.indice2 = j;
  }
  setIndice3(k: number): void {
    this.indice3 = k;
  }

  setVariosIndices2(j: number, k: number): void {
    this.indice1 = j;
    this.indice2 = k;
  }

  getDatos():Merito[] {
    return this.tablasMeritos;
  }

  private buildForm(): void {
    this.formMeritos = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      porcentaje: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])]
    });
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.formMeritos.valid) {
      const value = this.formMeritos.value;
    } else {
      this.formMeritos.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.buildForm();
  }

  formValido1(): void {
    if (this.formMeritos.valid) {
      this.agregarMeritoNivel1();
    } else {
      this.formMeritos.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }

  formValido2(): void {
    if (this.formMeritos.valid) {
      this.agregarMeritoNivel2();
    } else {
      this.formMeritos.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }

  formValido3(): void {
    if (this.formMeritos.valid) {
      this.agregarMeritoNivel3();
    } else {
      this.formMeritos.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }

  toastExitoso(): void {
    tata.success('Agregado.', 'El merito fue creado con exito.', {
      duration: 2000,
      animate: 'slide'
    });
  }

  toastError(): void {
    tata.error('Elinimado', 'no se pudo crear el merito, porcentaje no valido', {
      duration: 3000,
      animate: 'slide'
    });
  }

  get titulo():any {
    return this.formMeritos.get('titulo');
  }

  get tituloIsValid():boolean {
    return this.titulo.touched && this.titulo.valid;
  }

  get tituloIsInvalid():boolean {
    return this.titulo.touched && this.titulo.invalid;
  }

  get porcentaje():any {
    return this.formMeritos.get('porcentaje');
  }

  get porcentajeIsValid():boolean {
    return this.porcentaje.touched && this.porcentaje.valid;
  }

  get porcentajeIsInvalid():boolean {
    return this.porcentaje.touched && this.porcentaje.invalid;
  }

  estaHabilitado(): string{
    let res="bien";
    if(this.seleccionMerito.getTablaMeritos().length==0){
      res="tabla de meritos no puede estar vacia!!";
    }else if(this.seleccionMerito.getPorcentajeDisponible() > 0){
      res="la sumatoria en los meritos de nivel superior debe ser 100%!!";
    }
    return res;
  }

  getMeritosBD():any{
    if(localStorage.getItem("idConv")===""){
    }else{
      let idConv: number = parseInt(localStorage.getItem("idConv"));
      this.editarConv.getMeritos(idConv).subscribe(
        resultado=>{
          let me1: Merito;
          for(let i in resultado){
            me1=new Merito(resultado[i].titulo,
              resultado[i].descripcion,
              parseInt(resultado[i].porcentaje),
              [],
              resultado[i].idMerito);
              this.seleccionMerito.agregarMerito(me1);
              let listaMeritos1=resultado[i].listaMeritos;
              let me2: Merito;
              for(let j in listaMeritos1){
                me2=new Merito(listaMeritos1[j].titulo,
                  listaMeritos1[j].descripcion,
                  parseInt(listaMeritos1[j].porcentaje),
                  [],
                  listaMeritos1[j].idMerito);
                this.seleccionMerito.agregarSubMerito(me2,parseInt(i));
                let listaMeritos2=listaMeritos1[j].listaMeritos;
                let me3: Merito;
                for(let k in listaMeritos2){
                  me3=new Merito(listaMeritos2[k].titulo,
                    listaMeritos2[k].descripcion,
                    parseInt(listaMeritos2[k].porcentaje),
                    [],
                    listaMeritos2[k].idMerito);
                  this.seleccionMerito.agregarSubSubMerito(me3,parseInt(i),parseInt(j));
                }
              }
          }
          this.tablasMeritos=this.seleccionMerito.getTablaMeritos();
        }
      )
    }
  }
}

