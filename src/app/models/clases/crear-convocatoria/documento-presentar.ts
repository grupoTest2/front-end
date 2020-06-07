export class DocumentoPresentar {
    private idConv:number=1;
    private descripcion:String;
    public constructor(descripcion:String){
        this.descripcion=descripcion;
    }
    getDescripcion(){
        return this.descripcion;
    }
}
