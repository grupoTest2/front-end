import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//servicios
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';

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

  constructor(private apiPHP: PhpServeConvocatoria, private formBuilder: FormBuilder) {
    this.buildForm();
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
    let respuesta =this.seleccionRequisitos.agregarRequisito(this.requisito);
    if(respuesta==='exito'){
    this.listaRequisitos = this.seleccionRequisitos.getListaRequisitosSeleccionados();
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

  
  //bd---------------------------------------------------
  agregarRequisitosBD(idLanzConv):boolean{
    let resp:boolean=false;
    // this.seleccionRequisitos.setIdLanzamientoConvocatoria(idLanzConv);
    this.apiPHP.agregarRequisitos(this.seleccionRequisitos.getListaRequisitosSeleccionados()).subscribe(
      datos => {
        if(datos['resultado']=="correcto"){
          //se agrego correctamente
          resp=true;
        }else{
          //ocurrio un error al guardar los datos 
        }
        alert(datos['mensaje']);
      }
    );
    return resp;
  }

}
