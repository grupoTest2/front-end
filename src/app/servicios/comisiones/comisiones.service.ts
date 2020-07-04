import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comision } from 'src/app/models/clases/comision/comision';

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

  public getComisiones(objCom:any){
    return this.http.post(`${this.URL}obtenerComisiones.php`, JSON.stringify(objCom));
  }

  public getTiposUsuario(idDep:number){
    return this.http.get(`${this.URL}obtenerTiposUsuario.php?idDep=${idDep}`);
  }

  public getTematicas(idConv){
    return this.http.get(`${this.URL}obtenerTematicasConv.php?idConv=${idConv}`);
  }
  //enviar datos al servidor php

  public agregarUsuariosComision(listaComision:Comision[]){
    return this.http.post(`${this.URL}agregarMiembroComision.php`, JSON.stringify(listaComision));
  }
}
