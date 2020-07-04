import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// rutas
import { Router } from '@angular/router';

// formularios
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

//servicios
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';

// model
import { Tematica } from '../../../models/clases/convocatoria/tematica2';
import { CalificacionConocimiento } from 'src/app/models/convocatoria/calificacionConocimiento';
import { Requerimiento } from 'src/app/models/clases/convocatoria/requerimiento2';
import { TipoEvaluacion } from 'src/app/models/clases/convocatoria/tipo-de-evaluacion';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';

// jquery y toast
declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-calificacion-conocimientos',
  templateUrl: './calificacion-conocimientos.component.html',
  styleUrls: ['./calificacion-conocimientos.component.css']
})
export class CalificacionConocimientosComponent implements OnInit {

  calificacion: CalificacionConocimiento;
  listaCalificacion: CalificacionConocimiento[] = [];
  formCalificacion: FormGroup;
  href: string = '';
  listaTematicas: string[] = [];
  listaItems: Requerimiento[] = [];

  //
  listaTiposEvaluacion: TipoEvaluacion[] = [];// ocupando de la bd
  listaTiposEvaluacion2: TipoEvaluacion[] = [];//pruevas
  listaTematica: Tematica[] = []; //ocupando
  listaTiposDatos: TipoEvaluacion[] = [];
  banderaTematica = false;
  detalleTipoEvaluacion = "";
  constructor(private router: Router, private formBuilder: FormBuilder, private editarConv: EditarConvocatoriaServicePhp,
    private crearConv: PhpServeConvocatoria) {
    this.buildForm();
    this.getRequerimientosBD();
    this.getTematicasBD();
    this.getTiposEvaluacionBD();
  }

  ngOnInit(): void {
    this.href = this.router.url;
  }
  ruta() {
    if (this.href === '/habilitarConvocatoria/formulario') {
      return true;
    } else {
      return false;
    }
  }

  //metodo para seleccion de tematica
  seleccionoTematica() {
    var valor = $("#nombreTematica option:selected").val();
    valor.toString();
    if (valor != "Seleccione una tematica") {
      console.log("slecciono una tematica ---" + valor);
      for (let i = 0; i < this.listaTematica.length; i++) {
        if (this.listaTematica[i].getNombre() == valor) {
          this.listaTiposDatos = this.listaTematica[i].getTiposEvaluacion();
          this.banderaTematica = true;
        }
      }
    }
  }

  getindice(indice: number): string {
    let caracter: string = String.fromCharCode(indice + 65).toLocaleLowerCase() + ")     ";
    return caracter;
  }

  /*-------------- metodo para recuperar los datos de este componente*/
  getDatos(): Requerimiento[] {
    console.log(this.listaItems + "-------------------");
    return this.listaItems;
  }


  setListaRequerimiento(listaRequeriminetos: Requerimiento[]): void {
    console.log(listaRequeriminetos)
    this.listaItems = listaRequeriminetos;
    /*for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getListaTematicas().length == 0) {
        for (let j = 0; j < this.listaTematicas.length; j++) {
          this.listaItems[i].getListaTematicas().push(new Tematica(1,this.listaTematicas[j]));
        }
      }
    }
  }

    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      
    }*/
  }

  getDatosTipoEvaluacion(nombre: string) {
    this.detalleTipoEvaluacion = "";
    for (let i = 0; i < this.listaTematica.length; i++) {
      console.log(this.listaTematica[i].getNombre() + "--------" + nombre);
      if (this.listaTematica[i].getNombre() == nombre) {
        this.detalleTipoEvaluacion += "Tematica " + this.listaTematica[i].getNombre() + ", porcentaje de sus tipos de evaluacion: \n\n\n";
        for (let index = 0; index < this.listaTematica[i].getTiposEvaluacion().length; index++) {
          this.detalleTipoEvaluacion += this.listaTematica[i].getTiposEvaluacion()[index].getNombre() + ":" + this.listaTematica[i].getTiposEvaluacion()[index].getPorcentaje() + " \n ";
        }
      }
    }
  }


  agregarTematica(): void {
    var nombreTematica = $("#nombreTematica option:selected").val();
    nombreTematica.toString();
    if (!this.existeTematica(nombreTematica)) {
      this.listaTematicas.push(nombreTematica);
      var aux = 0;
      var contador = 0;
      var idInput = "";
      for (let index = 0; index < this.listaTiposDatos.length; index++) {
        let id = this.listaTiposDatos[index].getNombre();
        let value = $("#" + id).val();
        this.listaTiposDatos[index].setPorcentaje(Number(value));
      }
      for (let index = 0; index < this.listaTematica.length; index++) {
        if (this.listaTematica[index].getNombre() == nombreTematica) {
          this.listaTematica[index].setTiposEvaluacion(this.listaTiposDatos);
          this.listaTematica[index].setSeleccionado(true);
          console.log("cambio el estado!!")
        }
      }
      for (let i = 0; i < this.listaItems.length; i++) {
        if (this.listaItems[i].getNotaDisponible() > 0) {
          let id: any = this.listaItems[i].getNombreItem();
          idInput = id;
          let nota = parseInt((<HTMLInputElement>document.getElementById(id)).value);
          if ((<HTMLInputElement>document.getElementById(id)).value === "") {
            nota = 0;
            aux++;
          }
          let tematica: Tematica = new Tematica(this.getIdTematica(this.listaTematicas[this.listaTematicas.length - 1]), this.listaTematicas[this.listaTematicas.length - 1]);
          tematica.setAccion("insertar");
          tematica.setTiposEvaluacion(this.listaTiposDatos);
          this.listaItems[i].getListaTematicas().push(tematica);
          console.log(tematica)
        }
        else {
          for (let j = 0; j < this.listaTematicas.length; j++) {
            if (this.listaItems[i].getListaTematicas().length <= j) {
              let tem: Tematica = new Tematica(this.getIdTematica(this.listaTematicas[j]),this.listaTematicas[j]);
              tem.setAccion("insertar");
              tem.setTiposEvaluacion(this.listaTiposDatos);
              this.listaItems[i].getListaTematicas().push(tem);
              console.log(tem)
            }
          }
        }
      }

      (<HTMLInputElement>document.getElementById(idInput)).classList.remove("is-invalid");
      tata.success('Agregado.', 'Se agregó la tematica con exito.');
      this.formCalificacion.reset();
      $('#modalConocimientoAux').modal('hide');
    }
    else {
      this.ErrorAlInsertarDocumento(" ya existe una tematica con ese nombre!!")
    }
    this.quitarSeleccionTiposEvaluacion();
  }

  getIdTematica(nombre: string):number {
    let id=0;
    let bandera=true
    for (let index = 0; index < this.listaTematica.length&&bandera; index++) {
      if (this.listaTematica[index].getNombre()==nombre) {
             id=this.listaTematica[index].getIdTematica();
             bandera=false;
      }
    }
    return id;
  }

  mensajeErrorDePorcentajesIngresados(mensaje: string) {
    tata.error('Error', mensaje);
  }


  quitarSeleccionTiposEvaluacion() {
    for (let index = 0; index < this.listaTiposEvaluacion.length; index++) {
      this.listaTiposEvaluacion[index].setSeleccionado(false);
    }
  }

  ErrorAlInsertarDocumento(mensaje: string = 'Formulario invalido') {
    this.formCalificacion.markAllAsTouched();
    tata.error('Error', mensaje);
  }

  seleccionado(index: number) {
    if (this.listaTiposEvaluacion[index].getSeleccionado()) {
      this.listaTiposEvaluacion[index].setSeleccionado(false)
    }
    else {
      this.listaTiposEvaluacion[index].setSeleccionado(true)
    }
  }
  private existeTematica(nombre: string): boolean {
    let existe: boolean = false;
    for (let i in this.listaTematicas) {
      if (this.listaTematicas[i] === nombre) {
        existe = true;
        break;
      }
    }
    return existe;
  }


  hayDatos(): boolean {
    var bandera = false;
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getNotaDisponible() > 0) {
        bandera = true;
      }
    }
    return bandera;
  }

  // validaciones -------------------------------------------------------------------------------
  private buildForm(): void {
    this.formCalificacion = this.formBuilder.group({
      detalle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(/[a-zA-Z]/)])],
      nota: ['', Validators.compose([Validators.min(0), Validators.max(100), Validators.pattern(/^\d*$/)])]
    });
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.formCalificacion.valid) {
      const value = this.formCalificacion.value;
    } else {
      this.formCalificacion.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.banderaTematica = false;
    this.listaTiposDatos = [];
    $("#nombreTematica").val("porDefecto");
    $('input').removeClass('is-invalid');
    this.buildForm();
  }

  validarNota(): void {
    var aux = 0;
    var contador = 0;
    var bandera = false;
    var codigo: string = '';
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getNotaDisponible() > 0) {
        let id: any = this.listaItems[i].getNombreItem();
        if ((<HTMLInputElement>document.getElementById(id)).value === '') {
          aux++;
        }
        else {
          let id: any = this.listaItems[i].getNombreItem();
          let nota = parseInt((<HTMLInputElement>document.getElementById(id)).value);
          if (nota > this.listaItems[i].getNotaDisponible()) {
            aux++;
            (<HTMLInputElement>document.getElementById(id)).classList.add('is-invalid');
            codigo += this.listaItems[i].getNombreItem() + `<br>`;
            bandera = true;
          } else {
            (<HTMLInputElement>document.getElementById(id)).classList.remove('is-invalid');
          }
        }
        contador++;
      }
    }

    let sumatoria = 0;
    for (let index = 0; index < this.listaTiposEvaluacion.length; index++) {
      if (this.listaTiposEvaluacion[index].getSeleccionado()) {
        let id: any = this.listaTiposEvaluacion[index].getNombre();
        let value = (<HTMLInputElement>document.getElementById(id)).value;
        if (value != "") {
          console.log("tipo de evaluacion! " + id);
          let nota = parseInt(value);
          sumatoria += nota;
        }
      }
    }

    if (aux === contador || bandera || sumatoria != 100) {
      let mensaje = ``;
      if (bandera) {
        mensaje += `La nota excede el porcentaje disponible en:  ${codigo} <br>`;
      } if (sumatoria > 100) {
        mensaje += `La nota de los tipos de evaluacion exede el 100% <br>`;
      }
      if (sumatoria < 100 && sumatoria > 0) {
        mensaje += `La nota de los tipos de evaluacion no satisface el 100% requerido<br>`;
      }
      if (sumatoria == 0) {
        mensaje += `Debe de seleccionar tipos de evaluacion para los Items<br>`;
      }
      if (aux === contador) {
        mensaje += `La tematica debe tener minimo una nota asignada`;
      }

      this.mensajeErrorDePorcentajesIngresados(mensaje);
    } else {
      this.agregarTematica();
    }
  }

  formValido(): void {
    // if (this.formCalificacion.valid) {
    this.validarNota();
    //} else {
    //this.formCalificacion.markAllAsTouched();
    //tata.error('Error', 'Formulario invalido');
    //}
  }

  get detalle() {
    return this.formCalificacion.get('detalle');
  }
  get detalleIsValid() {
    return this.detalle.touched && this.detalle.valid;
  }
  get detalleIsInvalid() {
    return this.detalle.touched && this.detalle.invalid;
  }

  get nota() {
    return this.formCalificacion.get('nota');
  }
  get notaIsValid() {
    return this.nota.touched && this.nota.valid;
  }
  get notaIsInvalid() {
    return this.nota.touched && this.nota.invalid;
  }
  // fin validaciones


  /**
   *indica si la convocatoria es apta para ser lanzada 
   */
  estaHabilitado() {
    let res: boolean = true;
    if (this.listaTematicas.length > 0) {
      for (let i in this.listaItems) {
        console.log(this.listaItems[i].getNotaDisponible())
        res = this.listaItems[i].getNotaDisponible() == 0;
        if (!res) {
          break;
        }
      }
    } else {
      res = false;
    }
    return res;
  }

  /**
   * metodos que interactuan con la base de datos
   */
  getRequerimientosBD() {
    /* let bandera = true;
     if (localStorage.getItem("idConv") === "") {
       console.log("esta vacio en las calif");
     } else {
       let idConv: number = parseInt(localStorage.getItem("idConv"));
       this.editarConv.getRequerimientos(idConv).subscribe(
         resultado => {
           let req: Requerimiento;
           let listaAux: Requerimiento[] = [];
           let tem: Tematica;
           let listaTem: Tematica[];
           for (let i in resultado) {
             let listaAux2 = resultado[i].listaTematicas;
             listaTem = [];
             for (let j in listaAux2) {
               tem = new Tematica(listaAux2[j].nombre, parseInt(listaAux2[j].nota), listaAux2[j].idTematica);
               listaTem.push(tem);
               if (bandera) {
                 this.listaTematicas.push(tem.getNombre());
               }
             }
             bandera = false;
             req = new Requerimiento(resultado[i].cantidadItem,
               resultado[i].hrsAcademicas,
               resultado[i].nombreItem,
               listaTem,
               resultado[i].codigoItem);
             req.setIdMat(resultado[i].idItem);
             listaAux.push(req);
           }
           this.setListaRequerimiento(listaAux);
         }
       )
     }*/
  }

  getTematicasBD() {
    let idTipoConv = parseInt(localStorage.getItem("idTipo"));
    this.crearConv.getTematicas(idTipoConv).subscribe(
      resultado => {
        for (let i in resultado) {
          this.listaTematica.push(new Tematica( resultado[i].idTematica,resultado[i].nombre));
        }
        console.log("las tematicas desde la base de datos");
        console.log(this.listaTematica);
      }
    );
  }

  getTiposEvaluacionBD() {
    let idDep = 1;
    this.crearConv.getTiposEvaluacion(idDep).subscribe(
      resultado => {
        for (let i in resultado) {
          this.listaTiposEvaluacion.push(new TipoEvaluacion(resultado[i].idTipoEvaluacion, resultado[i].nombre));
        }
        console.log("los tipos de evaluacion de la base de datos");
        console.log(this.listaTiposEvaluacion);
      }
    );

  }
}
