import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCodSis', pure : false
})
export class FiltroCodSisPipe implements PipeTransform {

  transform(value: any, codigo?: string): any {
    const listaFiltrada = [];
    for (const postulante of value) {
      let tam = codigo.length;
      if ((postulante.getCodigoSis().toString().substr(0, tam).indexOf(codigo) > -1)){
        listaFiltrada.push(postulante);
      }

    }
    return listaFiltrada;
  }

}
