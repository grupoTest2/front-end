import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL= "http://localhost/back-end/apiPHP/";
  constructor(private http: HttpClient) { }

  /*obtenerUsuarios(){
    return this.http.get(`${this.URL}ObtenerUsuarios.php`);
  }
  altaUsuario(usuario){
    return this.http.post(`${this.URL}AltaUsuario.php`,JSON.stringify(usuario));
  }
  bajaUsuario(idUsuario: number) {
    return this.http.get(`${this.URL}BajaUsuario.php?idUsuario=${idUsuario}`);
  }

  seleccionarUsuario(idUsuario: number) {
    return this.http.get(`${this.URL}SeleccionarUsuario.php?idUsuario=${idUsuario}`);
  }

  editarUsuario(usuario) {
    return this.http.post(`${this.URL}EditarUsuario.php`, JSON.stringify(usuario));
  }*/
  prueba(){
    return this.http.get(`${this.URL}prueba.php`);
  }
}
