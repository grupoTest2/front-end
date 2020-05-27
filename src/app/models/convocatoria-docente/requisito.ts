export class Requisito {
    private idLanzConv:number;
    private descripcion:String;
    public constructor(descripcion){
        this.descripcion=descripcion;
    }
    public getDescripcion(){
        return this.descripcion;
    }
    public getIdLanzConv(){
        return this.idLanzConv;
    }
    public setIdLanzConv(idLanzConv){
        this.idLanzConv=idLanzConv;
    }
}
