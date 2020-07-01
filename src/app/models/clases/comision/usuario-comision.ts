export class UsuarioComision{
    private idUsuario: number;
    private idTipoUsuario: number;
    private accion: string;
    constructor(idUsuario: number, accion: string,idTipoUsuario:number) {
        this.idUsuario = idUsuario;
        this.accion=accion;
        this.idTipoUsuario=idTipoUsuario;
    }
    
    public setIdTipoUsuario(idTipoUsuario: number): void{
        this.idTipoUsuario=idTipoUsuario;
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