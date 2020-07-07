import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm } from '@angular/forms';
import { PaisService } from 'src/app/servicios/Paises/pais.service';
declare var tata: any;
declare var $: any;



@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.css']
})
export class CurriculumVitaeComponent implements OnInit {
  
  name=""
  formCurriculum: FormGroup
  form: FormGroup
  formBuilder: any;
  data: any = {};

  paises: any[] = [];
  constructor(private paisService: PaisService) {
  }
  ngOnInit( ): void {
    this.paisService.getPaises()
      .subscribe( paises => {
        this.paises = paises;

        this.paises.unshift({
          nombre: 'Seleccione un País',
          codigo: ''
        })

        console.log( this.paises );
      });
  }

  

  guardar( form: NgForm ){
    if(form.invalid){
      Object.values(form.controls).forEach(
        control =>{
          control.markAllAsTouched();
        }
      );
    }
    // console.log()
    console.log(form.value);
    console.log(form.controls['apellidoM'].value);

  }

  resetForm(): void {
    
  }

}
