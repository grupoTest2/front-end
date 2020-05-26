import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhpServeService {
  
  URL= "http://localhost/back-end/apiPHP/";
  constructor(private http: HttpClient) { }

  public getNombreMaterias(idDep:number){
  return this.http.get(`${this.URL}convocatoriaDocencia/obtenerNombreMaterias.php?idDep=${idDep}`);
  }
  
  public agregarRequerimientos(listaMaterias){
    return this.http.post(`${this.URL}convocatoriaDocencia/agregarMaterias.php`, JSON.stringify(listaMaterias));
  }
  public getRequisitos(){
  return this.http.get(`${this.URL}convocatoriaDocencia/obtenerRequisitos.php`);
  }
  public agregarRequisitos(listaRequisitos){
    return this.http.post(`${this.URL}convocatoriaDocencia/establecerRequisitos.php`, JSON.stringify(listaRequisitos));
  }
  public getEventos(){
    return this.http.get(`${this.URL}convocatoriaDocencia/obtenerEventos.php`);
  }

  public agregarEventos(listaEventos){
    return this.http.post(`${this.URL}convocatoriaDocencia/establecerEventos.php`, JSON.stringify(listaEventos));
  }
}
