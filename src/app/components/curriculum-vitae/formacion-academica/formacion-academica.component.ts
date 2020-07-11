import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-formacion-academica',
  templateUrl: './formacion-academica.component.html',
  styleUrls: ['./formacion-academica.component.css']
})
export class FormacionAcademicaComponent implements OnInit {

  form: NgForm = new NgForm([],[]);
  constructor() { }
  ngOnInit(): void {
  }

  reset(){
    this.form.resetForm();
  }
  guardar( form: NgForm){
    this.form = form;
    console.log("metodoooooooooooooooo")
    if(form.invalid){
      Object.values(form.controls).forEach(
        control =>{
          control.markAllAsTouched();
        }
      );
      tata.error('Error','Llene todos los campos por favor');
    }else{

      $('#modalFormacion').modal('hide');
      tata.success('Exitoso','Se guardaron sus datos');
    console.log(form.value)
    
    }
  }

}
