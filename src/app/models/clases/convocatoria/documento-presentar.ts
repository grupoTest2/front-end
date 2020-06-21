export class DocumentoPresentar {
    private idConv: number;
    private idDocumento: number;
    private descripcion: string;
    private accion: string;

    public constructor(descripcion: string,idDocumento=-1){
        this.idConv = parseInt(localStorage.getItem('idConv'));
        this.descripcion = descripcion;
        this.idDocumento=idDocumento;
        this.accion="nada";
    }

    public getDescripcion(): string{
        return this.descripcion;
    }

    public setDescripcion(descripcion): void{
        this.descripcion=descripcion;
    }

    public getAccion(): string{
        return this.accion;
    }

    public setAccion(accion): void{
        this.accion=accion;
    }
}
