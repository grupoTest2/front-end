import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { Comision } from 'src/app/models/clases/comision/comision';
import { TipoComision } from 'src/app/models/clases/comision/tipo-comision';
import { ComisionesServicePhp } from 'src/app/servicios/comisiones/comisiones.service';
import { UsuarioComision } from 'src/app/models/clases/comision/usuario-comision';

import {FormControl} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent implements OnInit {

  comision1:Comision;
  comision2:Comision;
  listaTipoComision: TipoComision[]=[];
  listaUsuarios:Usuario[]=[];
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);
  listaComision: Comision[] = [];
  constructor(private comisionServ:ComisionesServicePhp) { 
    //this.comision1=new Comision("revisora");
    //this.comision2=new Comision("revisora");
    this.getTipoComisionesBD();
    this.getUsuariosBD();

  }

  ngOnInit(): void {
  }


  /*aniadirUsuario(tipoComision:string,usuario:Usuario){
    if(tipoComision===this.comision1.getTipoComision()){
      this.comision1.getListaUsuarios().push(usuario);
    }
    else{
      this.comision2.getListaUsuarios().push(usuario);
    }
  }*/
  agregarUsuarioComison(idUsuario, idTipoComision) {
    for (let i in this.listaComision) {
      let objCom: Comision = this.listaComision[i];
      if (objCom.getIdTipoComision() === idTipoComision) {
        let usuarioCom = new UsuarioComision(idUsuario, "insertar", objCom.getIdConv());
        objCom.agregarUsuarioComision(usuarioCom);
      }
    }
  }

  getComision(idTipoComision) {
    let objCom: Comision;
    for (let i in this.listaComision) {
      objCom = this.listaComision[i];
      if (objCom.getIdTipoComision() === idTipoComision) {
        break;
      }
    }
    return objCom;
  }
  crearComisiones() {
    let com: Comision;
    for (let i in this.listaTipoComision) {
      let objAux = this.listaTipoComision[i];
      com = new Comision(objAux.getIdTipoComision());
      this.listaComision.push(com);
    }
    console.log("las comisiones");
    console.log(this.listaComision);
  }

  lista(){
    //this.agregarUsuarioComisionBD();
    console.log(JSON.stringify(this.listaComision));
  }

  marcar(idTipo: number, idUsuario: number){
    //  pintar fila y cambiar iconos
    $('#id' + idTipo + idUsuario).toggleClass('text-primary').toggleClass("text-muted");
    $('#id' + idTipo + idUsuario).toggleClass('shadow-sm');
    $('#check' + idTipo + idUsuario).toggleClass('fa-user-times').toggleClass('fa-user-check');
    $('#boton' + idTipo + idUsuario).toggleClass('btn-outline-secondary').toggleClass('btn-outline-success');

    console.log(idUsuario, '-idUsuario', idTipo, '-idTipo');
    this.agregarUsuarioComison(idUsuario, idTipo);
   }

  /**
   * metodos que interactuan con la base de datos
   */

  getTipoComisionesBD() {
    this.comisionServ.getTiposComision().subscribe(
      resultado => {
        let tipoCom: TipoComision;
        for (let i in resultado) {
          tipoCom = new TipoComision(resultado[i].idTipoComision, resultado[i].nombre);
          this.listaTipoComision.push(tipoCom);
        }
        this.crearComisiones();
      }
    )
    console.log("los tipos de comisionessss");
    console.log(this.listaTipoComision);

  }

  getUsuariosBD() {
    this.comisionServ.getUsuarios().subscribe(
      resultado => {
        let usuario: Usuario;
        for (let i in resultado) {
          let objAux = resultado[i];
          usuario = new Usuario(objAux.idUsuario, objAux.nombre, objAux.apellidoP, objAux.apellidoM, objAux.correo);
          this.listaUsuarios.push(usuario);
        }
      }
    )
    console.log("los usuariossss");
    console.log(this.listaUsuarios);
   }

   agregarUsuarioComisionBD(){
    this.comisionServ.agregarUsuariosComision(this.listaComision).subscribe(
      resultado=>{
        if(resultado['resultado']=='correcto'){
          console.log("miembros agregados correctamente");
        }else{
          console.log("error al agregar miembros");
        }
      }
    )
   }
  

   
}
