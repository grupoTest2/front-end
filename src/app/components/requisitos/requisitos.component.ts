import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Requisito } from 'src/app/models/clases/crear-convocatoria/requisito';
import { SeleccionRequisito } from 'src/app/models/convocatoria-docente/seleccion-requisitos';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styleUrls: ['./requisitos.component.css']
})
export class RequisitosComponent implements OnInit {
  //Formulario
  formRequisitos: FormGroup;
  requisito:Requisito;
  listaRequisitos:Requisito[]=[];
  seleccionRequisitos:SeleccionRequisito= new SeleccionRequisito();


  //varaible de tipo evento para enviar los datos al fromaulario
  @Output() datosRequisitos = new EventEmitter();

  constructor(private apiPHP: PhpServeConvocatoria, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {

  }

  private buildForm() {
    this.formRequisitos = this.formBuilder.group({
      detalle: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });

    this.formRequisitos.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }
  save(event: Event) {
    event.preventDefault();
    if (this.formRequisitos.valid) {
      const value = this.formRequisitos.value;
      console.log(value);
    } else {
      this.formRequisitos.markAllAsTouched();
      console.log('marca');
    }
  }

  resetForm(){
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





  
  //enviando los datos al com[ponente formulario
  getDatos(){
    this.datosRequisitos.emit(this.listaRequisitos);
  }

  agregarRequisito(){
    console.log("aqui toy");
    let descripcionRequisito = $('#descripcionRequisito').val();
    this.requisito = new Requisito(descripcionRequisito);
    this.seleccionRequisitos.agregarRequisito(this.requisito);
    this.listaRequisitos = this.seleccionRequisitos.getListaRequisitosSeleccionados();
    tata.success('Agregado.', 'Se agregó con exito.');
    // this.formRequisitos.reset();
    $('#tablaRequisitos').modal('hide');
  }
  
  formValido(){
    if(this.formRequisitos.valid){
      this.agregarRequisito();
    }else{
      this.formRequisitos.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }

  getindice(indice:number){
    let caracter: string = String.fromCharCode(indice + 97)+")     ";
    return caracter;
  }

  //funcion para agregar los requisitos a la base de datos, se requiere del id lanzamiento de convocatoria
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
