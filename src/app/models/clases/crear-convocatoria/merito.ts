export class Merito {
  private idConv:number=1;
  private titulo:string;
  private descripcion:string;
  private porcentaje:number;
  private listaMeritos:Merito[];
  public constructor(titulo:string,descrip:string,porcentaje:number, listaMeritos: Merito[]= []){
    this.titulo=titulo;
    this.descripcion=descrip;
    this.porcentaje=porcentaje;
    this.listaMeritos=listaMeritos;
  }
  public getTitulo():string{
    return this.titulo;
  }

  public getDescripcion():string{
    return this.descripcion;
  }
  public getPorcentaje():number{
    return this.porcentaje;
  }
  public getListaMeritos():Merito[]{
    return this.listaMeritos;
  }
  public setLanzConv(idLanzConv){
    this.idConv=idLanzConv;
  }
  public agregarMerito(merito:Merito):boolean{
    let res:boolean=false;
    if (this.quedaPorcentaje() && merito.getPorcentaje()<=this.getPorcentajeDisponible()) {
      this.listaMeritos.push(merito);
      res=true;
    }
    return res;
  }
  public quedaPorcentaje():boolean{
    let sumaPorcentaje:number=0;
    for (let i in this.listaMeritos){
      let objAux:Merito=this.listaMeritos[i];
      sumaPorcentaje+=objAux.getPorcentaje();
    }
    return sumaPorcentaje<this.porcentaje;
  }
  public getPorcentajeDisponible(){
    let sumaPorcentaje:number=0;
    for (let i in this.listaMeritos) {
      let objAux:Merito=this.listaMeritos[i];
      sumaPorcentaje+=objAux.getPorcentaje();
    }
    return this.porcentaje-sumaPorcentaje;
  }

}
