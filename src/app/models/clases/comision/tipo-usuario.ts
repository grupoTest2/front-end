export class TipoUsuario{
    private idTipoUsuario: number;
    private nombre: string;

    public constructor(idTipoUsuario: number, nombre: string){
        this.idTipoUsuario=idTipoUsuario;
        this.nombre=nombre;
    }

    public getIdTipoUsuario(): number{
        return this.idTipoUsuario;
    }

    public getNombre(): string{
        return this.nombre;
    }
}