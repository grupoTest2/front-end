import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostulanteEvaluado } from 'src/app/models/clases/postulante/postulante-evaluado';
import { Usuario } from '../../../models/clases/comision/usuario';
import { Convocatoria } from '../../../models/clases/convocatoria/convocatoria';
import { HabilitacionService } from 'src/app/servicios/habilitacionPostulantes/habilitacion.service';
import { Requisito } from 'src/app/models/clases/convocatoria/requisito';

@Component({
  selector: 'app-postulantes-asignadas',
  templateUrl: './postulantes-asignadas.component.html',
  styleUrls: ['./postulantes-asignadas.component.css']
})
export class PostulantesAsignadasComponent implements OnInit {

  listaPostulantes: PostulanteEvaluado[] = [];
  @Output() datosPostulante = new EventEmitter();
  @Output() requisitosEvaluadosPost = new EventEmitter();
  filtroCodigo = '';
  titulo = "";
  gestion = "";
  usuario: Usuario;
  constructor(private habilitacion:HabilitacionService) {

  }
  ngOnInit(): void {
  }

  listarTodo():void {
    this.filtroCodigo = '';
  }

  evaluador(postulante:PostulanteEvaluado):boolean{
    let res=false;
    if(postulante.getEstado()=="habilitado"||postulante.getEstado()=="inhabilitado"){
       res=true;
    }
    return res;
  }

  listarPostulantes(conv: Convocatoria):void {
    this.titulo = conv.getTitulo();
    this.gestion = conv.getGestion();
    this.listaPostulantes=[];
    this.getPostulantesConvBD(conv.getIdConv());
  }

  registrarRequisitos(postulante: PostulanteEvaluado):void {
    this.datosPostulante.emit(postulante);
  }

  revisarRequisitos(postulante: PostulanteEvaluado):void {
    this.requisitosEvaluadosPost.emit(postulante);
  }

  setUsuario(usuario: Usuario):void {
    this.usuario = usuario;
  }

  getPostulantesConvBD(idConv:number):void{
    this.habilitacion.getPostulantesConv(idConv).subscribe(
      resp=>{
        for(let i in resp){
          let estado=resp[i].estado;
          let nombreUsuario=resp[i].nombreUsuario;
          if(nombreUsuario==null){
            nombreUsuario="-----------";
          }
          if(estado==null){
            estado="sin evaluar";
          }
          let postulante=new PostulanteEvaluado(resp[i].idPos,
            resp[i].idConv,
            resp[i].codigoSis,
            resp[i].nombreCompleto,
            estado,
            nombreUsuario);
          let reqs=resp[i].listaRequisitos;
          let listaReqs: Requisito[]=[];
          for(let j in reqs){
            listaReqs.push(new Requisito(reqs[j].descripcion,reqs[j].idRequisito,reqs[j].seleccionado));
          }
          postulante.setListaRequisitos(listaReqs);
          this.listaPostulantes.push(postulante);
          
        }
      }
    );
  }
}
