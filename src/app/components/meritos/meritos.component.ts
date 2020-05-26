import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Merito } from '../../models/convocatoria-docente/merito';
import { SeleccionMerito } from 'src/app/models/convocatoria-docente/seleccion-meritos';

declare var tata: any;
declare var $: any;
@Component({
  selector: 'app-meritos',
  templateUrl: './meritos.component.html',
  styleUrls: ['./meritos.component.css']
})


export class MeritosComponent implements OnInit {

  tablasMeritos: Merito[];
  formMeritos: FormGroup;

  seleccionMerito:SeleccionMerito;
  indice1: number = 0;
  indice2: number = 0;
  indice3: number = 0; 

  //detalles merito
  merito1: Merito = new Merito(" ", " ", 0, []);
  tituloMerito: String = " ";
  porcentajeMerito: number = 0;
  descripcionMerito: String = " ";

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.seleccionMerito=new SeleccionMerito();
    this.tablasMeritos=this.seleccionMerito.getTablaMeritos();
  }
  private buildForm() {
    this.formMeritos = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      porcentaje: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])]
    });

    this.formMeritos.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.formMeritos.valid) {
      const value = this.formMeritos.value;
      console.log(value);
    } else {
      this.formMeritos.markAllAsTouched();
      console.log("marca");
    }
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

  formValido1(){
    if(this.formMeritos.valid){
      this.agregarMeritoNivel1();
    }else{
      tata.error('Error', 'Formulario invalido');
    }
  }
  formValido2(){
    if(this.formMeritos.valid){
      this.agregarMeritoNivel2();
    }else{
      tata.error('Error', 'Formulario invalido');
    }
  }
  formValido3(){
    if(this.formMeritos.valid){
      this.agregarMeritoNivel3();
    }else{
      tata.error('Error', 'Formulario invalido');
    }
  }
  resetForm(){
    this.buildForm();
  }


  //nivel 1------------------------------------------------------------
  agregarMeritoNivel1() {
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloM1")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentajeM1")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitosM1")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);
    //agregar merito a traves del objeto seleccionMerito
    let resp=this.seleccionMerito.agregarMerito(merito);
    if(resp){
      //el merito se agrego correctamente
      this.toastExitoso();
    }else{
      //error, el merito no se pudo agregar(por problema de porcentajes)
    }
    this.tablasMeritos=this.seleccionMerito.getTablaMeritos();
    
    $('#modal1').modal('hide'); //cierra el nodal
    //resetea valores a vacio
    (<HTMLInputElement>document.getElementById("tituloM1")).value = "";
    (<HTMLInputElement>document.getElementById("porcentajeM1")).value = "";
    (<HTMLInputElement>document.getElementById("requisitosM1")).value = "";
  }

  //nivel 2------------------------------------------------------------
  agregarMeritoNivel2() {
    var tituloSubMerito = (<HTMLInputElement>document.getElementById("titulo2")).value;
    var porcentajeSubMerito = parseInt((<HTMLInputElement>document.getElementById("porcentaje2")).value);
    var merito: Merito = new Merito(tituloSubMerito, '', porcentajeSubMerito, []);

    var merito: Merito = new Merito( tituloSubMerito, '', porcentajeSubMerito, []);
    console.log("indice numero: "+this.indice1);
    let resp=this.seleccionMerito.agregarSubMerito(merito,this.indice1);
    if(resp){
      //todo posi
      this.toastExitoso();
    }else{
      //no se pudo agregar
    }
    this.tablasMeritos=this.seleccionMerito.getTablaMeritos();
    console.log(this.tablasMeritos);
    
    $('#modal2').modal('hide');
    (<HTMLInputElement>document.getElementById("titulo2")).value = "";
    (<HTMLInputElement>document.getElementById("porcentaje2")).value = "";
  }

  // nivel 3 ----------------------------------------------------------
  agregarMeritoNivel3() {
    var tituloMerito = (<HTMLInputElement>document.getElementById("tituloMerito3")).value;
    var porcentaje = parseInt((<HTMLInputElement>document.getElementById("porcentaje3")).value);
    var descripcionMerito = (<HTMLInputElement>document.getElementById("requisitos3")).value;
    var merito: Merito = new Merito(tituloMerito, descripcionMerito, porcentaje, []);
    let resp= this.seleccionMerito.agregarSubSubMerito(merito,this.indice1,this.indice2);
    if(resp){
      //todo posi
      this.toastExitoso();
    }else{
      //no se pudo agregar
    }
    this.tablasMeritos=this.seleccionMerito.getTablaMeritos();
    console.log("tercer nivel...........");
    console.log(this.tablasMeritos);
    $('#modal3').modal('hide');
    (<HTMLInputElement>document.getElementById("tituloMerito3")).value = "";
    (<HTMLInputElement>document.getElementById("porcentaje3")).value = "";
    (<HTMLInputElement>document.getElementById("requisitos3")).value = "";
  }

  tieneMeritos(merito: Merito): boolean {
    return merito.getListaMeritos().length !== 0;
  }
  indicesSubMeritos(x: number, y: number) {
    this.indice1 = x;
    this.indice2 = y;
  }
  mostrarSubMeritos() {
    return this.tablasMeritos[this.indice1].getListaMeritos()[this.indice2].getListaMeritos();
  }
  toastExitoso() {
    tata.success('Agregado.', 'El merito fue creado con exito.', {
      duration: 2000,
      animate: 'slide'
    });
  }
  toastError() {
    tata.error('Elinimado', 'El merito fue creado exitosamente', {
      duration: 2000,
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
  /*
  setVariosIndices3(j:number, k: number, l:number) {
    this.indice1 = j;
    this.indice2 = k;
    this.indice3 = l;
  }*/
}
