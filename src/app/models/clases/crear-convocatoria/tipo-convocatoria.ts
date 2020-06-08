export class TipoConvocatoria{
    private idTipoConv:number;
    private nombre:String;
    public constructor(idTipo,nombre){
        this.idTipoConv=idTipo;
        this.nombre=nombre;
    }
    public getNombre(){
        return this.nombre;
    }
    public getId(){
        return this.idTipoConv;
    }
}