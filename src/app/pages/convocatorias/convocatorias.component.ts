import { Component, OnInit } from '@angular/core';
import { Convocatoria } from 'src/app/models/clases/convocatoria/convocatoria';

//rutas
import { Router } from '@angular/router';

// form y validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoConvocatoria } from '../../models/clases/convocatoria/tipo-convocatoria';
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';

// jquery
declare var $: any;
@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css']
})
export class ConvocatoriasComponent implements OnInit {

  formCrearConv: FormGroup;
  filtroGestion = '';
  filtroTipo = '';
  filtroEstado = '';
  href: string = '';

  listaConvocatoria: Convocatoria[] = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private editarConv:EditarConvocatoriaServicePhp) {
    this.buildForm();
    this.cargarDatosConvocatoria();
    
    console.log("mi lista");
    console.log(this.listaConvocatoria);
  }

  ngOnInit(): void {
    this.href = this.router.url;
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  mostrar(): boolean {
    if (this.href === '/editar/convocatorias') {
      return true;
    } else {
      return false;
    }
  }

  cargarDatosConvocatoria() {
    let idDep=1;
    this.editarConv.getConvocatorias(idDep).subscribe(
      resultado => {
        let conv:Convocatoria;
        let tipo:TipoConvocatoria;
        for (let i in resultado) {
          let objAux:any=resultado[i];
          tipo = new TipoConvocatoria(objAux.idTipoConv, objAux.tipoConv);
          conv = new Convocatoria(
            objAux.idTipoConv,
            objAux.titulo,
            objAux.gestion,
            objAux.estado,
            tipo
          );
          this.listaConvocatoria.push(conv);
        }
      }
    );
  }

  listarTodo() {
    this.filtroGestion = '';
    this.filtroTipo = '';
    this.filtroEstado = '';
  }

  listaConvocatoriaComision() {
    let listaAuxiliar:Convocatoria[]=[];
    for (let index = 0; index < this.listaConvocatoria.length; index++) {
      if (this.listaConvocatoria[index].getEstado()==="en curso"||this.listaConvocatoria[index].getEstado()==="en configuracion") {
         listaAuxiliar.push(this.listaConvocatoria[index]);
      }
    }
    this.listaConvocatoria=listaAuxiliar;
  }

  editar(item: Convocatoria) {
    console.log("entraaaaaaa")
    this.formCrearConv.reset();
    $('#tituloConvocatoria').val(item.getTitulo());
    $('#seleccionGestion').val(item.getGestion());
  }

  loading() {
    $.fakeLoader({
      bgColor: '#2ecc71',
      spinner: "spinner3"
    });
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
