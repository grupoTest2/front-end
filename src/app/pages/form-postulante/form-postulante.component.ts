import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { from } from 'rxjs';
import { DatoRotulo } from 'src/app/models/clases/convocatoria/dato-rotulo';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { DatosPostulante } from 'src/app/models/clases/postulante/datos-postulante';
import { Item } from 'src/app/models/clases/convocatoria/item';
import { Postulante } from 'src/app/models/clases/postulante/postulante';
import { PostulanteServicePhp } from 'src/app/servicios/form-postulante/postulante.service';
import { TipoDatoRotulo } from 'src/app/models/clases/convocatoria/tipo-dato-rotulo';
import { combineAll } from 'rxjs/operators';

// para el pdf
import { PdfMakeWrapper, Txt, Columns, Stack, Table, TextReference, PageReference, Img } from 'pdfmake-wrapper';
import { Router } from '@angular/router';


declare var $: any;
declare var tata: any;
declare var swal: any;
@Component({
  selector: 'app-form-postulante',
  templateUrl: './form-postulante.component.html',
  styleUrls: ['./form-postulante.component.css']
})
export class FormPostulanteComponent implements OnInit {

  //listaDatosPostulante: DatosPostulante[] = [];
  listaItems: Item[] = [];
  postulante: Postulante; 
  listaCodigosRotulo:string[]=[];
  listaDatosRotulo: DatoRotulo[] = []// [new DatoRotulo(true, true, new TipoDatoRotulo("ss", "ss", 2))];
  bandera = true;
  banderaMostrar = false;

  msjErrorNumericoVacio = "campo numerico vacio"
  msjErrorNumericoCorto = "campo numerico corto"
  msjErrorNumericoIncorrecto = "numerico incorrectos";
  msjTextoVacio = "campo de texto vacio"
  msjTextocorto = "texto demasiado corto"
  msjTextoIncorrecto = "texto incorrecto"
  msjErrorEmailVacio = "campo de correo vacio"
  msjErrorEmailCorto = "campo de correo muy corto"
  msjErrorEmailIncorrecto = "correo incorrecto";

  habilitarBotonRotulo: boolean = false;

  banderaDatosCargados = true;
  lista:string[]=["1","2","3"];
  listaTipos:string[]=["commision1","comision2"];

  titulo="";
  constructor(private servicePostulante: PostulanteServicePhp, private router: Router) {
    this.enviarDatos();
  }

  ngOnInit(): void {
    this.titulo=localStorage.tituloConvocatoria;
    $('.switch').click(function () {
      $(this).toggleClass("switchOn");
    });
    this.getItemsBD();
    this.getDatosRotuloConvBD();
    //this.addListeners();
  }

 cargarLista(nombreLista){
     nombreLista=this.lista;
     console.log(nombreLista+"--------------------");
 }

 enviarDatos(){
   for (let index = 0; index < this.listaTipos.length; index++) {
       this.cargarLista(this.listaTipos[index]);     
   }
 }

  //////refactorizando
  addListeners() {
    if (this.banderaDatosCargados) {
      for (let index = 0; index < this.listaDatosRotulo.length; index++) {
        let id = this.listaDatosRotulo[index].getTipoDato().getNombre();
        let inputTipe = this.listaDatosRotulo[index].getTipoDato().getTipoDeDato();
        let tipoDatoRotulo = this.listaDatosRotulo[index].getTipoDato();
        if (inputTipe == 'number') {
          console.log("presiono un number" + id);
          this.cargarListenersTipoNumber(id, this.listaDatosRotulo[index].getTipoDato());
        } else {
          if (inputTipe == 'text') {
            this.cargarListenersTipoText(id, this.listaDatosRotulo[index].getTipoDato());
            console.log("presiono un text" + id)
          } else {
            if (inputTipe == 'email') {
              this.cargarListenersTipoEmail(id, this.listaDatosRotulo[index].getTipoDato());
            }
          }
        }
      }
    }
    this.banderaDatosCargados = false;
  }
  //  validacion de datos de tipo number
  cargarListenersTipoNumber(id: string, tipoDatoRotul: TipoDatoRotulo) {
    let tipoDatoRotulo: TipoDatoRotulo = tipoDatoRotul;
    let form = document.getElementById(id);
    form.addEventListener("blur", function (event) {
      let value = (<HTMLInputElement>document.getElementById(id)).value;
      if (value == "") {
        $("#" + id).removeClass("is-valid");
        $("#" + id).addClass("is-invalid");
        $("#" + id + "11").css('display', 'block');
        $("#" + id + "12").css('display', 'none');
      } else {
        if (value.length < tipoDatoRotulo.getTamanioMinimo()) {
          $("#" + id).removeClass("is-valid");
          $("#" + id).addClass("is-invalid");
          $("#" + id + "11").css('display', 'none');
          $("#" + id + "12").css('display', 'block');
        }
        else {
          if (value.length >= tipoDatoRotulo.getTamanioMinimo()) {
            $("#" + id).addClass("is-valid");
            $("#" + id + "11").css('display', 'none');
            $("#" + id + "12").css('display', 'none');
          }
        }
      }
    }, true);

    //validando el tecleo del datos
    let contador = 0;
    $("#" + id).keydown(function (e) {
      let value = (<HTMLInputElement>document.getElementById(id)).value;
      console.log("oresiono un btn")
      if (e.which == 8) {
        if (contador > 0) {
          contador -= 1;
        }
        if (contador == 0) {
          $("#" + id).removeClass("is-valid");
          $("#" + id).addClass("is-invalid");
          $("#" + id + "11").css('display', 'block');
          $("#" + id + "12").css('display', 'none');
        } else {
          if (contador < tipoDatoRotulo.getTamanioMinimo()) {
            $("#" + id).removeClass("is-valid");
            $("#" + id).addClass("is-invalid");
            $("#" + id + "11").css('display', 'none');
            $("#" + id + "12").css('display', 'block');
          }
          console.log("el contador esta en:" + contador + " tl tamano minimo es:" + tipoDatoRotulo.getTamanioMinimo() + " y el tamano del value es: " + (value.length));
        }
      }
      else {
        if (e.which == 32 && contador == 0) {//si presiona espacio
          return false;
        }
        else {
          if (e.which != 32) {
            contador += 1;
          }
          if ((value.length + 1) >= tipoDatoRotulo.getTamanioMinimo()) {
            $("#" + id).removeClass("is-invalid");
            $("#" + id).addClass("is-valid");
            $("#" + id + "11").css('display', 'none');
            $("#" + id + "12").css('display', 'none');
            $("#" + id + "13").css('display', 'none');
          }
        }
      }
    });
  }

  cargarListenersTipoText(id: string, tipoDatoRotul: TipoDatoRotulo) {
    let tipoDatoRotulo: TipoDatoRotulo = tipoDatoRotul;
    let form = document.getElementById(id);
    form.addEventListener("blur", function (event) {
      let value = (<HTMLInputElement>document.getElementById(id)).value;
      if (value.length == 0) {
        console.log("ingreso a tamano d value 0");
        $("#" + id).removeClass("is-valid");
        $("#" + id).addClass("is-invalid");
        $("#" + id + "21").css('display', 'block');
        $("#" + id + "22").css('display', 'none');
      } else {
        if (value.length <= 2) {
          $("#" + id).removeClass("is-valid");
          $("#" + id).addClass("is-invalid");
          $("#" + id + "21").css('display', 'none');
          $("#" + id + "22").css('display', 'block');
        }
        else {
          if (value.length >= tipoDatoRotulo.getTamanioMinimo()) {
            $("#" + id).removeClass("is-valid");
            $("#" + id).addClass("is-valid");
            $("#" + id + "21").css('display', 'none');
            $("#" + id + "22").css('display', 'none');
          }
        }
      }
    }, true);

    //validando el tecleo del datos
    let contador = 0;
    $("#" + id).keydown(function (e) {
      let value = (<HTMLInputElement>document.getElementById(id)).value;
      if (e.which == 8) {
        if (contador > 0) {
          contador -= 1;
        }
        console.log(contador + "el contador")
        if (contador == 0) {
          $("#" + id).removeClass("is-valid");
          $("#" + id).addClass("is-invalid");
          $("#" + id + "21").css('display', 'block');
          $("#" + id + "22").css('display', 'none');
          $("#" + id + "23").css('display', 'none');
        } else {
          if (contador < tipoDatoRotulo.getTamanioMinimo()) {
            $("#" + id).removeClass("is-valid");
            $("#" + id).addClass("is-invalid");
            $("#" + id + "21").css('display', 'none');
            $("#" + id + "22").css('display', 'block');
            $("#" + id + "23").css('display', 'none');
          }
        }
      }
      else {
        if (e.which == 32 && contador == 0) {
          return false;
        }
        else {
          contador += 1;
          if ((value.length + 1) >= tipoDatoRotulo.getTamanioMinimo()) {
            $("#" + id).removeClass("is-invalid");
            $("#" + id).addClass("is-valid");
            $("#" + id + "21").css('display', 'none');
            $("#" + id + "22").css('display', 'none');
            $("#" + id + "23").css('display', 'none');
          }
        }
      }
    });
  }

  cargarListenersTipoEmail(id: string, tipoDatoRotul: TipoDatoRotulo) {
    let tipoDatoRotulo: TipoDatoRotulo = tipoDatoRotul;
    let form = document.getElementById(id);
    form.addEventListener("blur", function (event) {
      let value = (<HTMLInputElement>document.getElementById(id)).value;
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      if (value.length == 0) {
        $("#" + id).removeClass("is-valid");
        $("#" + id).addClass("is-invalid");
        $("#" + id + "31").css('display', 'block');
        $("#" + id + "32").css('display', 'none');
        $("#" + id + "33").css('display', 'none');
      } else {

        if (value.length < tipoDatoRotulo.getTamanioMinimo() && value.length > 0) {
          $("#" + id).removeClass("is-valid");
          $("#" + id).addClass("is-invalid");
          $("#" + id + "31").css('display', 'none');
          $("#" + id + "32").css('display', 'block');
          $("#" + id + "33").css('display', 'none');
        }
        else {
          if (value.length >= tipoDatoRotulo.getTamanioMinimo()) {
            if (!pattern.test(value)) {
              $("#" + id).removeClass("is-invalid");
              $("#" + id).addClass("is-invalid");
              $("#" + id + "31").css('display', 'none');
              $("#" + id + "32").css('display', 'none');
              $("#" + id + "33").css('display', 'block');
            }
            if (pattern.test(value)) {
              $("#" + id).removeClass("is-invalid");
              $("#" + id).addClass("is-valid");
              $("#" + id + "31").css('display', 'none');
              $("#" + id + "32").css('display', 'none');
              $("#" + id + "33").css('display', 'none');
            }
          }
        }
      }
    }, true);

    //-------------------------------------------
    //validando el tecleo del datos
    let contador1 = 0;
    $("#" + id).keydown(function (e) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      let value = (<HTMLInputElement>document.getElementById(id)).value;
      let min=tipoDatoRotulo.getTamanioMinimo();
      if (e.which == 8) {
        console.log("min--"+min+"--"+contador1)
        if (contador1 > 0) {
          contador1 -= 1;
        }
        if (contador1 == 0) {
          $("#" + id).removeClass("is-valid");
          $("#" + id).addClass("is-invalid");
          $("#" + id + "31").css('display', 'block');
          $("#" + id + "32").css('display', 'none');
          $("#" + id + "33").css('display', 'none');
        } else {
          if (contador1 < min) {
            $("#" + id).removeClass("is-valid");
            $("#" + id).removeClass("is-valid");
            $("#" + id).addClass("is-invalid");
            $("#" + id + "31").css('display', 'none');
            $("#" + id + "32").css('display', 'block');
            $("#" + id + "33").css('display', 'none');
          }
        }
      }
      else {
        if (e.which == 32 && contador1 == 0) {
          return false;
        }
        else {
          contador1 += 1;
          if (contador1 >= tipoDatoRotulo.getTamanioMinimo() && pattern.test(value)) {
            $("#" + id).removeClass("is-invalid");
            $("#" + id).addClass("is-valid");
            $("#" + id + "31").css('display', 'none');
            $("#" + id + "32").css('display', 'none');
            $("#" + id + "33").css('display', 'none');
            contador1=$("#" + id).val().length;
            console.log("==========="+contador1)
          }
        }
      }
    });
  }


  getId(dato: TipoDatoRotulo) {
    console.log(dato.getNombre());
    return dato.getNombre();
  }

  seleccionItem(index: number) {
    if (this.listaItems[index].getSeleccionado()) {
      this.listaItems[index].setSeleccionado(false);
    }
    else {
      this.listaItems[index].setSeleccionado(true);
    }
  }

  cambio() {
    this.presionandoSwitch(false)
  }

  presionandoSwitch(bandera) {
    if (bandera) {
      console.log("presiono el switch ---------------------------")
      $('.switch').click();
    }
  }

  datosValidos() {
    let banderaItems = false;
    //rrecorremos la lista de items a los que se puede postular
    for (let index = 0; index < this.listaItems.length; index++) {
      if (this.listaItems[index].getSeleccionado()) {
        banderaItems = true;
      }
    }

    let banderaDatosRotulo = true;
    //recorremos la lista de los datos rotulo para ver si sus campos son validos
    for (let index = 0; index < this.listaDatosRotulo.length; index++) {
      let id = this.listaDatosRotulo[index].getTipoDato().getNombre();
      if ($("#" + id).hasClass("is-invalid") || $("#" + id).val() == "") {
        console.log(this.listaDatosRotulo[index].getTipoDato().getNombre() + " notiene un dato")
        banderaDatosRotulo = false;
      }
    }

    if (banderaDatosRotulo == false) {
      this.remarcarInputsInvalidos();
    }
    console.log(banderaItems + "items")
    console.log(banderaDatosRotulo + "datosR")

    if (banderaDatosRotulo == false && banderaItems == false) {
      this.mensajeToastError(`Seleccione un item por favor <br> Debe llenar todos los campos`);
    } else {
      if (banderaItems == false) {
        this.mensajeToastError('Seleccione un item por favor');//para que seleccione almenos un item
      }
      else {
        if (banderaDatosRotulo == false) {
          this.mensajeToastError('Debe llenar todos los campos');
        }
      }
    }
    if (banderaItems && banderaDatosRotulo) {
      this.alertRegistrar();
    }
  }

  //marcar los datos que estan  vacios
  remarcarInputsInvalidos() {
    for (let index = 0; index < this.listaDatosRotulo.length; index++) {
      let id = this.listaDatosRotulo[index].getTipoDato().getNombre();
      let inputTipe = $("#" + id).attr('type');
      let value = $("#" + id).val();
      if (inputTipe == "text") {
        if (value.length == 0) {
          $("#" + id).addClass("is-invalid");
          $("#" + id + "21").css('display', 'block');
        }
      } else {
        if (inputTipe == "number" && value.length == 0) {
          $("#" + id).addClass("is-invalid");
          $("#" + id + "11").css('display', 'block');
        }
        else {
          if (inputTipe == "email" && value.length == 0) {
            $("#" + id).addClass("is-invalid");
            $("#" + id + "31").css('display', 'block');
          }
        }
      }
    }
  }

  generarRotulo(){
    if(this.listaCodigosRotulo.length>0){
      if(this.listaCodigosRotulo.length==1){
        //rotulo por convocatoria
        this.pdfPorConvocatoria();
      }else{
        //rotulo por item
        this.pdfPorItem();
      }
    }else{
      console.log("no hay nada que crear")
    }
  }
  guardarDatos() {
    console.log("ingreso para guardar !!!!!!!!!!!!!!!!");
    console.log("todo valido !!!!!!!!!!!!!!!!");
    let valor;
    let datosPostulante: DatosPostulante[] = [];
    let dato: TipoDatoRotulo;
    let codigoSis: number = 0;
    for (let index = 0; index < this.listaDatosRotulo.length; index++) {
      dato = this.listaDatosRotulo[index].getTipoDato();
      let id = dato.getNombre();
      let valor = $("#" + id).val();
      if (dato.getTipoDeDato() == 'number') {
        valor = parseInt(valor);
      }
      if (dato.getNombre() == 'codigo_sis') {
        codigoSis = valor;
      }
      else {
        datosPostulante.push(new DatosPostulante(this.listaDatosRotulo[index].getIdDato(), id, valor));
      }
    }
    let listItems: Item[] = [];
    for (let index = 0; index < this.listaItems.length; index++) {
      if (this.listaItems[index].getSeleccionado()) {
        listItems.push(this.listaItems[index]);
      }

    }
    this.postulante = new Postulante(codigoSis, listItems, datosPostulante);
    console.log(JSON.stringify(this.postulante));
    this.registrarPostulanteBD(); // no registra --------------------------------------------------------------------------
    
   

  }


  mensajeToastError(mensaje: string): void {
    tata.error("Error", mensaje);

  }
  mensajeToastErrorBD(mensaje) {
    tata.error("Error", mensaje);

  }
  mensajeToastExito(mensaje) {
    tata.success("Registro Exitoso", mensaje);
  }

  alertRegistrar(): void {
    swal.fire({
      title: 'Guardar Datos',
      text: "¿Está seguro de guardar datos?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.guardarDatos();
        swal.fire(
          'Exitoso!',
          'Se generó su rotulo con exito.',
          'success'
        ).then((result) => {
        this.router.navigate(['/convocatoriasEnCurso']);
        });
      } else {
        swal.fire(
          'Cancelado!',
          'Sus datos no fueron guardados.',
          'warning'
        );

      }
    });
  }


  /**
   * metodos que interactuan con la base de datos
   */
  getItemsBD() {
    let idConv: number = parseInt(localStorage.getItem("idConv"));
    this.servicePostulante.getItems(idConv).subscribe(
      (resultado: Item) => {
        let item: Item;
        for (let i in resultado) {
          item = new Item(resultado[i].idItem, resultado[i].codigoItem, resultado[i].nombreItem);
          this.listaItems.push(item);
        }
      }
    )
  }



  getDatosRotuloConvBD() {
    let idConv: number = parseInt(localStorage.getItem("idConv"));
    let letListaAux: DatoRotulo[] = [];
    this.servicePostulante.getDatosPostulante(idConv).subscribe(
      resultado => {
        let tipoDato: TipoDatoRotulo;
        let datoRotulo: DatoRotulo;
        for (let i in resultado) {
          let objAux: any = resultado[i];
          let tipoAux = objAux.tipoDatoRotulo;
          tipoDato = new TipoDatoRotulo(tipoAux.nombre, tipoAux.tipoDato, tipoAux.minimo);
          datoRotulo = new DatoRotulo(objAux.idTipo, tipoDato);
          if (!this.banderaMostrar) {
            this.listaDatosRotulo.push(new DatoRotulo(0, new TipoDatoRotulo("codigo_sis", "number", 5)));
          }
          this.listaDatosRotulo.push(datoRotulo);

          this.banderaMostrar = true
          /*setInterval(() => {
            this.banderaMostrar=true;
            }, 2000);*/
        }
      }
    )

    console.log("la lista de datos rotulo desde la base de datos");
    console.log(this.listaDatosRotulo);
  }


  registrarPostulanteBD() {
      this.servicePostulante.agregarPostulante(this.postulante).subscribe(
        resultado=>{
          if(resultado['resultado']=='correcto'){
            //this.mensajeToastExito("datos registrados correctamente");
            let codigos=resultado['rotulos'];
            this.mensajeToastExito('Registro exítoso');
            this.habilitarBotonRotulo = true;
            console.log(codigos);
            for(let i in codigos){
              this.listaCodigosRotulo.push(codigos[i]);
            }
            this.generarRotulo();
          }else{
            console.log("error al registrar el postulante");
            //this.mensajeToastErrorBD("error al registrar el postulante");
          }
        },
        error => {
          this.mensajeToastError('El postulante con este codigo sis ya esta registrado');
          $("#codigo_sis").removeClass("is-valid");
          $("#codigo_sis").addClass("is-invalid");
          $("#codigo_sis13").css('display', 'block');
        }
      )
  }
  

  pdfPorConvocatoria() {
    var pdf = new PdfMakeWrapper();

    pdf.pageMargins([50, 60]);
    pdf.info({
      title: 'Rotulo postulante',
      author: 'huayraDevs'
    });
    //marca de agua
    pdf.watermark({ text: 'Universidad Mayor de San Simón', color: '#f2f2f2', opacity: 0.3, bold: true });

    //la cabecera
    pdf.add(new Txt(localStorage.getItem('tituloConvocatoria').toUpperCase() +'\n==========\n GESTION '+localStorage.getItem('gestionConvocatoria')).alignment('center').fontSize(18).bold().end);
    pdf.add(
      pdf.ln(1)
    );
    //el pie de pagina
    pdf.footer(new Txt('- Documento sin validez legal').fontSize(15).color('#f2f2f2').opacity(0.5).alignment('center').end);
    pdf.add(new Txt(this.listaCodigosRotulo[0]).fontSize(20).bold().alignment('right').end);
    pdf.add(
      pdf.ln(1)
    );
    pdf.add(new Txt('1.- Datos personales postulante:').fontSize(20).bold().end);
    pdf.add(
      pdf.ln(1)
    );
    for (let index = 0; index < this.postulante.getListaDatos().length; index++) {
      pdf.add(
        new Columns([{ text: this.capitalize(this.postulante.getListaDatos()[index].getNombreDato()), fontSize: 20, bold: true, width: 100 },
        { text: ':', fontSize: 15, bold: true, width: 15 },
        { text: this.postulante.getListaDatos()[index].getValorDato(), fontSize: 20, bold: false }]).end)
    }
    //salto de lineas
    pdf.add(
      pdf.ln(3)
    );
    pdf.add(new Txt('2.- Items a postular:').fontSize(20).bold().end);
    pdf.add(
      pdf.ln(1)
    );
    //datos de los items
    for (let index = 0; index < this.postulante.getListaItems().length; index++) {
      pdf.add(
        new Table([
          [{ text: this.capitalize(this.postulante.getListaItems()[index].getCodigoItem()) + ' :', fontSize: 18, bold: true },
          { text: this.capitalize(this.postulante.getListaItems()[index].getNombreItem()), fontSize: 18, bold: false }]
        ]).alignment('center').layout('noBorders').end
      );
    }

    pdf.defaultStyle({
      bold: true,
      fontSize: 20
    });/*
    pdf.add(
      new Txt('This is the text to be referenced').pageBreak('before').id('titlePage2').end
    );*/
    pdf.create().download();
  }

  pdfPorItem() {
    var pdf = new PdfMakeWrapper();
    var aux = 1;
    for (let index = 0; index < this.postulante.getListaItems().length; index++) {
      pdf.pageMargins([50, 60]);
      pdf.info({
        title: 'Rotulo postulante',
        author: 'huayraDevs'
      });
      //marca de agua
      pdf.watermark({ text: 'Universidad Mayor de San Simón', color: '#f2f2f2', opacity: 0.3, bold: true });

      //la cabecera
      pdf.add(new Txt(localStorage.getItem('tituloConvocatoria').toUpperCase() +'\n==========\n GESTION '+localStorage.getItem('gestionConvocatoria')).alignment('center').fontSize(18).bold().end);
      pdf.add(
        pdf.ln(1)
      );
      //el pie de pagina
      pdf.footer(new Txt('- Documento sin validez legal').fontSize(15).color('#f2f2f2').opacity(0.5).alignment('center').end);
      pdf.add(new Txt(this.listaCodigosRotulo[index]).fontSize(20).bold().alignment('right').end);
      pdf.add(
        pdf.ln(1)
      );
      pdf.add(new Txt('1.- Datos personales postulante:').fontSize(20).bold().end);
      pdf.add(
        pdf.ln(1)
      );
      for (let index = 0; index < this.postulante.getListaDatos().length; index++) {
        pdf.add(
          new Columns([{ text: this.capitalize(this.postulante.getListaDatos()[index].getNombreDato()), fontSize: 20, bold: true, width: 100 },
          { text: ':', fontSize: 15, bold: true, width: 15 },
          { text: this.postulante.getListaDatos()[index].getValorDato(), fontSize: 20, bold: false }]).end)
      }
      //salto de lineas
      pdf.add(
        pdf.ln(3)
      );
      pdf.add(new Txt('2.- Items a postular:').fontSize(20).bold().end);
      pdf.add(
        pdf.ln(1)
      );
      //datos de los items
      pdf.add(
        new Table([
          [{ text: this.capitalize(this.postulante.getListaItems()[index].getCodigoItem()) + ' :', fontSize: 18, bold: true },
          { text: this.capitalize(this.postulante.getListaItems()[index].getNombreItem()), fontSize: 18, bold: false }]
        ]).alignment('center').layout('noBorders').end
      );

      pdf.defaultStyle({
        bold: true,
        fontSize: 20
      });
      if (aux < this.postulante.getListaItems().length) {
        pdf.add(
          new Txt('').pageBreak('after').end
        );
        aux++;
      }
    }
    pdf.create().download();
  }

  capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

}

