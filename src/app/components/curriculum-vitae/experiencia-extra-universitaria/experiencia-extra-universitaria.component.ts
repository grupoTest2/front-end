import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

declare var tata: any;
declare var $: any;
@Component({
  selector: 'app-experiencia-extra-universitaria',
  templateUrl: './experiencia-extra-universitaria.component.html',
  styleUrls: ['./experiencia-extra-universitaria.component.css']
})
export class ExperienciaExtraUniversitariaComponent implements OnInit {

  form: NgForm = new NgForm([], []);

  constructor() { }

  ngOnInit(): void {
  }

  guardar(form: NgForm) {
    this.form = form;
    if (form.invalid) {
      Object.values(form.controls).forEach(
        control => {
          control.markAllAsTouched();
        }
      );
      tata.error('Error', 'Llene todos los campos por favor');
    } else {

      $('#modalExperienciaExtraUniversitaria').modal('hide');
      tata.success('Exitoso', 'Se guardaron sus datos');
      // this.enlistarDatosFormacion(form);
    }
  }
}
