export class DocumentoPresentar {
    private descripcion:String;
    public constructor(descripcion:String){
              this.descripcion=descripcion;
    }
    getDescripcion(){
        return this.descripcion;
    }
}
