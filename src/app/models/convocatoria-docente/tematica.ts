export class Tematica {

    private nombre: string;
    private nota: number;
    public constructor(nombre: string, nota: number) {
        this.nombre = nombre;
        this.nota = nota;
    }

    public getNombre(): string {
        return this.nombre;
    }
    public setNombre(value: string) {
        this.nombre = value;
    }
    public getNota(): number {
        return this.nota;
    }
    public setNota(value: number) {
        this.nota = value;
    }
}
