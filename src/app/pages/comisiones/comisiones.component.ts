import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { Comision} from 'src/app/models/clases/comision/comision';
import { TipoComision } from 'src/app/models/clases/comision/tipo-comision';
import { ComisionesServicePhp } from 'src/app/servicios/comisiones/comisiones.service';
import { UsuarioComision } from 'src/app/models/clases/comision/usuario-comision';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent implements OnInit {

  listaComision: Comision[]=[];
  listaTipoComision: TipoComision[]=[];
  listaUsuarios:Usuario[]=[];
  constructor(private comisionServ:ComisionesServicePhp) { 
    //this.comision1=new Comision("revisora");
    //this.comision2=new Comision("revisora");
    this.getTipoComisionesBD();
    this.getUsuariosBD();

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
  agregarUsuarioComison(idUsuario,idTipoComision){
    for(let i in this.listaComision){
      let objCom:Comision=this.listaComision[i];
      if(objCom.getIdTipoComision()===idTipoComision){
        let usuarioCom= new UsuarioComision(idUsuario,"insertar",objCom.getIdConv());
        objCom.agregarUsuarioComision(usuarioCom);
      }
    }
  }

  getComision(idTipoComision){
    let objCom:Comision;
    for(let i in this.listaComision){
      objCom=this.listaComision[i];
      if(objCom.getIdTipoComision()===idTipoComision){
        break;
      }
    }
    return objCom;
  }
  crearComisiones(){
    let com:Comision;
    for(let i in this.listaTipoComision){
      let objAux=this.listaTipoComision[i];
      com=new Comision(objAux.getIdTipoComision());
      this.listaComision.push(com);
    }
    console.log("las comisiones");
    console.log(this.listaComision);
  }

  /**
   * metodos que interactuan con la base de datos
   */

   getTipoComisionesBD(){
    this.comisionServ.getTiposComision().subscribe(
      resultado=>{
        let tipoCom:TipoComision;
        for(let i in resultado){
          tipoCom=new TipoComision(resultado[i].idTipoComision,resultado[i].nombre);
          this.listaTipoComision.push(tipoCom);
        }
        this.crearComisiones();
      }
    )
    console.log("los tipos de comisionessss");
    console.log(this.listaTipoComision);
    
   }

   getUsuariosBD(){
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

   
}
