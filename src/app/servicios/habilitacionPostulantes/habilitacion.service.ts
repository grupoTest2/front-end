import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabilitacionService {
  URL = "http://localhost/back-end/apiPHP/convocatoria/habilitacionPostulante/";
  constructor(private http: HttpClient) { }

   //recuperan informacion de la base de datos
  public getConvocatoriasDisponibles(idUsuario: number) {
    return this.http.get(`${this.URL}obtenerConvocatoriasDisp.php?idUsuario=${idUsuario}`);
  }

  public getPostulantesConv(idConv: number) {
    return this.http.get(`${this.URL}obtenerPostulantesConv.php?idConv=${idConv}`);
  }

  public getRequisitosConv(idConv: number) {
    return this.http.get(`${this.URL}obtenerRequisitosConv.php?idConv=${idConv}`);
  }
  //envian informacion al servidor phpç

  public registrarCumplimientoRequisitos(datos: any){
    return this.http.post(`${this.URL}recepcionDocumentos.php`, JSON.stringify(datos));
  }
}
