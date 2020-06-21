import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//servicios
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';
//models
import { Requisito } from 'src/app/models/clases/convocatoria/requisito';
import { SeleccionRequisito } from 'src/app/models/convocatoria/seleccion-requisitos';

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
  requisito:Requisito;
  listaRequisitos:Requisito[]=[];
  seleccionRequisitos:SeleccionRequisito= new SeleccionRequisito();

  constructor(private editarConv: EditarConvocatoriaServicePhp, private formBuilder: FormBuilder) {
    this.buildForm();
    this.getRequisitosBD();
  }
  
  ngOnInit(): void {

  }
 
  //enviando los datos al com[ponente formulario
  getDatos(): Requisito[]{
    return this.listaRequisitos;
  }

  agregarRequisito(): void{
    let descripcionRequisito = $('#descripcionRequisito').val();
    this.requisito = new Requisito(descripcionRequisito);
    this.requisito.setAccion("insertar");
    let respuesta =this.seleccionRequisitos.agregarRequisito(this.requisito);
    if(respuesta==='exito'){
    this.listaRequisitos = this.seleccionRequisitos.getListaRequisitosSeleccionados();
    console.log(this.listaRequisitos);
    tata.success('Agregado.', 'Se agregó con exito.');
    // this.formRequisitos.reset();
    $('#tablaRequisitos').modal('hide');
    }
    else{
      this.ErrorAlInsertarRequisito(respuesta);
    }
  }
  
  formValido(): void{
    if(this.formRequisitos.valid){
      this.agregarRequisito();
    }else{
      this.ErrorAlInsertarRequisito();
    }
  }

  ErrorAlInsertarRequisito(mensaje:string='Formulario invalido'){
    this.formRequisitos.markAllAsTouched();
      tata.error('Error', mensaje);
  }

  getindice(indice:number): string{
    let caracter: string = String.fromCharCode(indice + 97)+")     ";
    return caracter;
  }

  // validaciones ----------------------------------------------------------------------
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

  resetForm(): void{
    this.buildForm();
  }

  get detalleForm() {
    return this.formRequisitos.get('detalle');
  }
  get detalleFormIsValid() {
    return this.detalleForm.touched && this.detalleForm.valid;
  }
  get detalleFormIsInvalid() {
    return this.detalleForm.touched && this.detalleForm.invalid;
  }

  
  /**
   * metodos que interactuan con el servidor php y la base de datos
   */

   getRequisitosBD(){
     let idConv: number= parseInt(localStorage.getItem("idConv"));
     this.editarConv.getRequisitos(idConv).subscribe(
      resultado=>{
        for(let i in resultado){
          this.requisito=new Requisito(resultado[i].descripcion,resultado[i].idRequisito);
          this.seleccionRequisitos.agregarRequisito(this.requisito);
        }
        this.listaRequisitos=this.seleccionRequisitos.getListaRequisitosSeleccionados();
      }
     )

   }

}
