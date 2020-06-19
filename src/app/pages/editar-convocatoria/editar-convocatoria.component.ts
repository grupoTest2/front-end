import { Component, OnInit } from '@angular/core';
import { Convocatoria } from 'src/app/models/clases/convocatoria/convocatoria';


// form y validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoConvocatoria } from '../../models/clases/convocatoria/tipo-convocatoria';

// jquery
declare var $: any;
@Component({
  selector: 'app-editar-convocatoria',
  templateUrl: './editar-convocatoria.component.html',
  styleUrls: ['./editar-convocatoria.component.css']
})
export class EditarConvocatoriaComponent implements OnInit {

  formCrearConv: FormGroup;
  filtroGestion = '';
  filtroTipo = '';
  filtroEstado = '';


  listaConvocatoria: Convocatoria[] = [];
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
    this.cargarDatosConvocatoria();
   }

  ngOnInit(): void {
  } 


  cargarDatosConvocatoria(){
    this.listaConvocatoria.push(new Convocatoria(1, "titulo convocatoria 1","2020",'No asignada', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(2, "titulo convocatoria 2","2020",'No asignada', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(3, "titulo convocatoria 3","2020",'No asignada', new TipoConvocatoria(1,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(4, "titulo convocatoria 4","2021",'No asignada', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(5, "titulo convocatoria 5","2021",'en curso', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(6, "titulo convocatoria 6","2021",'en curso', new TipoConvocatoria(2,'Laboratorio')));
    this.listaConvocatoria.push(new Convocatoria(7, "titulo convocatoria 7","2022",'en curso', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(8, "titulo convocatoria 8","2022",'en curso', new TipoConvocatoria(2,'Laboratorio')));
    this.listaConvocatoria.push(new Convocatoria(9, "titulo convocatoria 9","2022",'desierta', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(10, "titulo convocatoria 10","2023",'desierta', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(11, "titulo convocatoria 11","2023",'desierta', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(12, "titulo convocatoria 12","2023",'desierta', new TipoConvocatoria(1,'Laboratorio')));
    this.listaConvocatoria.push(new Convocatoria(13, "titulo convocatoria 13","2023",'desierta', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(14, "titulo convocatoria 14","2020",'desierta', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(15, "titulo convocatoria 15","2019",'desierta', new TipoConvocatoria(1,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(16, "titulo convocatoria 16","2019",'desierta', new TipoConvocatoria(2,'Laboratorio')));
    this.listaConvocatoria.push(new Convocatoria(17, "titulo convocatoria 17","2019",'desierta', new TipoConvocatoria(2,'Laboratorio')));
    this.listaConvocatoria.push(new Convocatoria(18, "titulo convocatoria 18","2019",'No asignada', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(19, "titulo convocatoria 19","2019",'No asignada', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(20, "titulo convocatoria 20","2020",'No asignada', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(21, "titulo convocatoria 21","2018",'No asignada', new TipoConvocatoria(1,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(22, "titulo convocatoria 22","2018",'No asignada', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(23, "titulo convocatoria 23","2018",'desierta', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(24, "titulo convocatoria 24","2018",'en curso', new TipoConvocatoria(1,'Laboratorio')));
    this.listaConvocatoria.push(new Convocatoria(25, "titulo convocatoria 25","2018",'en curso', new TipoConvocatoria(2,'Docencia')));
    this.listaConvocatoria.push(new Convocatoria(26, "titulo convocatoria 26","2020",'en curso', new TipoConvocatoria(2,'Docencia')));
  }

  listarTodo(){
    this.filtroGestion = '';
    this.filtroTipo = '';
    this.filtroEstado = '';
  }

  editar(item: Convocatoria){
    this.formCrearConv.reset();
    $('#tituloConvocatoria').val(item.getTitulo());
    $('#seleccionGestion').val(item.getGestion());
  }

  // Validaciones -------------------------------------------------------------------------
  private buildForm(): void {
    this.formCrearConv = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      gestion: ['', [Validators.required]]
    });
  }
  save(event: Event): void {
    event.preventDefault();
    if (this.formCrearConv.valid) {
      const value = this.formCrearConv.value;
    } else {
      this.formCrearConv.markAllAsTouched();
    }
  }

  resetForm(): void {
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
}
