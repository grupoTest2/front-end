import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

//validacion
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//models
import { DocumentoPresentar } from 'src/app/models/clases/convocatoria/documento-presentar';
import { SeleccionDocumentos } from 'src/app/models/convocatoria/seleccion-documentosPresentar';

//jquery y toast
declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-documentos-presentar',
  templateUrl: './documentos-presentar.component.html',
  styleUrls: ['./documentos-presentar.component.css']
})

export class DocumentosPresentarComponent implements OnInit {
  documento: DocumentoPresentar;
  listaDocumentos: DocumentoPresentar[] = [];
  formDocumentos: FormGroup;
  seleccionDocumento:SeleccionDocumentos;

  constructor(private formBuilder: FormBuilder) { 
    this.buildForm();
    this.seleccionDocumento=new SeleccionDocumentos();
  }

  ngOnInit(): void {
  }

  aniadirDocumento():void {
    let descripcionDocumento = $('#descripcionDocumento').val();
    this.documento = new DocumentoPresentar(descripcionDocumento);
    let respuesta=this.seleccionDocumento.agregarDocumento(this.documento);
    if(respuesta==='exito'){
    this.listaDocumentos=this.seleccionDocumento.getDocumentosSeleccionados();
    tata.success('Agregado.', 'Se agregó con exito.');
    $('#tablaDocumentos').modal('hide');
    }
    else{
      this.ErrorAlInsertarDocumento(respuesta);
    }
  }

  getindice(indice:number):string{
    let caracter:string=String.fromCharCode(indice+65).toLocaleLowerCase()+") ";
    return caracter;
  }

    /*-------------- metodo para recuperar los datos de este componente*/
    getDatos():DocumentoPresentar[]{
      return this.listaDocumentos;
    }


    //validaciones ---------------------------------------------------------------------------------
    private buildForm():void {
      this.formDocumentos = this.formBuilder.group({
        detalle: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
      });
    }
    save(event: Event):void {
      event.preventDefault();
      if (this.formDocumentos.valid) {
        const value = this.formDocumentos.value;
      } else {
        this.formDocumentos.markAllAsTouched();
      }
    }
  
    resetForm():void{
      this.buildForm();
    }
  
    formValido():void{
      if(this.formDocumentos.valid){
        this.aniadirDocumento();
      }else{
        this.ErrorAlInsertarDocumento();
      }
    }


    ErrorAlInsertarDocumento(mensaje:string='Formulario invalido'){
      this.formDocumentos.markAllAsTouched();
        tata.error('Error', mensaje);
    }

  
    get detalleForm() {
      return this.formDocumentos.get('detalle');
    }
    get detalleFormIsValid() {
      return this.detalleForm.touched && this.detalleForm.valid;
    }
    get detalleFormIsInvalid() {
      return this.detalleForm.touched && this.detalleForm.invalid;
    }
}