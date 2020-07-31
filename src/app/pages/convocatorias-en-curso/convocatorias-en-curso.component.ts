import { Component, OnInit } from '@angular/core';
import {Convocatoria} from '../../models/clases/convocatoria/convocatoria'
import {TipoConvocatoria} from '../../models/clases/convocatoria/tipo-convocatoria'
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CurriculumService } from 'src/app/servicios/curriculum-vitae/curriculum.service';

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
  constructor(private convService: EditarConvocatoriaServicePhp, private seviceCV: CurriculumService, private router: Router) { 
    this.recuperarDatos();
  }

  ngOnInit(): void {
  }

  guardar(form: NgForm):void {
    this.form = form;
    if (form.invalid) {
      Object.values(form.controls).forEach(
        control => {
          control.markAllAsTouched();
        }
      );
      tata.error('Error', 'Ingrese su código de rótulo por favor');
    } else {
      this.verificarCodigo(form.controls['codigo'].value);
    }
  }

  recuperarDatos(): void{
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
  }

  verificarCodigo(codigo:string):void{
    let dato={
      idConv: parseInt(localStorage.getItem("idConv")),
      codigo: codigo
    }
    this.seviceCV.getPostulante(dato).subscribe(
      (resp:any)=>{
        if(resp.idPostulante==0){
          tata.error('Error', 'Codigo incorrecto');
        }else{
          tata.success('Exitoso', 'Cogigo correcto');
        $('#modalCodigo').modal('hide');
        localStorage.setItem("postulante",JSON.stringify(resp));
        this.router.navigate(['/curriculumVitae']);
        }
      }
    );
  }
  setearLocalStore(id:number,titulo:string, gestion:number):void{
    this.form.reset();
    localStorage.setItem("idConv",id.toString());
    localStorage.setItem('tituloConvocatoria', titulo);
    localStorage.setItem('gestionConvocatoria', gestion.toString());
  }
}
