import { DatosPesoanles } from './datos-personales';
import { Idioma } from './datos-idiomas';
import { FormacionAcademica } from './datos-formacion-academica';
import { EstudiosCursosTomados } from './datos-estudios-cursos-tomados';
import { ExperienciaUniversitaria } from './datos-experiencia-universitaria';
import { ExperienciaExtraUniversitaria } from './experiencia-extra-universitaria';
import { Produccion } from './datos-produccion';
import { $ } from 'protractor';


export class Prueba{
  listaDatosPersonales:DatosPesoanles[]=[];
  listaIdiomas:Idioma[]=[];
  listaFormacionAcademica:FormacionAcademica[]=[];
  listaEstudiosCursosTomados:EstudiosCursosTomados[]=[];
  listaExperienciaUniversitaria:ExperienciaUniversitaria[]=[];
  listaExperienciaExtraUniversitaria:ExperienciaExtraUniversitaria[]=[];
  listaProduccion:Produccion[]=[];

  constructor(){}

  guardarDatos(){
      let nombre=$('#nombreUsuario').val();
      let apellidoPtr=$('#nombreUsuario').val();
      let apellidoMtr=$('#nombreUsuario').val();
      let fechaNcm=$('#nombreUsuario').val();
      let lugarNcm=$('#nombreUsuario').val();
      let genero=$('#nombreUsuario').val();
      let estadoCvl=$('#nombreUsuario').val();

      let numeroCI=$('#nombreUsuario').val();
      let lugarEmision=$('#nombreUsuario').val();
      let apellidoMtr=$('#nombreUsuario').val();
      let fechaNcm=$('#nombreUsuario').val();
      let lugarNcm=$('#nombreUsuario').val();
      let genero=$('#nombreUsuario').val();
      let estadoCvl=$('#nombreUsuario').val();

    }
 }