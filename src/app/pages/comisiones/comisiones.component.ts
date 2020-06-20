import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/clases/usuarios/usuario';
import { Comision} from 'src/app/models/clases/comision/comision';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent implements OnInit {

  comision1:Comision;
  comision2:Comision;
  listaUsuarios:Usuario[]=[];
  constructor() { 
    this.comision1=new Comision("revisora");
    this.comision2=new Comision("revisora");
  }

  ngOnInit(): void {
  }

  anadirUsuarios(){
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
    this.listaUsuarios.push(new Usuario(12,'pepe','lopes','gomez','pepeLopez@gmail.com',12,"12"));
  }

  aniadirUsuario(tipoComision:string,usuario:Usuario){
    if(tipoComision===this.comision1.getTipoComision()){
      this.comision1.getListaUsuarios().push(usuario);
    }
    else{
      this.comision2.getListaUsuarios().push(usuario);
    }
  }
}
