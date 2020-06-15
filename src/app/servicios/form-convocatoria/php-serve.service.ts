import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Convocatoria } from 'src/app/models/clases/convocatoria/convocatoria';

@Injectable({
  providedIn: 'root'
})
export class PhpServeConvocatoria {

  URL = "http://localhost/back-end/apiPHP/convocatoria/";
  constructor(private http: HttpClient) { }

  //recuperan informacion de la base de datos
  public getItems(idTipoConv: number) {
    return this.http.get(`${this.URL}obtenerItems.php?idTipoConv=${idTipoConv}`);
  }

  public getRequisitos() {
    return this.http.get(`${this.URL}obtenerRequisitos.php`);
  }
  public getEventos(idLanzConv) {
    return this.http.get(`${this.URL}obtenerEventos.php?idLanzConv=${idLanzConv}`);
  }
  public getTipoConvocatoria(idDep) {
    return this.http.get(`${this.URL}obtenerTiposConvocatoria.php?idDep=${idDep}`);
  }

  public getTipoDatosRotulo(){
    return this.http.get(`${this.URL}crearConvocatoria/obtenerTipoDatoRotulo.php`);
  }

  //agregar a la base de datos
  public crearConvocatoria(conv: Convocatoria) {
    return this.http.post(`${this.URL}crearConvocatoria.php`, JSON.stringify(conv));
  }
  public agregarRequerimientos(listaItems) {
    return this.http.post(`${this.URL}establecerItems.php`, JSON.stringify(listaItems));
  }

  public agregarRequisitos(listaRequisitos) {
    return this.http.post(`${this.URL}establecerRequisitos.php`, JSON.stringify(listaRequisitos));
  }

  public agregarDocumentosPresentar(listaDocumentos) {
    return this.http.post(`${this.URL}establecerDocumentosPresentar.php`, JSON.stringify(listaDocumentos));
  }

  public agregarMeritos(listaMeritos) {
    return this.http.post(`${this.URL}establecerMeritos.php`, JSON.stringify(listaMeritos));
  }

  public agregarConocimientos(listaConocimientos) {
    return this.http.post(`${this.URL}establecerCalifConocimientos.php`, JSON.stringify(listaConocimientos));
  }

  public agregarEventos(listaEventos) {
    return this.http.post(`${this.URL}establecerEventos.php`, JSON.stringify(listaEventos));
  }

}
