import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Convocatoria } from '../../../models/clases/convocatoria/convocatoria';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { HabilitacionService } from 'src/app/servicios/habilitacionPostulantes/habilitacion.service';
import { PostulanteServicePhp } from 'src/app/servicios/form-postulante/postulante.service';
import { Item } from 'src/app/models/clases/convocatoria/item';

declare var $: any;

@Component({
  selector: 'app-convocatorias-asignadas',
  templateUrl: './convocatorias-asignadas.component.html',
  styleUrls: ['./convocatorias-asignadas.component.css']
})
export class ConvocatoriasAsignadasComponent implements OnInit {

  listaConv: Convocatoria[] = [];
  @Output() listarPos = new EventEmitter();

  usuario: Usuario;
  convocatoria: Convocatoria;
  listaItems:Item[]=[];
  constructor(private habilitacion: HabilitacionService,private items:PostulanteServicePhp) {
    let datos = JSON.parse(localStorage.getItem("usuario"));
    this.usuario = new Usuario(datos.idUsuario, datos.nombres, datos.apellidoPaterno, datos.apellidoMaterno, datos.correo);

    this.cargarConvocatoriasUsuarioBD();
  }

  ngOnInit(): void {
  }

  recuperarPostulantes() {
    $("#seleccionItem").modal("hide");
    this.listarPostulantes();
  }

  setConvocatoria(conv: Convocatoria) {
    this.convocatoria = conv;
    this.getItemsBD();
  }

  listarPostulantes(): void {
    this.listarPos.emit(this.convocatoria);
  }

  setUsuario(usuario: Usuario): void {
    console.log("convocatorias")
    this.usuario = usuario;
  }

  getItemsBD(){
    this.listaItems=[];
    let idConv=this.convocatoria.getIdConv();
    this.items.getItems(idConv).subscribe(
      (resultado: Item) => {
        let item: Item;
        for (let i in resultado) {
          item = new Item(resultado[i].idItem, resultado[i].codigoItem, resultado[i].nombreItem);
          this.listaItems.push(item);
        }
        console.log("mis items");
        console.log(this.listaItems);
      }
      

    )
    
  }

  cargarConvocatoriasUsuarioBD(): void {
    this.listaConv = [];
    this.habilitacion.getConvocatoriasDisponibles(this.usuario.getIdUsuario()).subscribe(
      resp => {
        for (let i in resp) {
          let convocatoria = new Convocatoria(0, resp[i].titulo, resp[i].gestion);
          convocatoria.setIdConv(resp[i].idConv);
          this.listaConv.push(convocatoria);
        }
      }
    )
  }
}
