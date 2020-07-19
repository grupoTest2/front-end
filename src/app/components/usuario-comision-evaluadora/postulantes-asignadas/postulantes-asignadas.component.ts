import { Component, OnInit } from '@angular/core';
import { Postulante } from 'src/app/models/clases/postulante/postulante';

@Component({
  selector: 'app-postulantes-asignadas',
  templateUrl: './postulantes-asignadas.component.html',
  styleUrls: ['./postulantes-asignadas.component.css']
})
export class PostulantesAsignadasComponent implements OnInit {


  listaPostulantes: Postulante[] = [];
  constructor() {

  }

  ngOnInit(): void {
  }
  cargarDatosPrueba() {
   let postlulante1=new Postulante(20,[]);
   postlulante1.setNombre("pepe");
   postlulante1.setApellidoP("Gomes");
   postlulante1.setApellidoM("Lopez");

   
   let postlulante2=new Postulante(20,[]);
   postlulante2.setNombre("pepe");
   postlulante2.setApellidoP("Gomes");
   postlulante2.setApellidoM("Lopez");

   let postlulante3=new Postulante(20,[]);
   postlulante3.setNombre("pepe");
   postlulante3.setApellidoP("Gomes");
   postlulante3.setApellidoM("Lopez");

   let postlulante4=new Postulante(20,[]);
   postlulante4.setNombre("pepe");
   postlulante4.setApellidoP("Gomes");
   postlulante4.setApellidoM("Lopez");

   let postlulante5=new Postulante(20,[]);
   postlulante5.setNombre("pepe");
   postlulante5.setApellidoP("Gomes");
   postlulante5.setApellidoM("Lopez");

   let postlulante6=new Postulante(20,[]);
   postlulante6.setNombre("pepe");
   postlulante6.setApellidoP("Gomes");
   postlulante6.setApellidoM("Lopez");

   let postlulante7=new Postulante(20,[]);
   postlulante7.setNombre("pepe");
   postlulante7.setApellidoP("Gomes");
   postlulante7.setApellidoM("Lopez");

   let postlulante8=new Postulante(20,[]);
   postlulante8.setNombre("pepe");
   postlulante8.setApellidoP("Gomes");
   postlulante8.setApellidoM("Lopez");

   let postlulante9=new Postulante(20,[]);
   postlulante9.setNombre("lola");
   postlulante9.setApellidoP("Gomes");
   postlulante9.setApellidoM("Lopez");

   this.listaPostulantes.push(postlulante1);
   this.listaPostulantes.push(postlulante2);
   this.listaPostulantes.push(postlulante3);
   this.listaPostulantes.push(postlulante4);
   this.listaPostulantes.push(postlulante5);
   this.listaPostulantes.push(postlulante6);
   this.listaPostulantes.push(postlulante7);
   this.listaPostulantes.push(postlulante8);
   this.listaPostulantes.push(postlulante9);
   
  }

  listarPostulantes(idConv){
   console.log("estamos en postulantes");
   this.cargarDatosPrueba();
  }

}
