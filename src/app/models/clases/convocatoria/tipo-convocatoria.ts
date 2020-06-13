export class TipoConvocatoria{
    private idTipoConv: number;
    private nombre: string;

    public constructor(idTipo: number, nombre: string){
        this.idTipoConv  = idTipo;
        this.nombre      = nombre;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public getId(): number{
        return this.idTipoConv;
    }
}