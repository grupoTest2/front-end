import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


declare var tata: any;
declare var $: any;
@Component({
  selector: 'app-experiencia-universitaria',
  templateUrl: './experiencia-universitaria.component.html',
  styleUrls: ['./experiencia-universitaria.component.css']
})
export class ExperienciaUniversitariaComponent implements OnInit {

  form: NgForm = new NgForm([], []);

  constructor() { }

  ngOnInit(): void {
  }

  guardar(form: NgForm) {
    this.form = form;
    console.log("metodoooooooooooooooo")
    if (form.invalid) {
      Object.values(form.controls).forEach(
        control => {
          control.markAllAsTouched();
        }
      );
      tata.error('Error', 'Llene todos los campos por favor');
    } else {

      $('#modalExperienciaUniversitaria').modal('hide');
      tata.success('Exitoso', 'Se guardaron sus datos');
      // this.enlistarDatosFormacion(form);
    }
  }
}
