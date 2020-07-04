import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// rutas
import { Router } from '@angular/router';

// formularios
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

//servicios
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';

// model
import { Tematica } from '../../../models/clases/convocatoria/tematica';
import { CalificacionConocimiento } from 'src/app/models/convocatoria/calificacionConocimiento';
import { Requerimiento } from 'src/app/models/clases/convocatoria/requerimiento';
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
    private crearConv:PhpServeConvocatoria) {
    this.buildForm();
    this.getRequerimientosBD();
    //this.cargarListaTematicas();
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

  cargarListaTematicas() {
    this.listaTiposEvaluacion.push(new TipoEvaluacion(1, 'escrito'));
    this.listaTiposEvaluacion.push(new TipoEvaluacion(1, 'oral'));
    this.listaTiposEvaluacion2.push(new TipoEvaluacion(1, 'fisico'));
    this.listaTiposEvaluacion2.push(new TipoEvaluacion(1, 'verval'));
    this.listaTiposEvaluacion2.push(new TipoEvaluacion(1, 'practico'));
    let tematica1: Tematica = new Tematica("introProgra", 100, 1);
    let tematica2: Tematica = new Tematica("elementos", 100, 1);
    let tematica3: Tematica = new Tematica("fisica", 100, 1);
    let tematica4: Tematica = new Tematica("psicologia", 100, 1);
    tematica1.setListaTipoEvaluacion((this.listaTiposEvaluacion));
    tematica2.setListaTipoEvaluacion((this.listaTiposEvaluacion));
    tematica3.setListaTipoEvaluacion((this.listaTiposEvaluacion));
    tematica4.setListaTipoEvaluacion((this.listaTiposEvaluacion2));
    this.listaTematica.push(tematica1);
    this.listaTematica.push(tematica2);
    this.listaTematica.push(tematica3);
    this.listaTematica.push(tematica4);
  }
  seleccionoTematica() {
    var valor = $("#nombreTematica option:selected").val();
    valor.toString();
    if (valor != "Seleccione una tematica") {
      console.log("slecciono una tematica ---" + valor);
      for (let i = 0; i < this.listaTematica.length; i++) {
        if (this.listaTematica[i].getNombre() == valor) {
          this.listaTiposDatos = this.listaTematica[i].getListaTipoEvaluacion();
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
    return this.listaItems;
  }


  setListaRequerimiento(listaRequeriminetos: Requerimiento[]): void {
    this.listaItems = listaRequeriminetos;
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].getListaTematica().length == 0) {
        for (let j = 0; j < this.listaTematicas.length; j++) {
          this.listaItems[i].getListaTematica().push(new Tematica(this.listaTematicas[j], 0));
        }
      }
    }
  }
  getDatosTipoEvaluacion(nombre: string) {
    this.detalleTipoEvaluacion = "";
    for (let i = 0; i < this.listaTematica.length; i++) {
      console.log(this.listaTematica[i].getNombre() + "--------" + nombre);
      if (this.listaTematica[i].getNombre() == nombre) {
        this.detalleTipoEvaluacion += "Tematica " + this.listaTematica[i].getNombre() + ", porcentaje de sus tipos de evaluacion: \n\n\n";
        for (let index = 0; index < this.listaTematica[i].getListaTipoEvaluacion().length; index++) {
          this.detalleTipoEvaluacion += this.listaTematica[i].getListaTipoEvaluacion()[index].getNombre() + ":" + this.listaTematica[i].getListaTipoEvaluacion()[index].getPorcentaje() + " \n ";
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
          this.listaTematica[index].setListaTipoEvaluacion(this.listaTiposDatos);
          this.listaTematica[index].setSeleccionado(true);
          console.log("cambio el estado!!")
        }
      }
      for (let i = 0; i < this.listaItems.length; i++) {
        if (this.listaItems[i].getNotaDisponible() > 0) {
          let id: any = this.listaItems[i].getnombreMateria();
          idInput = id;
          let nota = parseInt((<HTMLInputElement>document.getElementById(id)).value);
          if ((<HTMLInputElement>document.getElementById(id)).value === "") {
            nota = 0;
            aux++;
          }
          let tematica: Tematica = new Tematica(this.listaTematicas[this.listaTematicas.length - 1], nota);
          tematica.setAccion("insertar");
          tematica.setListaTipoEvaluacion(this.listaTiposDatos);
          this.listaItems[i].getListaTematica().push(tematica);
          console.log(tematica)
        }
        else {
          for (let j = 0; j < this.listaTematicas.length; j++) {
            if (this.listaItems[i].getListaTematica().length <= j) {
              let tem: Tematica = new Tematica(this.listaTematicas[j], 0);
              tem.setAccion("insertar");
              tem.setListaTipoEvaluacion(this.listaTiposDatos);
              this.listaItems[i].getListaTematica().push(tem);
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
  }
  ErrorAlInsertarDocumento(mensaje: string = 'Formulario invalido') {
    this.formCalificacion.markAllAsTouched();
    tata.error('Error', mensaje);
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
        let id: any = this.listaItems[i].getnombreMateria();
        if ((<HTMLInputElement>document.getElementById(id)).value === '') {
          aux++;
        }
        else {
          let id: any = this.listaItems[i].getnombreMateria();
          let nota = parseInt((<HTMLInputElement>document.getElementById(id)).value);
          if (nota > this.listaItems[i].getNotaDisponible()) {
            aux++;
            (<HTMLInputElement>document.getElementById(id)).classList.add('is-invalid');
            codigo = this.listaItems[i].getCodigoAuxiliatura();
            bandera = true;
          } else {
            (<HTMLInputElement>document.getElementById(id)).classList.remove('is-invalid');
          }
        }
        contador++;
      }
    }
    if (aux === contador || bandera) {
      if (bandera) {
        tata.error('Error', 'La nota excede el porcentaje disponible en: ' + codigo);
      } else {
        tata.error('Error', 'La tematica debe tener minimo una nota asignada');
      }
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
    let bandera = true;
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
    }
  }

  getTematicasBD(){
    let idTipoConv=parseInt(localStorage.getItem("idTipo"));
    this.crearConv.getTematicas(idTipoConv).subscribe(
      resultado=>{
        for(let i in resultado){
          this.listaTematica.push(new Tematica(resultado[i].nombre,0,resultado[i].idTematica));
        }
        console.log("las tematicas desde la base de datos");
        console.log(this.listaTematica);
      }
    );
  }

  getTiposEvaluacionBD(){
    let idDep=1;
    this.crearConv.getTiposEvaluacion(idDep).subscribe(
      resultado=>{
        for(let i in resultado){
          this.listaTiposEvaluacion.push(new TipoEvaluacion(resultado[i].idTipoEvaluacion,resultado[i].nombre));
        }
        console.log("los tipos de evaluacion de la base de datos");
        console.log(this.listaTiposEvaluacion);
      }
    );

  }
}
