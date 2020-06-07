import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { DocumentoPresentar } from 'src/app/models/clases/crear-convocatoria/documento-presentar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeleccionDocumentos } from 'src/app/models/convocatoria-docente/seleccion-documentosPresentar';

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
  /*----- M para envio de datos ------------*/
  @Output() datosDocumentos = new EventEmitter();
  constructor(private formBuilder: FormBuilder) { 
    this.buildForm();
    this.seleccionDocumento=new SeleccionDocumentos();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formDocumentos = this.formBuilder.group({
      detalle: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });

    this.formDocumentos.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }
  save(event: Event) {
    event.preventDefault();
    if (this.formDocumentos.valid) {
      const value = this.formDocumentos.value;
      console.log(value);
    } else {
      this.formDocumentos.markAllAsTouched();
      console.log('marca');
    }
  }

  resetForm(){
    this.buildForm();
  }

  formValido(){
    if(this.formDocumentos.valid){
      this.addDocumento();
    }else{
      this.formDocumentos.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
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

  // metodos para almacenar lo de la interfaz
  addDocumento() {
    let descripcionDocumento = $('#descripcionDocumento').val();
   
    this.documento = new DocumentoPresentar(descripcionDocumento);
    this.seleccionDocumento.agregarDocumento(this.documento);
    this.listaDocumentos=this.seleccionDocumento.getDocumentosSeleccionados();
    //this.listaDocumentos.push(this.documento);
    console.log("------------------------");
    console.log(this.listaDocumentos);
    tata.success('Agregado.', 'Se agregó con exito.');
    $('#tablaDocumentos').modal('hide');
    console.log("prueba de saboo");
    console.log(JSON.stringify(this.listaDocumentos));
  }
  getindice(indice:number){
    let caracter:String=String.fromCharCode(indice+65).toLocaleLowerCase()+") ";
    return caracter;
  }

    /*-------------- metodo para recuperar los datos de este componente*/
    getDatos(){
      this.datosDocumentos.emit(this.listaDocumentos);
    }
}