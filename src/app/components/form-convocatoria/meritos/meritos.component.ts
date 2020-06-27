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

  //detalles merito
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

  ruta(){
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    }else{
      return false;
    }
  }

  //nivel 1------------------------------------------------------------
  agregarMeritoNivel1(): void {
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloM1")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentajeM1")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitosM1")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);
    merito.setAccion("insertar");
    let resp = this.seleccionMerito.agregarMerito(merito);
    this.tablasMeritos = this.seleccionMerito.getTablaMeritos();
    if (resp === 'exito') {
      //el porcentaje esta en el rango que corresponde

      $('#modal1').modal('hide');
      if (this.formMeritos.valid) {
        this.toastExitoso();
      }
      //resetea valores a vacio
      (<HTMLInputElement>document.getElementById("requisitosM1")).value = "";
      this.formMeritos.reset();
    } else {
      //el porcentaje supera los limites
      // this.toastError()
      this.ErrorAlInsertarMerito(resp);
    }
  }

  //nivel 2------------------------------------------------------------
  agregarMeritoNivel2(): void {
    var tituloSubMerito = (<HTMLInputElement>document.getElementById("titulo2")).value;
    var porcentajeSubMerito = parseInt((<HTMLInputElement>document.getElementById("porcentaje2")).value);
    var merito: Merito = new Merito(tituloSubMerito, '', porcentajeSubMerito, []);
    merito.setAccion("insertar");
    let resp = this.seleccionMerito.agregarSubMerito(merito, this.indice1);
    this.tablasMeritos = this.seleccionMerito.getTablaMeritos();

    if (resp === 'exito') {
      //el porcentaje esta en el rango que corresponde
      $('#modal2').modal('hide');
      if (this.formMeritos.valid) {
        this.toastExitoso();
      }
      this.formMeritos.reset();
    } else {
      //el porcentaje supera los limites
      //this.toastError()
      this.ErrorAlInsertarMerito(resp);

    }
  }

  // nivel 3 ----------------------------------------------------------
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
      //el porcentaje esta en el rango que corresponde
      $('#modal3').modal('hide');
      if (this.formMeritos.valid) {
        this.toastExitoso();
      }
      (<HTMLInputElement>document.getElementById("requisitos3")).value = "";
      this.formMeritos.reset();
    } else {
      //el porcentaje supera los limites
      //this.toastError()
      this.ErrorAlInsertarMerito(resp);
    }
  }


  ErrorAlInsertarMerito(mensaje: string = 'Formulario invalido') {
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

  //indice1 -------------------------------------------------------------------------------
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

  /*-------------- metodo para recuperar los datos de este componente*/
  getDatos() {
    return this.tablasMeritos;
  }

  //validacion -------------------------------------------------------------------------
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
    /**
   *indica si la convocatoria es apta para ser lanzada 
   */
  estaHabilitado(){
    return this.seleccionMerito.getPorcentajeDisponible()==0;
  }
  /**
   * metodos que interaccuan con la base de datos
   */
  getMeritosBD(){
    if(localStorage.getItem("idConv")===""){
      console.log("esta vacio en los rotulos");
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
          //console.log(this.seleccionMerito.getTablaMeritos());
          this.tablasMeritos=this.seleccionMerito.getTablaMeritos();
        }
      )
    }
  }
}

