import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosConvocatoriaService {

  tituloConvocatoria: string = 'Nombre gestion';
  gestionConvocatoria: string = 'Año';

  constructor() { }
}
