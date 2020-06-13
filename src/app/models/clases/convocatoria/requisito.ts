export class Requisito {
    private idConv: number;
    private descripcion: string;

    public constructor(descripcion){
        this.idConv        = parseInt(localStorage.getItem("idConv"));
        this.descripcion   = descripcion;
    }

    public getDescripcion(): string{
        return this.descripcion;
    }

    public getIdLanzConv(): number{
        return this.idConv;
    }

    public setIdLanzConv(idLanzConv): void{
        this.idConv = idLanzConv;
    }
}
