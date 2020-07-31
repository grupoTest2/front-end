import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Convocatoria } from '../../../models/clases/convocatoria/convocatoria';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { HabilitacionService } from 'src/app/servicios/habilitacionPostulantes/habilitacion.service';

@Component({
  selector: 'app-convocatorias-asignadas',
  templateUrl: './convocatorias-asignadas.component.html',
  styleUrls: ['./convocatorias-asignadas.component.css']
})
export class ConvocatoriasAsignadasComponent implements OnInit {

  listaConv: Convocatoria[] = [];
  @Output() listarPos = new EventEmitter();

  usuario: Usuario;
  constructor(private habilitacion: HabilitacionService) {
    let datos=JSON.parse(localStorage.getItem("usuario"));
    this.usuario=new Usuario(datos.idUsuario,datos.nombres,datos.apellidoPaterno,datos.apellidoMaterno,datos.correo);
    
    this.cargarConvocatoriasUsuarioBD();
  }

  ngOnInit(): void {
  }

  listarPostulantes(conv: Convocatoria):void {
    this.listarPos.emit(conv);
  }

  setUsuario(usuario: Usuario):void {
    console.log("convocatorias")
    this.usuario = usuario;
  }

  cargarConvocatoriasUsuarioBD():void{
    this.listaConv = [];
    this.habilitacion.getConvocatoriasDisponibles(this.usuario.getIdUsuario()).subscribe(
      resp=>{
        for(let i in resp){
          let convocatoria=new Convocatoria(0,resp[i].titulo,resp[i].gestion);
          convocatoria.setIdConv(resp[i].idConv);
          this.listaConv.push(convocatoria);
        }
      }
    )
  }
}
