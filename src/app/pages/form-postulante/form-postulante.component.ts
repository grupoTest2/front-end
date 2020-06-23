import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { TipoDatoRotulo } from 'src/app/models/clases/convocatoria/tipo-dato-rotulo';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { DatosPostulante } from 'src/app/models/clases/postulante/datos-postulante';
import { Item } from 'src/app/models/clases/postulante/item';
import { Postulante } from 'src/app/models/clases/postulante/postulante';
import { PostulanteServicePhp } from 'src/app/servicios/form-postulante/postulante.service';

declare var $: any;

@Component({
  selector: 'app-form-postulante',
  templateUrl: './form-postulante.component.html',
  styleUrls: ['./form-postulante.component.css']
})
export class FormPostulanteComponent implements OnInit {

  listaDatosPostulante: DatosPostulante[] = [];
  listaItems: Item[] = [];
  postulante:Postulante;

  listaDatosRotulo: TipoDatoRotulo[] = [];
  bandera = true;

  msjErrorNumericoVacio = "datos incorrectos"
  msjErrorNumericoIncorrecto = "campo numerico contiene caracteres incorrectos";
  msjErrorNumericoCorto = "campo numerico corto"
  msjTextoVacio = "campo de texto vacio"
  msjTextocorto = "texto demasiado corto"
  msjTextoIncorrecto = "texto incorrecto"
  msjErrorEmailVacio = "campo de correo vacio"
  msjErrorEmailCorto = "campo de correo muy corto"
  msjErrorEmailIncorrecto = "correo incorrecto";

  constructor(private servicePostulante: PostulanteServicePhp) {
    this.cargarDatos();
    this.getItemsBD();
    this.getDatosRotuloConvBD();
  }

  ngOnInit(): void {
  }
  cargarDatos() {
    this.listaDatosRotulo.push(new TipoDatoRotulo("nombre", true, true, "text"));
    this.listaDatosRotulo.push(new TipoDatoRotulo("correo", true, true, "email"));
    this.listaDatosRotulo.push(new TipoDatoRotulo("telefono", true, true, "number"));
    this.listaDatosRotulo.push(new TipoDatoRotulo("edad", true, true, "number"));
    this.listaDatosRotulo.push(new TipoDatoRotulo("correo2", true, true, "email"));
    this.listaDatosRotulo.push(new TipoDatoRotulo("codigosis", true, true, "number"));
    let segundo = 1;
    if (this.bandera) {
      setInterval(() => {
        if (segundo % 2 == 0 && this.bandera) {
          this.validarDato();
          this.bandera = false;
          console.log("rarp")

        }
        else {
          if (this.bandera) {
            segundo++;
            console.log("rarp")
          }
        }
      }, 1000);
    }
  }

  verifcarDatos() {
    for (let index = 0; index < this.listaDatosRotulo.length; index++) {
      let iden = "#" + this.listaDatosRotulo[index].getNombre();
      let res = $(iden).val();
    }
  }


  validarDato() {
    for (let index = 0; index < this.listaDatosRotulo.length; index++) {
      let id = this.listaDatosRotulo[index].getNombre();
      let aux = document.getElementById(id);
      let inputTipe = $("#" + id).attr('type');
      aux.addEventListener("blur", function (event) {
        let value = $("#" + id).val();
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

        //inputs tipo number
        if (inputTipe == "number") {
          value = $("#" + id).val();
          if (value.length == 0) {
            $("#" + id).addClass("is-invalid");
            $("#" + id + "11").css('display', 'block');
            $("#" + id + "12").css('display', 'none');
            $("#" + id + "13").css('display', 'none');
          }
          if (value.length < 1 && value.length > 0) {
            $("#" + id).addClass("is-invalid");
            $("#" + id + "11").css('display', 'none');
            $("#" + id + "12").css('display', 'block');
            $("#" + id + "13").css('display', 'none');
          }
          if (value.length >= 1) {
            $("#" + id).removeClass("is-invalid");
            $("#" + id).addClass("is-valid");
            $("#" + id + "11").css('display', 'none');
            $("#" + id + "12").css('display', 'none');
            $("#" + id + "13").css('display', 'none');
          }
          if (value.includes('.') || value.includes('e')) {
            $("#" + id).addClass("is-invalid");
            $("#" + id + "11").css('display', 'none');
            $("#" + id + "12").css('display', 'none');
            $("#" + id + "13").css('display', 'block');
          }
        }

        //input tipo texto
        if (inputTipe == "text") {
          value = $("#" + id).val();
          if (value.length == 0) {
            $("#" + id).addClass("is-invalid");
            $("#" + id + "21").css('display', 'block');
            $("#" + id + "22").css('display', 'none');
          }
          if (value.length < 2 && value.length > 0) {
            $("#" + id).addClass("is-invalid");
            $("#" + id + "21").css('display', 'none');
            $("#" + id + "22").css('display', 'block');
          }
          if (value.length >= 2) {
            $("#" + id).removeClass("is-invalid");
            $("#" + id).addClass("is-valid");
            $("#" + id + "21").css('display', 'none');
            $("#" + id + "22").css('display', 'none');
          }
          if (value.includes('.')) {
            $("#" + id).addClass("is-invalid");
            $("#" + id + "21").css('display', 'none');
            $("#" + id + "22").css('display', 'none');
            $("#" + id + "23").css('display', 'block');
          }
        }

        //input tipo gmail
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

      }, true);

      $("#" + id).keydown(function () {
        let value = $("#" + id).val();
        if (inputTipe == "text") {
          if (value.length >= 2) {
            $("#" + id).removeClass("is-invalid");
            $("#" + id).addClass("is-valid");
            $("#" + id + "21").css('display', 'none');
            $("#" + id + "22").css('display', 'none');
          }
        } else {
          let value = $("#" + id).val();
          if (inputTipe == "number") {
            if (value.length >= 1) {
              $("#" + id).removeClass("is-invalid");
              $("#" + id).addClass("is-valid");
              $("#" + id + "11").css('display', 'none');
              $("#" + id + "12").css('display', 'none');
              $("#" + id + "13").css('display', 'none');
            }
          } else {
            let value = $("#" + id).val();
            if (inputTipe == "email") {
              var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
              if (value.length >= 4) {
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
      })
    }
  }

  guardarDatos() {
    let contador = 0;
    for (let index = 0; index < this.listaDatosRotulo.length; index++) {
      let id = this.listaDatosRotulo[index].getNombre();
      if ($("#" + id).hasClass("is-valid")) {
        console.log("si tien la clase:->" + id)
        contador += 1
      }
    }
    if (contador == this.listaDatosRotulo.length) {
      console.log("puede guardar sus datos");
    }
    else {
      for (let index = 0; index < this.listaDatosRotulo.length; index++) {
        let id = this.listaDatosRotulo[index].getNombre();
        let inputTipe = $("#" + id).attr('type');
        let value = $("#" + id).val();
        if (inputTipe == "text" && value.length == 0) {
          $("#" + id).addClass("is-invalid");
          $("#" + id + "21").css('display', 'block');
        }
        if (inputTipe == "number" && value.length == 0) {
          $("#" + id).addClass("is-invalid");
          $("#" + id + "31").css('display', 'block');
        }
        if (inputTipe == "email" && value.length == 0) {
          $("#" + id).addClass("is-invalid");
          $("#" + id + "31").css('display', 'block');
        }
      }
    }
  }

  /**
   * metodos que interactuan con la base de datos
   */
  getItemsBD(){
    let idConv: number=3;
    this.servicePostulante.getItems(idConv).subscribe(
      (resultado:Item)=>{
        this.listaItems.push(resultado);
      }
    )
    console.log("la lista de items desde la base de datos");
    console.log(this.listaItems);
  }

  getDatosRotuloConvBD(){
    let idConv: number=3;
    this.servicePostulante.getDatosPostulante(idConv).subscribe(
      resultado=>{
        let datoP: DatosPostulante;
        for(let i in resultado){
          datoP= new DatosPostulante(resultado[i].idTipo,resultado[i].nombre);
          this.listaDatosPostulante.push(datoP);
        }
      }
    )
    
    console.log("la lista de datos rotulo desde la base de datos");
    console.log(this.listaDatosPostulante);

  }
  
}

