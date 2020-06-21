export class Merito {
  private idConv: number;
  private idMerito: number;
  private titulo: string;
  private descripcion: string;
  private porcentaje: number;
  private listaMeritos: Merito[];
  private accion:string;
  public constructor(titulo: string, descrip: string, porcentaje: number, listaMeritos: Merito[] = [],idMerito=-1) {
    this.idConv = parseInt(localStorage.getItem("idConv"));
    this.titulo = titulo;
    this.descripcion = descrip;
    this.porcentaje = porcentaje;
    this.listaMeritos = listaMeritos;
    this.idMerito=idMerito;
    this.accion="nada";
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getDescripcion(): string {
    return this.descripcion;
  }

  public getPorcentaje(): number {
    return this.porcentaje;
  }

  public getListaMeritos(): Merito[] {
    return this.listaMeritos;
  }

  public setAccion(accion):void{
    this.accion=accion;
  }

  public agregarMerito(merito: Merito): string {
    let res: string;
    if (this.quedaPorcentaje() && merito.getPorcentaje() <= this.getPorcentajeDisponible()) {
      if (!this.existeMerito(merito)) {
        this.listaMeritos.push(merito);
        res = "exito";
      } else {
        res = "ya existe un merito con el mismo nombre";
      }
    } else {
      res = "el porcentaje debe ser menor o igual a" + this.getPorcentajeDisponible();
    }
    return res;
  }

  private existeMerito(merito: Merito): boolean {
    let existe: boolean = false;
    for (let i in this.listaMeritos) {
      if (this.listaMeritos[i].getTitulo() == merito.getTitulo()) {
        existe = true;
        break;
      }
    }
    return existe;
  }

  public quedaPorcentaje(): boolean {
    let sumaPorcentaje: number = 0;
    for (let i in this.listaMeritos) {
      let objAux: Merito = this.listaMeritos[i];
      sumaPorcentaje += objAux.getPorcentaje();
    }
    return sumaPorcentaje < this.porcentaje;
  }

  public getPorcentajeDisponible(): number {
    let sumaPorcentaje: number = 0;
    for (let i in this.listaMeritos) {
      let objAux: Merito = this.listaMeritos[i];
      sumaPorcentaje += objAux.getPorcentaje();
    }
    return this.porcentaje - sumaPorcentaje;
  }

}
