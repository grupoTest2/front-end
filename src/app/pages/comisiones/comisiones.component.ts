import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { Comision} from 'src/app/models/clases/comision/comision';
import { TipoComision } from 'src/app/models/clases/comision/tipo-comision';
import { ComisionesServicePhp } from 'src/app/servicios/comisiones/comisiones.service';

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
  constructor(private comisionServ:ComisionesServicePhp) { 
    //this.comision1=new Comision("revisora");
    //this.comision2=new Comision("revisora");
    this.getTipoComisiones();
    this.getUsuarios();
  }

  ngOnInit(): void {
  }

  anadirUsuarios(){/*
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'lucia','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'lucia','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'josue','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'janne','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'kewin','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'chiquiotin','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'elena','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'maria','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'erick','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'bety','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'caro','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));*/
  }

  /*aniadirUsuario(tipoComision:string,usuario:Usuario){
    if(tipoComision===this.comision1.getTipoComision()){
      this.comision1.getListaUsuarios().push(usuario);
    }
    else{
      this.comision2.getListaUsuarios().push(usuario);
    }
  }*/

  /**
   * metodos que interactuan con la base de datos
   */

   getTipoComisiones(){
    this.comisionServ.getTiposComision().subscribe(
      resultado=>{
        let tipoCom:TipoComision;
        for(let i in resultado){
          tipoCom=new TipoComision(resultado[i].idTipoComision,resultado[i].nombre);
          this.listaTipoComision.push(tipoCom);
        }
      }
    )
    console.log("los tipos de comisionessss");
    console.log(this.listaTipoComision);
   }

   getUsuarios(){
    this.comisionServ.getUsuarios().subscribe(
      resultado=>{
        let usuario:Usuario;
        for(let i in resultado){
          let objAux=resultado[i];
          usuario=new Usuario(objAux.idUsuario,objAux.nombre,objAux.apellidoP,objAux.apellidoM,objAux.correo);
          this.listaUsuarios.push(usuario);
        }
      }
    )
    console.log("los usuariossss");
    console.log(this.listaUsuarios);
   }

   marcar(idTipo: number, idUsuario: number){
    //  pintar fila y cambiar iconos
    $('#id' + idTipo + idUsuario).toggleClass('text-primary');
    $('#id' + idTipo + idUsuario).toggleClass('shadow-sm');
    $('#check' + idTipo + idUsuario).toggleClass('fa-user-times').toggleClass('fa-user-check');
    $('#boton' + idTipo + idUsuario).toggleClass('btn-outline-secondary').toggleClass('btn-outline-success');

    console.log(idUsuario, '-idUsuario', idTipo, '-idTipo');
    
   }
}
