export class Requisito {
    private descripcion:String;
    public constructor(descripcion){
        this.descripcion=descripcion;
    }
    public getDescripcion(){
        return this.descripcion;
    }
}
