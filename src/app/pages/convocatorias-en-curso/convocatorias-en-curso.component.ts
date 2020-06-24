import { Component, OnInit } from '@angular/core';
import {Convocatoria} from '../../models/clases/convocatoria/convocatoria'
import {TipoConvocatoria} from '../../models/clases/convocatoria/tipo-convocatoria'

@Component({
  selector: 'app-convocatorias-en-curso',
  templateUrl: './convocatorias-en-curso.component.html',
  styleUrls: ['./convocatorias-en-curso.component.css']
})
export class ConvocatoriasEnCursoComponent implements OnInit {


  listaConvocatorias: Convocatoria[]=[]
  constructor() { 
    this.recuperarDatos();
  }

  ngOnInit(): void {
  }

  recuperarDatos(){
    this.listaConvocatorias.push(new Convocatoria(1,"convocatoria 1","2020","habiliado",new TipoConvocatoria(1,'Docencia')));
    this.listaConvocatorias.push(new Convocatoria(1,"convocatoria 2","2020","habiliado",new TipoConvocatoria(1,'Docencia')));
    this.listaConvocatorias.push(new Convocatoria(1,"convocatoria 3","2020","habiliado",new TipoConvocatoria(1,'Docencia')));
    this.listaConvocatorias.push(new Convocatoria(1,"convocatoria 4","2020","habiliado",new TipoConvocatoria(1,'Docencia')));
    this.listaConvocatorias.push(new Convocatoria(1,"convocatoria 5","2020","habiliado",new TipoConvocatoria(1,'Docencia')));
  }

  setearLocalStore(id:number){
    localStorage.setItem("idConv",id.toString());
  }
}
