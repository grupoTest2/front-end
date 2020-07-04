export class TipoEvaluacion {

    private idEvaluacion:number;
    private nombre:string;
    private porcentaje:number;
    
    constructor(idEvaluacion:number, nombre:string){
        this.idEvaluacion=idEvaluacion;
        this.nombre=nombre;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(value: string): void {
        this.nombre = value;
    }

    public getPorcentaje(): number {
        return this.porcentaje;
    }

    public setPorcentaje(value: number): void {
        this.porcentaje = value;
    }
    public getId(): number{
        return this.idEvaluacion;
    }
    public setId(id: number): void{
        this.idEvaluacion=id;
    }
}