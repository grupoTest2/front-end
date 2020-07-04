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
import { Requerimiento } from 'src/app/models/clases/convocatoria/requerimiento2';
import { debounceTime } from 'rxjs/operators';
import { SeleccionTipoDatoRotulo } from 'src/app/models/convocatoria/seleccion-tipo-dato-rotulo';
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';
import { Tematica } from 'src/app/models/clases/convocatoria/tematica';
import { async } from 'rxjs/internal/scheduler/async';
import { Item } from 'src/app/models/clases/convocatoria/item';

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
  listaRequerimientosX:Requerimiento[]=[];
  listaItems:Item[]=[];
  formRequerimientos: FormGroup;
  seleccionRequerimiento: SeleccionRequerimiento=new SeleccionRequerimiento([]);
  requerimientosSeleccionados: Requerimiento[] = [];
  listaMateriasDisponibles: String[];
  requerimiento: Requerimiento;

  /*----- M para envio de datos ------------*/
  href: string = "";

  /* lista de reuqerimientos de laborratorios */
  listaRequeriminetos: Requerimiento[] = [];

  //variable para enviar la lista de requerimientos
  @Output() listaRequerimientos = new EventEmitter();

  bandera = true;
  constructor(private formBuilder: FormBuilder,
    private apiPHP: PhpServeConvocatoria,
    private router: Router,
    private datosConvocatoria: DatosConvocatoriaService,
    private editarConv: EditarConvocatoriaServicePhp) {
    this.buildForm();
    this.getItems();
    /*.then(() => {
      if (!this.seleccionRequerimiento.hayMateriasDisponibles()) {
        this.bandera = false;
      }
      else{
        this.bandera=true;
      }
      console.log("despues de la promesa")
    })
      .catch(error => console.error(error));
*/
  }

  ngOnInit(): void {
    //this.getRequerimientosBD();

    this.href = this.router.url;
  }

  hayItemDisponible(): boolean{
    let bandera=false;
     for(let i=0;i<this.listaItems.length&&!bandera;i++){
      bandera=this.listaItems[i].getSeleccionado();
     }
     return bandera;
  }
   async cambioBandera(){
    if (!this.seleccionRequerimiento.hayMateriasDisponibles()) {
      this.bandera = false;
    }
    else{
      this.bandera=true;
    }
    console.log("despues de la promesa")
  }

  ruta() {
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    } else {
      return false;
    }
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
    /*this.requerimiento = new Requerimiento(numeroItems, horasM, nombreMateria);
    this.requerimiento.setAccion("insertar");
    this.seleccionRequerimiento.agregarRequerimientoSeleccionado(this.requerimiento);
    this.requerimientosSeleccionados = this.seleccionRequerimiento.getMateriasSeleccionadas();
    this.listaMateriasDisponibles = this.seleccionRequerimiento.getListaMateriasDisponibles();
    //llamando al metodo que enviara la actualizacion de la lista de requerimientos a la comp. calificaciones//
    this.enviarLista();
    if (!this.seleccionRequerimiento.hayMateriasDisponibles()) {
      this.bandera = false;
    }*/
  }

  // editar modal
  editar(i: number): void {
    /*this.formRequerimientos.get('items').setErrors(null);
    this.formRequerimientos.get('horasMes').setErrors(null);
    this.formRequerimientos.get('materia').setErrors(null);
    $('#itemRequerimiento').val(this.requerimientosSeleccionados[i].getCantidadItem());
    $('#horasMesRequerimiento').val(this.requerimientosSeleccionados[i].getHrsAcademicas());
    $('#seleccionaMateria').val(this.requerimientosSeleccionados[i].getnombreMateria());*/
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
      $('#tablaRequerimientos').modal('hide');
      this.guardarRequerimientos();
      tata.success('Agregado.', 'Se agregó con exito.');
      this.formRequerimientos.reset();
    } else {
      tata.error('Error', 'Formulario invalido');
    }
  }
  resetForm(): void {

    if (!this.seleccionRequerimiento.hayMateriasDisponibles()) {
      $('#btnAniadir').click(function () {
        $(this).removeAttr('data-target');
       // $(this).attr('data-target', '#carousel');
        //$(".active").attr('data-target', '');
    });
    }
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

  /**
   * verificar si es apto para que la convocatoria sea lanzada
   */
  estaHabilitado() {
    return this.requerimientosSeleccionados.length > 0;
  }
  /*-------------interaccion con la base de datos---------------------*/
  getItems(): void {
    let idTipoConvocatoria: number = parseInt(localStorage.getItem("idTipo")); //usar 1 para docencia y 2 para labo
    this.apiPHP.getItems(idTipoConvocatoria).subscribe(
      result => {
        for (let i in result) {
          this.listaItems.push(new Item(result[i].idItem,result[i].codigoItem,result[i].nombreItem));
        }
        console.log("los items desde la base de datos");
        console.log(this.listaItems);
        //this.seleccionRequerimiento = new SeleccionRequerimiento(listaItems);
        //this.listaMateriasDisponibles = this.seleccionRequerimiento.getListaMateriasDisponibles();
      }
    );
  }

  /*getRequerimientosBD() {
    if(localStorage.getItem("idConv")===""){
      console.log("esta vacio en los requerimientos");
    }else{
      let idConv: number = parseInt(localStorage.getItem("idConv"));
      this.editarConv.getRequerimientos(idConv).subscribe(
        resultado => {
          let req: Requerimiento;
          let tem: Tematica;
          let listaTem: Tematica[];
          for (let i in resultado) {
            let listaAux2 = resultado[i].listaTematicas;
            listaTem = [];
            for (let j in listaAux2) {
              tem = new Tematica(listaAux2[j].nombre, parseInt(listaAux2[j].nota), listaAux2[j].idTematica);
              listaTem.push(tem);
            }
            req = new Requerimiento(resultado[i].cantidadItem,
              resultado[i].hrsAcademicas,
              resultado[i].nombreItem,
              listaTem,
              resultado[i].codigoItem);
            req.setIdMat(resultado[i].idItem);
            this.seleccionRequerimiento.agregarRequerimientoSeleccionado(req);

          }
          this.bandera = true;

          this.requerimientosSeleccionados = this.seleccionRequerimiento.getMateriasSeleccionadas();
          this.listaMateriasDisponibles = this.seleccionRequerimiento.getListaMateriasDisponibles();
          this.cambioBandera();
          this.enviarLista();
        }
      )
    }
  }*/

}
