import { Component, OnInit } from '@angular/core';
import {Convocatoria} from '../../models/clases/convocatoria/convocatoria'
import {TipoConvocatoria} from '../../models/clases/convocatoria/tipo-convocatoria'
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';

@Component({
  selector: 'app-convocatorias-en-curso',
  templateUrl: './convocatorias-en-curso.component.html',
  styleUrls: ['./convocatorias-en-curso.component.css']
})
export class ConvocatoriasEnCursoComponent implements OnInit {


  listaConvocatorias: Convocatoria[]=[]
  constructor(private convService: EditarConvocatoriaServicePhp) { 
    this.recuperarDatos();
  }

  ngOnInit(): void {
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

  setearLocalStore(id:number,titulo:string){
    localStorage.setItem("idConv",id.toString());
    localStorage.setItem('tituloConvocatoria', titulo)
  }
}
