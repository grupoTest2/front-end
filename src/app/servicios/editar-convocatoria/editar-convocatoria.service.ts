import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditarConvocatoriaServicePhp {
  URL = "http://localhost/back-end/apiPHP/convocatoria/editarConvocatoria/";
  constructor(private http: HttpClient) { }

  //recuperan informacion de la base de datos
  public getRequerimientos(idConv: number) {
    return this.http.get(`${this.URL}obtenerRequerimientos.php?idConv=${idConv}`);
  }
  
  public getRequisitos(idConv: number) {
    return this.http.get(`${this.URL}obtenerRequisitos.php?idConv=${idConv}`);
  }

  public getDocumentos(idConv: number) {
    return this.http.get(`${this.URL}obtenerDocumentosPresentar.php?idConv=${idConv}`);
  }

  public getMeritos(idConv: number) {
    return this.http.get(`${this.URL}obtenerMeritos.php?idConv=${idConv}`);
  }

  public getEventos(idConv: number) {
    return this.http.get(`${this.URL}obtenerEventos.php?idConv=${idConv}`);
  }

  public getDatosRotulo(idConv: number) {
    return this.http.get(`${this.URL}obtenerDatosRotulo.php?idConv=${idConv}`);
  }

  public getConvocatorias(idDep: number) {
    return this.http.get(`${this.URL}obtenerConvocatorias.php?idDep=${idDep}`);
  }

  public getConvocatoriasEncurso(idDep: number) {
    return this.http.get(`${this.URL}obtenerConvocatoriasCurso.php?idDep=${idDep}`);
  }
  
}
