import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HabilitacionService } from 'src/app/servicios/habilitacionPostulantes/habilitacion.service';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/clases/comision/usuario';

declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    estado:boolean=true;
    menu="Ocultar Menu";
    banderaMenu=true;
    form=new NgForm([],[]);
    constructor(private router: Router,private habilitacion:HabilitacionService){
      
    }

  ngOnInit(): void {
  }

  setEstado():void{
    if(this.estado)
      this.estado=false;
    else
      this.estado=true;
  }

  toggleSideVar():void {
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

  guardar(form: NgForm):void {
    this.form = form;
    if (form.invalid) {
      Object.values(form.controls).forEach(
        control => {
          control.markAllAsTouched();
        }
      );
      tata.error('Error', 'Ingrese su id de usuario correcto por favor');
    } else {
      this.getUsuarioBD(parseInt(form.controls['codigo'].value));
     this.form.resetForm();
    }
  }

  getUsuarioBD(idUsuario:number):void{
    this.habilitacion.getUsuario(idUsuario).subscribe(
      (resp:any)=>{
        let usuario:Usuario=new Usuario(resp.idUsuario,
                                        resp.nombre,
                                        resp.apellidoP,
                                        resp.apellidoM,
                                        resp.correo);
        localStorage.setItem("usuario",JSON.stringify(usuario));
        this.router.navigate(['/evaluacion__requisitos_postulante']);
        $('#modalEvaluador').modal('hide');
      })
    
  }

}
