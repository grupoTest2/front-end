import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhpServeService {
  
  URL= "http://localhost/back-end/apiPHP/";
  constructor(private http: HttpClient) { }

  public getNombreMaterias(){
  return this.http.get(`${this.URL}convocatoriaDocencia/obtenerNombreMaterias.php`);
  }
}
