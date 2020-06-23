import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComisionesServicePhp {

  URL = "http://localhost/back-end/apiPHP/convocatoria/comision/";
  constructor(private http: HttpClient) { }

  //recuperan informacion de la base de datos
  public getUsuarios() {
    return this.http.get(`${this.URL}obtenerUsuarios.php`);
  }

  public getTiposComision(){
    return this.http.get(`${this.URL}obtenerTiposComisiones.php`);
  }

}
