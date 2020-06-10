export class DocumentoPresentar {
    private idConv:number= parseInt(localStorage.getItem("idConv"));
    private descripcion:String;
    public constructor(descripcion:String){
        this.descripcion=descripcion;
    }
    getDescripcion(){
        return this.descripcion;
    }
}
