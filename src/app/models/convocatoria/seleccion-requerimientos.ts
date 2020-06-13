import { Requerimiento } from '../clases/convocatoria/requerimiento';

export class SeleccionRequerimiento{

    private materiasSeleccionadas: Requerimiento[];
    private listaMaterias: object[];
    private listaMateriasDisponibles: string[];

    public constructor(listaMat: object[]) {
      this.materiasSeleccionadas = new Array();
      this.listaMaterias = listaMat;
      this.actualizarListaMatDisponibles();
    }

    public actualizarListaMatDisponibles(): void {
      this.listaMateriasDisponibles = new Array();
      for (let i in this.listaMaterias) {
        let mat: any = this.listaMaterias[i];
        if (!mat.seleccionado) {
          this.listaMateriasDisponibles.push(mat.nombreItem);
        }
      }
    }

    private getIdMateria(nombItem): number {
      let res = -1;
      for (let i in this.listaMaterias) {
        let mat: any = this.listaMaterias[i];
        if (mat.nombreItem == nombItem) {
          res = mat.idItem;
          break;
        }
      }
      return res;
    }

    public agregarRequerimientoSeleccionado(req: Requerimiento): void {
        let idMateria = this.getIdMateria(req.getnombreMateria());
        if (idMateria !== -1) {
          req.setIdMat(idMateria);
          this.deshabilitarSeleccion(req.getnombreMateria());
          this.establecerCodigoAux(req,idMateria);
          this.materiasSeleccionadas.push(req);
        }
    }

    public deshabilitarSeleccion(nombreMatForm): void {
      for (let i in this.listaMaterias) {
        let mat: any = this.listaMaterias[i];
        if (mat.nombreItem == nombreMatForm) {
          mat.seleccionado = true;
        }
      }
      this.actualizarListaMatDisponibles();
    }

    public hayMateriasDisponibles(): boolean{
      return this.listaMateriasDisponibles.length > 0;
    }

    public existeMateriasSeleccionas(): boolean {
      return this.materiasSeleccionadas.length > 0;
    }

    public getListaMateriasDisponibles(): string[] {
      return this.listaMateriasDisponibles;
    }

    public getMateriasSeleccionadas(): Requerimiento[] {
      return this.materiasSeleccionadas;
    }

    private establecerCodigoAux(req: Requerimiento, idItem: number): void{
      for (let i in this.listaMaterias) {
        let mat: any = this.listaMaterias[i];
        if (mat.idItem == idItem) {
          req.setCodigoAuxiliatura(mat.codigoItem);
        }
      }
    }
}
