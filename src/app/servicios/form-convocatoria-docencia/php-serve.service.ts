import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhpServeService {
  
  URL= "http://localhost/back-end/apiPHP/";
  constructor(private http: HttpClient) { }
  //obtiene el nombre de las materias de un departamento especifico "idDep"
  public getNombreMaterias(idDep:number){
  return this.http.get(`${this.URL}convocatoriaDocencia/obtenerNombreMaterias.php?idDep=${idDep}`);
  }
  //agrega los requerimientos establecidos a la convocatoria de docencia
  public agregarRequerimientos(listaMaterias){
    return this.http.post(`${this.URL}convocatoriaDocencia/agregarMaterias.php`, JSON.stringify(listaMaterias));
  }
  //obtiene los requisitos que fueron establecidos en una convocatoria pasada dado el año de esta
  public getRequisitos(anio){
    return this.http.get(`${this.URL}convocatoriaDocencia/obtenerRequisitos.php?anio=${anio}`);
  }
  //agrega los requisitos establecidos en esta convocatoria
  public agregarRequisitos(listaRequisitos){
    return this.http.post(`${this.URL}convocatoriaDocencia/agregarMaterias.php`, JSON.stringify(listaRequisitos));
  }
  
}
