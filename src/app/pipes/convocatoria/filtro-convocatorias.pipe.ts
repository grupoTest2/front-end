import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroConvocatorias',  pure: false 
})
export class FiltroConvocatoriasPipe implements PipeTransform {

  transform(value: any, gestion?: string, tipo?: string, estado?: string): any {
    const listaFiltrada = [];
    for (const conv of value) {
      if ((conv.getGestion().indexOf(gestion) > -1) && (conv.getTipo().getNombre().toLowerCase().indexOf(tipo.toLowerCase()) > -1)
           && (conv.getEstado().toLowerCase().indexOf(estado.toLowerCase()) > -1)){
        listaFiltrada.push(conv);
      }

    }
    return listaFiltrada;
  }

}
