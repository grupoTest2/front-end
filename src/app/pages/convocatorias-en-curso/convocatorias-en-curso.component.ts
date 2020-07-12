import { Component, OnInit } from '@angular/core';
import {Convocatoria} from '../../models/clases/convocatoria/convocatoria'
import {TipoConvocatoria} from '../../models/clases/convocatoria/tipo-convocatoria'
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var tata: any;
declare var $: any;
@Component({
  selector: 'app-convocatorias-en-curso',
  templateUrl: './convocatorias-en-curso.component.html',
  styleUrls: ['./convocatorias-en-curso.component.css']
})
export class ConvocatoriasEnCursoComponent implements OnInit {

  form: NgForm = new NgForm([], []);
  listaConvocatorias: Convocatoria[]=[]
  constructor(private convService: EditarConvocatoriaServicePhp, private router: Router) { 
    this.recuperarDatos();
  }

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
      tata.error('Error', 'Ingrese su código de rótulo por favor');
    } else {
      if (form.controls['codigo'].value === '123456'){
        tata.success('Exitoso', 'Cogigo correcto');
        $('#modalCodigo').modal('hide');
        this.router.navigate(['/curriculumVitae']);
      }else{
      tata.error('Error', 'Codigo incorrecto');
      }
    }
  }

  recuperarDatos(){
    this.convService.getConvocatoriasEncurso(1).subscribe(
      resultado=>{
        let conv: Convocatoria;
        let tipoCon:TipoConvocatoria;
        for(let i in resultado){
          let objAux=resultado[i];
          tipoCon=new TipoConvocatoria(objAux.idTipoConv,objAux.tipoConv);
          conv=new Convocatoria(
            objAux.idTipoConv,
            objAux.titulo,
            objAux.gestion,
            objAux.estado,
            tipoCon);
          conv.setIdConv(objAux.idConv);
            this.listaConvocatorias.push(conv);
        }
      }
    )
    console.log("las convocatorias");
    console.log(this.listaConvocatorias);
    
  }

  setearLocalStore(id:number,titulo:string, gestion:number){
    localStorage.setItem("idConv",id.toString());
    localStorage.setItem('tituloConvocatoria', titulo);
    localStorage.setItem('gestionConvocatoria', gestion.toString());
  }

}
