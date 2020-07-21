export class Requisito {
    private idConv: number;
    private idRequisito: number;
    private descripcion: string;
    private accion: string;
    private seleccionado:boolean;
    public constructor(descripcion:string,idRequisto:number=-1,seleccionado:boolean=false){
        this.idConv        = parseInt(localStorage.getItem("idConv"));
        this.descripcion   = descripcion;
        this.idRequisito=idRequisto;
        this.accion="nada";
        this.seleccionado=seleccionado;
    }

    public getDescripcion(): string{
        return this.descripcion;
    }

    public getIdLanzConv(): number{
        return this.idConv;
    }

    public getIdRequisito(): number{
        return this.idRequisito
    }
    public setIdRequisito(value: number) {
        this.idRequisito = value;
    }

    public getAccion(): string{
        return this.accion;
    }

    public setAccion(accion){
        this.accion=accion;
    }
    public getSeleccionado(){
        return this.seleccionado;
    }
    public setSeleccionado(value:boolean):void{
     this.seleccionado=value;
    }
    
}
