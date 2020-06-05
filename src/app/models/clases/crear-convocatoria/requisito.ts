export class Requisito {
    private idConv:number;
    private descripcion:String;
    public constructor(descripcion){
        this.descripcion=descripcion;
    }
    public getDescripcion(){
        return this.descripcion;
    }
    public getIdLanzConv(){
        return this.idConv;
    }
    public setIdLanzConv(idLanzConv){
        this.idConv=idLanzConv;
    }
}
