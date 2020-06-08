import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CalifiaccionConocimientoAuxLabo } from 'src/app/models/convocatoria-laboratorio/califiaccionConocimiento';
import { SeleccionRequerimiento } from 'src/app/models/convocatoria-docente/seleccion-requerimientos';
import { Requerimiento } from 'src/app/models/clases/crear-convocatoria/requerimiento';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';

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

  requerimientosSeleccionados: Requerimiento[] =[];
 
  listaMateriasDisponibles: String[];

  requerimiento: Requerimiento;


  /*----- M para envio de datos ------------*/
  @Output() datosRequerimientos = new EventEmitter();
  href: string = "";

  /* lista de reuqerimientos de laborratorios */
  listaRequeriminetos: Requerimiento[] = [];


  //variable para enviar la lista de requerimientos
  @Output() listaRequerimientos = new EventEmitter();



  constructor(private formBuilder: FormBuilder, private apiPHP: PhpServeConvocatoria, private router: Router) {
    this.buildForm();
    this.getNombreItems();
  }

  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.router.url);
  }

  rutaActual() {
    if (this.href === '/convLaboratorio') {
      return true;
    } else {
      return false;
    }
  }

  // formularios con validaciones
  private buildForm() {
    this.formRequerimientos = this.formBuilder.group({
      items: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      horasMes: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      materia: ['', [Validators.required]],
    });

    this.formRequerimientos.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }
  save(event: Event) {
    event.preventDefault();
    if (this.formRequerimientos.valid) {
      const value = this.formRequerimientos.value;
      console.log(value);
    } else {
      this.formRequerimientos.markAllAsTouched();
      console.log("marca");
    }
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

  alertEliminar() {
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
  toastExitoso() {
    tata.success('Agregado.', 'El merito fue creado con exito.', {
      duration: 2000,
      animate: 'slide'
    });
  }
  toastError() {
    tata.error('Elinimado', 'El merito fue creado exitosamente', {
      duration: 2000,
      animate: 'slide'
    });
  }

  // metodos para almacenar lo de la interfaz
  guardarRequerimientos() {
    let numeroItems = parseInt($('#itemRequerimiento').val());
    let horasM = parseInt($('#horasMesRequerimiento').val());
    let nombreMateria = $('#seleccionaMateria').val()
    if (!this.rutaActual()) {
      this.requerimiento = new Requerimiento(numeroItems, horasM, nombreMateria);
      this.seleccionRequerimiento.agregarRequerimientoSeleccionado(this.requerimiento);
      this.requerimientosSeleccionados = this.seleccionRequerimiento.getMateriasSeleccionadas();
      //console.log(JSON.stringify(this.seleccionRequerimiento.getMateriasSeleccionadas()));
      this.listaMateriasDisponibles = this.seleccionRequerimiento.getListaMateriasDisponibles();
    }
    else {
      this.requerimiento = new Requerimiento(numeroItems, horasM, nombreMateria);
      this.seleccionRequerimiento.agregarRequerimientoSeleccionado(this.requerimiento);
      this.requerimientosSeleccionados = this.seleccionRequerimiento.getMateriasSeleccionadas();
      //llamando al metodo que enviara la actualizacion de la lista de requerimientos a la comp. calificaciones//
      this.enviarLista();
    }
    tata.success('Agregado.', 'Se agregó con exito.');
    this.formRequerimientos.reset();
    $('#tablaRequerimientos').modal('hide');
    localStorage.setItem('id', nombreMateria);
    sessionStorage.setItem('id22222', nombreMateria);
    console.log(this.requerimientosSeleccionados,"aquiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  }
  formValido() {
    if (this.formRequerimientos.valid) {
      this.guardarRequerimientos();
    } else {
      tata.error('Error', 'Formulario invalido');
    }
  }
  resetForm() {
    this.buildForm();
  }

  /*-------------- metodo para recuperar los datos de este componente*/
  getDatos() {
    this.datosRequerimientos.emit(this.requerimientosSeleccionados);
  }

  enviarLista() {
        this.listaRequerimientos.emit( this.requerimientosSeleccionados);
  }

/*-------------interaccion con la base de datos---------------------*/  
  //obtiene las materias desde la base de datos a traves de php
  getNombreItems() {

    let idTipoConvocatoria=2; //usar 1 para docencia y 2 para labo
    let listaItems: Object[] = new Array();
    this.apiPHP.getItems(idTipoConvocatoria).subscribe(
      result => {
        for (let i in result) {
          listaItems.push(result[i]);
        }
        this.seleccionRequerimiento = new SeleccionRequerimiento(listaItems);
        this.listaMateriasDisponibles = this.seleccionRequerimiento.getListaMateriasDisponibles();
        //console.log(this.listaMateriasDisponibles);
        //let objAux = JSON.parse(JSON.stringify(this.materia));
      }
    );
  }
  //envia las materias seleccionadas a la base de datos
  agregarRequerimientosBD(): boolean {
    let resp: boolean = false;
    this.apiPHP.agregarRequerimientos(this.seleccionRequerimiento.getMateriasSeleccionadas()).subscribe(
      datos => {
        if (datos['resultado'] == 'correcto') {
          //se agrega correctamente a la base de datos
          resp = true;
        } else {
          //no se pudo agregar
        }
        alert(datos['mensaje']);
      }
    );
    return resp;
  }
}
