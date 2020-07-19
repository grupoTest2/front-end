import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {
  URL = "http://localhost/back-end/apiPHP/convocatoria/recepcionDocumentos/";
  constructor(private http: HttpClient) { }

   //recuperan informacion de la base de datos
   public getInformacionPostulante(codigoRotulo: string) {
    return this.http.get(`${this.URL}obtenerInfPos.php?codigo=${codigoRotulo}`);
  }

  //envian informacion al servidor phpç

  public registrarRecepcion(datos: any){
    return this.http.post(`${this.URL}recepcionDocumentos.php`, JSON.stringify(datos));
  }
}
