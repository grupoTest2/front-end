export class EstadoConv{
    private idEstado: number;
    private nombre: string;

    public constructor(idEstado,nombre){
        this.idEstado=idEstado;
        this.nombre=nombre;
    }

    public getIdEstado(): number{
        return this.idEstado;
    }

    public getNombre(): string{
        return this.nombre;
    }
}