import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//rutas
import { Router } from '@angular/router';

//servicios
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { DatosConvocatoriaService } from '../../../servicios/datos-convocatoria.service';

//models
import { SeleccionRequerimiento } from 'src/app/models/convocatoria/seleccion-requerimientos';
import { Requerimiento } from 'src/app/models/clases/convocatoria/requerimiento';
import { debounceTime } from 'rxjs/operators';
import { SeleccionTipoDatoRotulo } from 'src/app/models/convocatoria/seleccion-tipo-dato-rotulo';
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';
import { Tematica } from 'src/app/models/clases/convocatoria/tematica';

//jquery, toast, alertas
declare var swal: any;
declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})

export class RequerimientosComponent implements OnInit {

  formRequerimientos: FormGroup;
  seleccionRequerimiento: SeleccionRequerimiento;
  requerimientosSeleccionados: Requerimiento[] = [];
  listaMateriasDisponibles: String[];
  requerimiento: Requerimiento;

  /*----- M para envio de datos ------------*/
  href: string = "";

  /* lista de reuqerimientos de laborratorios */
  listaRequeriminetos: Requerimiento[] = [];

  //variable para enviar la lista de requerimientos
  @Output() listaRequerimientos = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private apiPHP: PhpServeConvocatoria,
    private router: Router,
    private datosConvocatoria: DatosConvocatoriaService,
    private editarConv:EditarConvocatoriaServicePhp) {
    this.buildForm();
    this.getNombreItems();
    this.getRequerimientosBD();
    
  }

  ngOnInit(): void {
    this.href = this.router.url;
  }

  alertEliminar(): void {
    swal.fire({
      title: 'Eliminar',
      text: "¿Desea eliminar el campo seleccionado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Exitoso!',
          'El campo fue eliminado.',
          'success'
        )
      } else {
        swal.fire(
          'Cancelado!',
          'El campo no fue eliminado.',
          'error'
        )
      }
    })
  }

  // notificaciones--------------------------------
  toastExitoso(): void {
    tata.success('Agregado.', 'El merito fue creado con exito.', {
      duration: 2000,
      animate: 'slide'
    });
  }

  toastError(): void {
    tata.error('Elinimado', 'El merito fue creado exitosamente', {
      duration: 2000,
      animate: 'slide'
    });
  }

  // metodos para almacenar lo de la interfaz
  guardarRequerimientos(): void {
    let numeroItems = parseInt($('#itemRequerimiento').val());
    let horasM = parseInt($('#horasMesRequerimiento').val());
    let nombreMateria = $('#seleccionaMateria').val()
    this.requerimiento = new Requerimiento(numeroItems, horasM, nombreMateria);
    this.requerimiento.setAccion("insertar");
    this.seleccionRequerimiento.agregarRequerimientoSeleccionado(this.requerimiento);
    this.requerimientosSeleccionados = this.seleccionRequerimiento.getMateriasSeleccionadas();
    this.listaMateriasDisponibles = this.seleccionRequerimiento.getListaMateriasDisponibles();
    //llamando al metodo que enviara la actualizacion de la lista de requerimientos a la comp. calificaciones//
    console.log(this.requerimientosSeleccionados);
    this.enviarLista();
    tata.success('Agregado.', 'Se agregó con exito.');
    this.formRequerimientos.reset();
    $('#tablaRequerimientos').modal('hide');
  }

  /*-------------- metodo para recuperar los datos de este componente*/
  getDatos(): Requerimiento[] {
    return this.requerimientosSeleccionados;
  }

  enviarLista(): void {
    this.listaRequerimientos.emit(this.requerimientosSeleccionados);
  }

  // validacion ------------------------------------------------------------------------
  private buildForm(): void {
    this.formRequerimientos = this.formBuilder.group({
      items: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      horasMes: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      materia: ['', [Validators.required]],
    });

    this.formRequerimientos.valueChanges
      .subscribe(value => {
      });
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.formRequerimientos.valid) {
      const value = this.formRequerimientos.value;
    } else {
      this.formRequerimientos.markAllAsTouched();
    }
  }

  formValido(): void {
    if (this.formRequerimientos.valid) {
      this.guardarRequerimientos();
    } else {
      tata.error('Error', 'Formulario invalido');
    }
  }
  resetForm(): void {
    this.buildForm();
  }

  get materiaForm() {
    return this.formRequerimientos.get('materia');
  }

  get materiaFormIsValid() {
    return this.materiaForm.touched && this.materiaForm.valid;
  }

  get materiaFormIsInvalid() {
    return this.materiaForm.touched && this.materiaForm.invalid;
  }

  get horasMes() {
    return this.formRequerimientos.get('horasMes');
  }

  get horasMesIsValid() {
    return this.horasMes.touched && this.horasMes.valid;
  }

  get horasMesIsInvalid() {
    return this.horasMes.touched && this.horasMes.invalid;
  }

  get item() {
    return this.formRequerimientos.get('items');
  }

  get itemIsValid() {
    return this.item.touched && this.item.valid;
  }

  get itemIsInvalid() {
    return this.item.touched && this.item.invalid;
  }



  /*-------------interaccion con la base de datos---------------------*/
  getNombreItems(): void {
    let idTipoConvocatoria: number = parseInt(localStorage.getItem("idTipo")); //usar 1 para docencia y 2 para labo
    let listaItems: Object[] = new Array();
    this.apiPHP.getItems(idTipoConvocatoria).subscribe(
      result => {
        for (let i in result) {
          listaItems.push(result[i]);
        }
        this.seleccionRequerimiento = new SeleccionRequerimiento(listaItems);
        this.listaMateriasDisponibles = this.seleccionRequerimiento.getListaMateriasDisponibles();
      }
    );
  }

  getRequerimientosBD(): void {
    let idConv: number = parseInt(localStorage.getItem("idConv"));
    this.editarConv.getRequerimientos(idConv).subscribe(
      resultado=>{
        let req: Requerimiento;
        let tem: Tematica;
        let listaTem:Tematica[];
        for(let i in resultado){
          let listaAux2=resultado[i].listaTematicas;
          listaTem=[];
          for(let j in listaAux2){
            tem=new Tematica(listaAux2[j].nombre,listaAux2[j].nota);
            listaTem.push(tem);
          }
          req=new Requerimiento(resultado[i].cantidadItem,
            resultado[i].hrsAcademicas, 
            resultado[i].nombreItem,
            listaTem,
            resultado[i].codigoItem);
          this.seleccionRequerimiento.agregarRequerimientoSeleccionado(req);
          
        }
        this.requerimientosSeleccionados = this.seleccionRequerimiento.getMateriasSeleccionadas();
        console.log(this.requerimientosSeleccionados);
        this.listaMateriasDisponibles = this.seleccionRequerimiento.getListaMateriasDisponibles();
        this.enviarLista();
      }
    )
  }

}
