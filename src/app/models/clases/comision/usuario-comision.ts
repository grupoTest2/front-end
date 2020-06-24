export class UsuarioComision{
    private idConv: number;
    private idUsuario: number;
    private accion: string;
    constructor(idUsuario: number, accion: string, idConv:number) {
        this.idUsuario = idUsuario;
        this.accion=accion;
        this.idConv=idConv;
    }

    public getIdUsuario(): number {
        return this.idUsuario;
    }

    public setLdUsuario(idUsuario): void {
        this.idUsuario = idUsuario;
    }

    public getAccion(): string{
        return this.accion;
    }
    public setAccion(accion): void{
        this.accion=accion;
    }


}