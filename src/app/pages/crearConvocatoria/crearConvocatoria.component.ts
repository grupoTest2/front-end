import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoConvocatoria } from '../../models/clases/crear-convocatoria/tipo-convocatoria';
import { Router } from '@angular/router';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { Convocatoria } from 'src/app/models/clases/crear-convocatoria/convocatoria';


declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-crear-convocatoria',
  templateUrl: './crearConvocatoria.component.html',
  styleUrls: ['./crearConvocatoria.component.css']
})
export class crearConvocatoriaComponent implements OnInit {

  //formulario validaciones
  formCrearConv: FormGroup;
  //tipo1: TipoConvocatoria = new TipoConvocatoria(1, 'docencia');
  //tipo2: TipoConvocatoria = new TipoConvocatoria(2, 'laboratorio');
  //listaTiposConvocatoria: TipoConvocatoria[] = [this.tipo1, this.tipo2];
  listaTiposConvocatoria: TipoConvocatoria[]=[];
  constructor(private formBuilder: FormBuilder,  private apiPHP: PhpServeConvocatoria,private router: Router) {
    this.buildForm();
    this.getTipoConvocatoriaBD();
  }

  ngOnInit(): void {
  }


  // Validaciones -------------------------------------------------------------------------
  private buildForm() {
    this.formCrearConv = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      gestion: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });

    this.formCrearConv.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }
  save(event: Event) {
    event.preventDefault();
    if (this.formCrearConv.valid) {
      const value = this.formCrearConv.value;
      console.log(value);
    } else {
      this.formCrearConv.markAllAsTouched();
      console.log('marca');
    }
  }

  resetForm(){
    this.buildForm();
  }

  get tituloForm() {
    return this.formCrearConv.get('titulo');
  }
  get tituloFormIsValid() {
    return this.tituloForm.touched && this.tituloForm.valid;
  }
  get tituloFormIsInvalid() {
    return this.tituloForm.touched && this.tituloForm.invalid;
  }

  get gestionForm() {
    return this.formCrearConv.get('gestion');
  }
  get gestionFormIsValid() {
    return this.gestionForm.touched && this.gestionForm.valid;
  }
  get gestionFormIsInvalid() {
    return this.gestionForm.touched && this.gestionForm.invalid;
  }

  get tipoForm() {
    return this.formCrearConv.get('tipo');
  }
  get tipoFormIsValid() {
    return this.tipoForm.touched && this.tipoForm.valid;
  }
  get tipoFormIsInvalid() {
    return this.tipoForm.touched && this.tipoForm.invalid;
  }
   // Fin validaciones -------------------------------------------------------------------------

  //  Rutas -------------------------------------------------------------------------------------
  ruta(){
    var id = $('#tipoConvocatoria').val();
    this.router.navigate(['crearConvocatoria/tipo', id]);
  }
  /*---------------------------------interaccion con la BD-------------------------------*/
  getTipoConvocatoriaBD(){
    let idDep=1;
    let listaTipos:any[]=new Array();
    this.apiPHP.getTipoConvocatoria(idDep).subscribe(
      result => {
        for (let i in result) {
          listaTipos.push(result[i]);
        }
        //console.log(listaTipos);
        let tipo: TipoConvocatoria;
        for(let i in listaTipos){
          tipo= new TipoConvocatoria(listaTipos[i].idTipoConv,listaTipos[i].nombre);
          //console.log(tipo);
          this.listaTiposConvocatoria.push(tipo);
        }
      }
    );
    
  }

  crearConvocatoriaBD(){
    let res:boolean=false;
    let objAux:Convocatoria;
    this.apiPHP.crearConvocatoria(objAux).subscribe(
      respuesta => {
        if (respuesta['resultado'] == 'correcto') {
          //se crea correctamente la convocatoria
          if(respuesta['mensaje']!=-1){
            objAux.setIdConv(respuesta['mensaje']);
            res=true;
          }
        } else {
          //no se pudo agregar
        }
      }
    );
    return res;
  }
}
