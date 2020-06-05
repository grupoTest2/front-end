import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhpServeLabo {
  
  URL= "http://localhost/back-end/apiPHP/convocatoria/convocatoriaLaboratorio/";
  constructor(private http: HttpClient) { }

  public getNombreItems(idDep:number){
  return this.http.get(`${this.URL}obtenerNombreItems.php?idDep=${idDep}`);
  }
  
  //agregar a la base de datos
  public agregarRequerimientos(listaMaterias){
    return this.http.post(`${this.URL}agregarMaterias.php`, JSON.stringify(listaMaterias));
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
