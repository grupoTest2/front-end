export class Tematica {

    private nombre: string;
    private nota: number;
    private idTematica: number;
    private accion:string;
    public constructor(nombre: string, nota: number = 0,idTematica: number=-1) {
        this.nombre = nombre;
        this.nota   = nota;
        this.idTematica=idTematica;
        this.accion="nada";
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(value: string): void {
        this.nombre = value;
    }

    public getNota(): number {
        return this.nota;
    }

    public setNota(value: number): void {
        this.nota = value;
    }
    public setAccion(accion: string): void{
        this.accion=accion;
    }
}
