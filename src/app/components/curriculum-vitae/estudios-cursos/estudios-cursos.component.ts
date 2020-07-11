import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

declare var tata: any;
declare var $: any;
@Component({
  selector: 'app-estudios-cursos',
  templateUrl: './estudios-cursos.component.html',
  styleUrls: ['./estudios-cursos.component.css']
})
export class EstudiosCursosComponent implements OnInit {

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

      $('#modalEstudiosCursosTomados').modal('hide');
      tata.success('Exitoso','Se guardaron sus datos');
    console.log(form.value)
    
    }
  }

}
