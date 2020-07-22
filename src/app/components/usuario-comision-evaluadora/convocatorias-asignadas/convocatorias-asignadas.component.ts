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
    //this.cargarDatosP();
  }

  cargarDatosP() {
    let convocatoria = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");
    let convocatoria1 = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");
    let convocatoria2 = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");
    let convocatoria3 = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");
    let convocatoria4 = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");
    let convocatoria5 = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");
    this.listaConv.push(convocatoria);
    this.listaConv.push(convocatoria1);
    this.listaConv.push(convocatoria2);
    this.listaConv.push(convocatoria3);
    this.listaConv.push(convocatoria4);
    this.listaConv.push(convocatoria5);
  }

  listarPostulantes(conv: Convocatoria) {
    this.listarPos.emit(conv);
  }

  setUsuario(usuario: Usuario) {
    console.log("convocatorias")
    this.usuario = usuario;
  }
  //interaccion con la base de datos

  cargarConvocatoriasUsuarioBD(){
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
