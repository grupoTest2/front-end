import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { TipoDatoRotulo } from 'src/app/models/clases/convocatoria/tipo-dato-rotulo';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

declare var $: any;

@Component({
  selector: 'app-form-postulante',
  templateUrl: './form-postulante.component.html',
  styleUrls: ['./form-postulante.component.css']
})
export class FormPostulanteComponent implements OnInit {

  listaDatosRotulo: TipoDatoRotulo[] = [];
  bandera = true;

  msjErrorNumericoVacio = "campo numerico vacio"
  msjTextoVacio = "campo de texto vacio"
  msjTextocorto = "texto demasiado corto"
  msjErrorNumericoCorto = "campo numerico corto"
  msjErrorEmailVacio = "campo de correo vacio"
  msjErrorEmailCorto = "campo de correo muy corto"
  msjErrorEmailIncorrecto = "correo incorrecto";
  constructor() {
    this.cargarDatos();
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

        //inputs tipo text
        if (inputTipe == "number") {
          if (value.length == 0) {
            $("#" + id).addClass("is-invalid");
            $("#" + id + "11").css('display', 'block');
          }
          if (value.length < 1 && value.length > 0) {
            $("#" + id).addClass("is-invalid");
            $("#" + id + "11").css('display', 'none');
            $("#" + id + "12").css('display', 'block');
          }
          if (value.length >= 1) {
            $("#" + id).removeClass("is-invalid");
            $("#" + id).addClass("is-valid");
            $("#" + id + "11").css('display', 'none');
            $("#" + id + "12").css('display', 'none');
          }
        }
        //input tipo texto
        if (inputTipe == "text") {
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
        }

        //input tipo gmail
        if (inputTipe == "email") {
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
        }
        if (inputTipe == "number") {
          if (value.length >= 1) {
            $("#" + id).removeClass("is-invalid");
            $("#" + id).addClass("is-valid");
            $("#" + id + "11").css('display', 'none');
            $("#" + id + "12").css('display', 'none');
          }
        }
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
      console.log("No puede guardar sus datos");
    }
  }
}
