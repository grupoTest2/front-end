export class DocumentoPresentar {
    private idConv: number;
    private descripcion: string;

    public constructor(descripcion: string){
        this.idConv = parseInt(localStorage.getItem('idConv'));
        this.descripcion = descripcion;
    }

    public getDescripcion(): string{
        return this.descripcion;
    }
}
