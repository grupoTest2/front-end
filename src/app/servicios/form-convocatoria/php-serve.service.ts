import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhpServeConvocatoria {
  
  URL= "http://localhost/back-end/apiPHP/convocatoria/";
  constructor(private http: HttpClient) { }

//recuperan informacion de la base de datos
  public getItems(idDep:number){
  return this.http.get(`${this.URL}obtenerItems.php?idDep=${idDep}`);
  }
  public getRequisitos(){
  return this.http.get(`${this.URL}obtenerRequisitos.php`);
  }
  public getEventos(idLanzConv){
    return this.http.get(`${this.URL}convocatoriaDocencia/obtenerEventos.php?idLanzConv=${idLanzConv}`);
  }

//agregar a la base de datos
  public agregarRequerimientos(listaItems){
    return this.http.post(`${this.URL}establecerItems.php`, JSON.stringify(listaItems));
  }
  
  public agregarRequisitos(listaRequisitos){
    return this.http.post(`${this.URL}establecerRequisitos.php`, JSON.stringify(listaRequisitos));
  }
  
  public agregarDocumentosPresentar(listaDocumentos){
    return this.http.post(`${this.URL}establecerDocumentosPresentar.php`, JSON.stringify(listaDocumentos));
  }

  public agregarMeritos(listaMeritos){
    return this.http.post(`${this.URL}establecerMeritos.php`, JSON.stringify(listaMeritos));
  }
  
  public agregarConocimientos(listaConocimientos){
    return this.http.post(`${this.URL}establecerCalifConocimientos.php`, JSON.stringify(listaConocimientos));
  }

  public agregarEventos(listaEventos){
    return this.http.post(`${this.URL}establecerEventos.php`, JSON.stringify(listaEventos));
  }

}
