import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

//validacion
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//servicios
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';

//models
import { DocumentoPresentar } from 'src/app/models/clases/convocatoria/documento-presentar';
import { SeleccionDocumentos } from 'src/app/models/convocatoria/seleccion-documentosPresentar';
import { Router } from '@angular/router';

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
  href: string = '';

  constructor(private formBuilder: FormBuilder,private editarConv: EditarConvocatoriaServicePhp, private router: Router) { 
    this.buildForm();
    this.seleccionDocumento=new SeleccionDocumentos();
    this.getDocumentosPresentar();
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

  aniadirDocumento():void {
    let descripcionDocumento = $('#descripcionDocumento').val();
    this.documento = new DocumentoPresentar(descripcionDocumento);
    this.documento.setAccion("insertar");
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

  editar(i: number): void{
    this.formDocumentos.get('detalle').setErrors(null);
    this.formDocumentos.markAllAsTouched();
    $('#descripcionDocumento').val(this.listaDocumentos[i].getDescripcion());
  }

  getindice(indice:number):string{
    let caracter:string=String.fromCharCode(indice+65).toLocaleLowerCase()+") ";
    return caracter;
  }

    getDatos():DocumentoPresentar[]{
      return this.listaDocumentos;
    }

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

    ErrorAlInsertarDocumento(mensaje:string='Formulario invalido'):void{
      this.formDocumentos.markAllAsTouched();
        tata.error('Error', mensaje);
    }

    get detalleForm() :any{
      return this.formDocumentos.get('detalle');
    }

    get detalleFormIsValid():any {
      return this.detalleForm.touched && this.detalleForm.valid;
    }

    get detalleFormIsInvalid():boolean {
      return this.detalleForm.touched && this.detalleForm.invalid;
    }

    estaHabilitado():string{
      return this.listaDocumentos.length>0?"bien":"establecer al menos un documento a presentar!!";
    }

    getDocumentosPresentar():void{
      if(localStorage.getItem("idConv")===""){
      }else{
        let idConv: number = parseInt(localStorage.getItem('idConv'));
        this.editarConv.getDocumentos(idConv).subscribe(
          resultado=>{
            for(let i in resultado){
              this.documento=new DocumentoPresentar(resultado[i].descripcion,resultado[i].idDocumento);
              this.seleccionDocumento.agregarDocumento(this.documento);
            }
            this.listaDocumentos=this.seleccionDocumento.getDocumentosSeleccionados();
          }
        )
      }
  }
}