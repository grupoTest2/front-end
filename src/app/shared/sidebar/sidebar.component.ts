import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    estado:boolean=true;
    menu="Ocultar Menu";
    banderaMenu=true;
  ngOnInit(): void {
  }
  setEstado(){
    if(this.estado)
      this.estado=false;
    else
      this.estado=true;
  }
   //metodo para deslisar el menu despeglabe de la izquierda
   toggleSideVar() {
    $('#sidebar').toggleClass('active');
    if(this.banderaMenu){
       this.menu="Mostrar Menu"
       this.banderaMenu=false;
     }
     else{
      this.menu="Ocultar Menu"
      this.banderaMenu=true;
     }
  }


}
