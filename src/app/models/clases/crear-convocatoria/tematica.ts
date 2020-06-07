export class Tematica {

    private nombre: String;
    private nota: number;
    public constructor(nombre: String, nota: number=0) {
        this.nombre = nombre;
        this.nota = nota;
    }

    public getNombre(): String {
        return this.nombre;
    }
    public setNombre(value: String) {
        this.nombre = value;
    }
    public getNota(): number {
        return this.nota;
    }
    public setNota(value: number) {
        this.nota = value;
    }
}
