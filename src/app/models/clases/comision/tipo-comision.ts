export class TipoComision{
    private idTipoComision: number;
    private nombre: string;

    public constructor(idTipoComision: number, nombre: string){
        this.idTipoComision=idTipoComision;
        this.nombre=nombre;
    }

    public getIdTipoComision(): number{
        return this.idTipoComision;
    }

    public getNombre(): string{
        return this.nombre;
    }

}