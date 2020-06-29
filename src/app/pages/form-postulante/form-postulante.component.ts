import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { from } from 'rxjs';
import { DatoRotulo } from 'src/app/models/clases/convocatoria/dato-rotulo';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { DatosPostulante } from 'src/app/models/clases/postulante/datos-postulante';
import { Item } from 'src/app/models/clases/postulante/item';
import { Postulante } from 'src/app/models/clases/postulante/postulante';
import { PostulanteServicePhp } from 'src/app/servicios/form-postulante/postulante.service';
import { TipoDatoRotulo } from 'src/app/models/clases/convocatoria/tipo-dato-rotulo';
import { combineAll } from 'rxjs/operators';

declare var $: any;
declare var tata: any;

@Component({
  selector: 'app-form-postulante',
  templateUrl: './form-postulante.component.html',
  styleUrls: ['./form-postulante.component.css']
})
export class FormPostulanteComponent implements OnInit {

  //listaDatosPostulante: DatosPostulante[] = [];
  listaItems: Item[] = [];
  postulante: Postulante;
  listaDatosRotulo: DatoRotulo[] = []// [new DatoRotulo(true, true, new TipoDatoRotulo("ss", "ss", 2))];
  bandera = true;


  msjErrorNumericoVacio = "campo numerico vacio"
  msjErrorNumericoCorto = "campo numerico corto"
  msjErrorNumericoIncorrecto = "numerico incorrectos";
  msjTextoVacio = "campo de texto vacio"
  msjTextocorto = "texto demasiado corto"
  msjTextoIncorrecto = "texto incorrecto"
  msjErrorEmailVacio = "campo de correo vacio"
  msjErrorEmailCorto = "campo de correo muy corto"
  msjErrorEmailIncorrecto = "correo incorrecto";
  constructor(private servicePostulante: PostulanteServicePhp) {
    this.datosPrueba();
    this.getItemsBD();
    //  this.getDatosRotuloConvBD();

  }

  ngOnInit(): void {
    $('.switch').click(function () {
      $(this).toggleClass("switchOn");
    });
  }

  datosPrueba() {
    let tipoDato1: TipoDatoRotulo = new TipoDatoRotulo("nombre", "text", 3);
    let tipoDato2: TipoDatoRotulo = new TipoDatoRotulo("codigo_sis", "number", 5);
    let tipoDato3: TipoDatoRotulo = new TipoDatoRotulo("correo_Electronico", "email", 5);
    let datoRotulo1: DatoRotulo = new DatoRotulo(1, tipoDato1);
    let datoRotulo2: DatoRotulo = new DatoRotulo(1, tipoDato2);
    let datoRotulo3: DatoRotulo = new DatoRotulo(1, tipoDato3);
    this.listaDatosRotulo.push(datoRotulo1);
    this.listaDatosRotulo.push(datoRotulo2);
    this.listaDatosRotulo.push(datoRotulo3);

  }

  validarDato() {
    if (this.bandera) {
      for (let index = 0; index < this.listaDatosRotulo.length; index++) {
        let id = this.listaDatosRotulo[index].getTipoDato().getNombre();
        let inputTipe = this.listaDatosRotulo[index].getTipoDato().getTipoDeDato();
        let aux = document.getElementById(id);
        let tipoDatoRotulo = this.listaDatosRotulo[index].getTipoDato();
        var form = document.getElementById(id);
        aux.addEventListener("blur", function (event) {
          let value = $("#" + id).val();
          var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
          //inputs tipo number
          if (inputTipe == "number") {
            value = $("#" + id).val();
            if (value.length == 0) {
              console.log("ingreso a tamano d value 0");
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
          } else

          //input tipo texto
          {
            if (inputTipe == "text") {
              value = $("#" + id).val();
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
                    $("#" + id).addClass("is-valid");
                    $("#" + id + "21").css('display', 'none');
                    $("#" + id + "22").css('display', 'none');
                  }
                }
              }
              /* if (value.includes('.')) {
                 $("#" + id).addClass("is-invalid");
                 $("#" + id + "21").css('display', 'none');
                 $("#" + id + "22").css('display', 'none');
                 $("#" + id + "23").css('display', 'block');
               }*/
            }

            //input tipo gmail
            else {
              if (inputTipe == "email") {
                value = $("#" + id).val();
                if (value.length == 0) {
                  $("#" + id).removeClass("is-valid");
                  $("#" + id).addClass("is-invalid");
                  $("#" + id + "31").css('display', 'block');
                  $("#" + id + "32").css('display', 'none');
                  $("#" + id + "33").css('display', 'none');
                }
                if (value.length < 5 && value.length > 0) {
                  $("#" + id).removeClass("is-valid");
                  $("#" + id).addClass("is-invalid");
                  $("#" + id + "31").css('display', 'none');
                  $("#" + id + "32").css('display', 'block');
                  $("#" + id + "33").css('display', 'none');
                }
                if (value.length >= 4) {
                  if (!pattern.test(value)) {
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
          }
        }, true);

        let contador = 0;
        $("#" + id).keydown(function (e) {
          if (e.which == 8) {
            if (contador > 0) {
              contador -= 1;
            }
            if (contador == 0) {
              $("#" + id).removeClass("is-valid");
              $("#" + id).addClass("is-invalid");
              if (tipoDatoRotulo.getTipoDeDato() == 'number') {
                $("#" + id + "11").css('display', 'block');
                $("#" + id + "12").css('display', 'none');
              }
              else {
                if (tipoDatoRotulo.getTipoDeDato() == 'text') {
                  $("#" + id + "21").css('display', 'block');
                  $("#" + id + "22").css('display', 'none');
                }
                else {
                  if (tipoDatoRotulo.getTipoDeDato() == 'email') {
                    $("#" + id + "31").css('display', 'block');
                    $("#" + id + "32").css('display', 'none');
                    $("#" + id + "33").css('display', 'none');
                  }
                }
              }
            }
            else {
              if (tipoDatoRotulo.getTipoDeDato() == "number" && ($("#" + id).val().length + 1) < tipoDatoRotulo.getTamanioMinimo()) {
                $("#" + id).removeClass("is-valid");
                $("#" + id).addClass("is-invalid");
                $("#" + id + "11").css('display', 'none');
                $("#" + id + "12").css('display', 'block');
              }
              else {
                if (contador < tipoDatoRotulo.getTamanioMinimo()) {
                  console.log("ingreso");
                  $("#" + id).removeClass("is-valid");
                  $("#" + id).addClass("is-invalid");
                  if (tipoDatoRotulo.getTipoDeDato() == 'text') {
                    $("#" + id + "21").css('display', 'none');
                    $("#" + id + "22").css('display', 'block');
                  } else {
                    if (tipoDatoRotulo.getTipoDeDato() == 'email') {
                      $("#" + id + "31").css('display', 'none');
                      $("#" + id + "32").css('display', 'block');
                    }
                  }
                }
              }

              //console.log("#######################"+e.which)

            }
          } else {
            contador += 1
            if (inputTipe == "text") {
              if (contador >= tipoDatoRotulo.getTamanioMinimo()) {
                $("#" + id).removeClass("is-invalid");
                $("#" + id).addClass("is-valid");
                if (tipoDatoRotulo.getTipoDeDato() == 'text') {
                  $("#" + id + "21").css('display', 'none');
                  $("#" + id + "22").css('display', 'none');
                  $("#" + id + "23").css('display', 'none');
                }
              }
            }
            else {
              if (inputTipe == "number") {
                if (($("#" + id).val().length + 1) >= tipoDatoRotulo.getTamanioMinimo()) {
                  $("#" + id).removeClass("is-invalid");
                  $("#" + id).addClass("is-valid");
                  if (tipoDatoRotulo.getTipoDeDato() == 'number') {
                    $("#" + id + "11").css('display', 'none');
                    $("#" + id + "12").css('display', 'none');
                    $("#" + id + "13").css('display', 'none');
                  }
                }
              }
              else {
                if (inputTipe == "email") {
                  if (($("#" + id).val().length + 1) >= tipoDatoRotulo.getTamanioMinimo()) {
                    $("#" + id).removeClass("is-invalid");
                    $("#" + id).addClass("is-valid");
                    if (tipoDatoRotulo.getTipoDeDato() == 'email') {
                      $("#" + id + "31").css('display', 'none');
                      $("#" + id + "32").css('display', 'none');
                      $("#" + id + "33").css('display', 'none');
                    }
                  }
                }
              }
            }
          }
        })
      }
      this.bandera = false
    }
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
    if (banderaItems == false) {
      this.mensajeToastError();//para que seleccione almenos un item
    }

    let banderaDatosRotulo = true;
    //recorremos la lista de los datos rotulo para ver si sus campos son validos
    for (let index = 0; index < this.listaDatosRotulo.length; index++) {
      let id = this.listaDatosRotulo[index].getTipoDato().getNombre();
      if ($("#" + id).hasClass("is-invalid") || $("#" + id).val().length == 0) {
        console.log(this.listaDatosRotulo[index].getTipoDato().getNombre())
        banderaDatosRotulo = false;
      }
    }
    if (banderaDatosRotulo == false) {
      this.remarcarInputsInvalidos();
    }
     console.log(banderaItems+"items")
     console.log(banderaDatosRotulo+"datosR")

    return banderaItems && banderaDatosRotulo;
  }

  //marcar los datos que estan  vacios
  remarcarInputsInvalidos() {
    console.log("ingreso!!!!!!!!!!!!!!!!");
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

  guardarDatos() {
    if (this.datosValidos()) {
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
          datosPostulante.push(new DatosPostulante(1, id, valor));
        }
      }
      let listItems: Item[] = [];
      for (let index = 0; index < this.listaItems.length; index++) {
        if (this.listaItems[index].getSeleccionado()) {
          listItems.push(this.listaItems[index]);
        }

      }
      this.postulante = new Postulante(codigoSis, listItems, datosPostulante);
      console.log(this.postulante);
    }

  }


  mensajeToastError() {
    tata.error("Error", "Debe De Seleccionar Almenos Un Item");

  }
  mensajeToastErrorBD(mensaje) {
    tata.error("Error", mensaje);

  }
  mensajeToastExito(mensaje) {
    tata.success("Registro Exitoso", mensaje);
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
  /*
  getDatosRotuloConvBD() {
     let idConv: number = parseInt(localStorage.getItem("idConv"));
     this.listaDatosPostulante.push(new DatosPostulante(1, "codigo_sis"))
     this.servicePostulante.getDatosPostulante(idConv).subscribe(
       resultado => {
         let datoP: DatosPostulante;
         for (let i in resultado) {
           datoP = new DatosPostulante(resultado[i].idTipo, resultado[i].nombre);
           this.listaDatosPostulante.push(datoP);
         }
       }
     )
 
     console.log("la lista de datos rotulo desde la base de datos");
     console.log(this.listaDatosPostulante);
 
   }
 
   registrarPostulanteBD() {
     this.servicePostulante.agregarPostulante(this.postulante).subscribe(
       resultado=>{
         if(resultado['resultado']=='correcto'){
           this.mensajeToastExito("datos registrados correctamente");
           console.log("el postulante se registro correctamente");
         }else{
           console.log("error al registrar el postulante");
           this.mensajeToastErrorBD("error al registrar el postulante");
         }
       }
     )
   }
 }*/

}

