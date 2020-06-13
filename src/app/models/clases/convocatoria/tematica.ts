export class Tematica {

    private nombre: string;
    private nota: number;

    public constructor(nombre: string, nota: number = 0) {
        this.nombre = nombre;
        this.nota   = nota;
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
}
