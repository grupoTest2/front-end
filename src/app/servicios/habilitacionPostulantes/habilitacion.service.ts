import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostulanteEvaluado } from 'src/app/models/clases/postulante/postulante-evaluado';

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

  public getPostulantesConv(convAux: any) {
    return this.http.post(`${this.URL}obtenerPostulantesConv.php`, JSON.stringify(convAux));
  }

  public getUsuario(idUsuario:number){
    return this.http.get(`${this.URL}obtenerUsuario.php?idUsuario=${idUsuario}`);
  }
  public getRequisitosConv(idConv: number) {
    return this.http.get(`${this.URL}obtenerRequisitosConv.php?idConv=${idConv}`);
  }
  public getRequisitosPostulante(datos:any){
    return this.http.post(`${this.URL}obtenerRequisitosPostulante.php`, JSON.stringify(datos));
  }
  //envian informacion al servidor phpç

  public registrarCumplimientoRequisitos(datos:any){
    return this.http.post(`${this.URL}registrarCumplimientoRequisitos.php`, JSON.stringify(datos));
  }
}
