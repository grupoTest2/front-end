import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosConvocatoriaService {

  tituloConvocatoria: string = 'Sin nombre';
  gestionConvocatoria: string = 'Gestion';

  constructor() { }
}
