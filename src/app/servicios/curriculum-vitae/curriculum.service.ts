import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatosPersonales } from 'src/app/models/curriculum-vitae/datos-personales';
import { Idioma } from 'src/app/models/curriculum-vitae/datos-idiomas';
import { FormacionAcademica } from 'src/app/models/curriculum-vitae/datos-formacion-academica';
import { EstudiosCursosTomados } from 'src/app/models/curriculum-vitae/datos-estudios-cursos-tomados';
import { ExperienciaUniversitaria } from 'src/app/models/curriculum-vitae/datos-experiencia-universitaria';
import { ExperienciaExtraUniversitaria } from 'src/app/models/curriculum-vitae/datos-experiencia-extra-universitaria';
import { Produccion } from 'src/app/models/curriculum-vitae/datos-produccion';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  URL = "http://localhost/back-end/apiPHP/convocatoria/curriculumVitae/";
  constructor(private http: HttpClient) { }

   //recuperan informacion de la base de datos
   public getPostulante(codigoRotulo:string) {
    return this.http.get(`${this.URL}obtenerPostulante.php?codigo=${codigoRotulo}`);
  }

  //envian informacion al servidor phpç

  public agregarDatosPersonales(datos:DatosPersonales){
    return this.http.post(`${this.URL}registrarDatosPersonales.php`, JSON.stringify(datos));
  }

  public agregarIdiomas(idiomas:Idioma){
    return this.http.post(`${this.URL}registrarIdiomas.php`, JSON.stringify(idiomas));
  }
  
  public agregarFormacionAcademica(formacionAcademica:FormacionAcademica){
    return this.http.post(`${this.URL}registrarFormacionAcademica.php`, JSON.stringify(formacionAcademica));
  }
  
  public agregarEstudiosCursosTomados(estudiosCursos:EstudiosCursosTomados){
    return this.http.post(`${this.URL}registrarEstudiosCursos.php`, JSON.stringify(estudiosCursos));
  }

  public agregarExperienciaUniversitaria(experienciaUniversitaria:ExperienciaUniversitaria){
    return this.http.post(`${this.URL}registrarExperienciaU.php`, JSON.stringify(experienciaUniversitaria));
  }

  public agregarExperienciaExtraUniversitaria(experienciaExtra:ExperienciaExtraUniversitaria){
    return this.http.post(`${this.URL}registrarExperienciaExtraU.php`, JSON.stringify(experienciaExtra));
  }

  public agregarProduccion(produccion:Produccion){
    return this.http.post(`${this.URL}registrarProduccion.php`, JSON.stringify(produccion));
  }
}
