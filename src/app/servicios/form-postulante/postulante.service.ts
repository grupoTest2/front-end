import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Postulante } from 'src/app/models/clases/postulante/postulante';

@Injectable({
  providedIn: 'root'
})
export class PostulanteServicePhp {
  
  URL = "http://localhost/back-end/apiPHP/convocatoria/postulantes/";
  constructor(private http: HttpClient) { }

   //recuperan informacion de la base de datos
   public getItems(idConv: number) {
    return this.http.get(`${this.URL}obtenerItems.php?idConv=${idConv}`);
  }

  public getDatosPostulante(idConv:number){
    return this.http.get(`${this.URL}obtenerDatosRotuloConv.php?idConv=${idConv}`);
  }

  //envian informacion al servidor phpç

  public agregarPostulante(postulante: Postulante){
    return this.http.post(`${this.URL}establecerPrePostulante.php`, JSON.stringify(postulante));
  }
}
