export class Requisito {
    private idConv: number;
    private idRequisito: number;
    private descripcion: string;
    private accion: string;
    public constructor(descripcion,idRequisto=-1){
        this.idConv        = parseInt(localStorage.getItem("idConv"));
        this.descripcion   = descripcion;
        this.idRequisito=idRequisto;
        this.accion="nada";
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

    public getAccion(): string{
        return this.accion;
    }

    public setAccion(accion){
        this.accion=accion;
    }
    
}
