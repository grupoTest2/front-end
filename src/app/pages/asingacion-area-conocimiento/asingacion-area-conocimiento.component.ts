import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { UsuarioComision } from 'src/app/models/clases/comision/usuario-comision';
import { TipoUsuario } from 'src/app/models/clases/comision/tipo-usuario';
import { Comision } from 'src/app/models/clases/comision/comision';
declare var $: any;

@Component({
  selector: 'app-asingacion-area-conocimiento',
  templateUrl: './asingacion-area-conocimiento.component.html',
  styleUrls: ['./asingacion-area-conocimiento.component.css']
})


export class AsingacionAreaConocimientoComponent implements OnInit {


  comision:Comision=new Comision(0,[]);  //	constructor(idTipoComision: number,listaUsuarios:UsuarioComision[]=[]) {
  listaUsuarios:Usuario[]=[];
  listaUsuariosComision:UsuarioComision[]=[];
  listaTiposUsuario:TipoUsuario[]=[];  
  constructor() { 
    this.agragarUsuariosPrueba();
  }

  ngOnInit(): void {
  }
  agragarUsuariosPrueba(){
    this.listaUsuarios.push(new Usuario(1, "pepe","gomes","lopez","pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(2, "jose","gomes","lopez","pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(3, "kewin","gomes","lopez","pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(4, "josue","gomes","lopez","pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(5, "cunao","gomes","lopez","pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(6, "mongolo","gomes","lopez","pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(7, "pepa","gomes","lopez","pepe@gmail.com"));
    this.listaUsuarios.push(new Usuario(8, "felipa","gomes","lopez","pepe@gmail.com"));
    this.listaTiposUsuario.push(new TipoUsuario(1,"evaluador"));
    this.listaTiposUsuario.push(new TipoUsuario(2,"veedor"));
    this.listaUsuariosComision.push(new UsuarioComision(1, "insertar",2));
    this.listaUsuariosComision.push(new UsuarioComision(2, "insertar",2));
    this.listaUsuariosComision.push(new UsuarioComision(3, "insertar",1));
    this.listaUsuariosComision.push(new UsuarioComision(4, "insertar",1));
    this.listaUsuariosComision.push(new UsuarioComision(5, "insertar",2));
    this.listaUsuariosComision.push(new UsuarioComision(6, "insertar",2));
    this.listaUsuariosComision.push(new UsuarioComision(7, "insertar",1));
    this.listaUsuariosComision.push(new UsuarioComision(8, "insertar",2));
    this.comision=new Comision(1,this.listaUsuariosComision);
  }

  getTipoUsuario(id:number){
    let res="";
    for (let index = 0; index <this.comision.getListaUsuarios().length; index++) {
      if(this.comision.getListaUsuarios()[index].getIdUsuario()==this.listaUsuarios[id].getIdUsuario()){
              for(let i=0; i< this.listaTiposUsuario.length;i++){
                    if(this.comision.getListaUsuarios()[index].getIdTipoUsuario() ==this.listaTiposUsuario[i].getIdTipoUsuario()){
                        res=this.listaTiposUsuario[i].getNombre();
                    }
              }
      }
      
    }

    return res;

  }

  mostrarMensaje(){
    $("#tablaDatosSeleccionables").modal("show");
    console.log("hizo click!!!!!!!!!!")
  }
}
