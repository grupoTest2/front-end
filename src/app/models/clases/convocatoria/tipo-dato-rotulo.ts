export class TipoDatoRotulo {
    private idConv: number;
    private nombre: string;
    private seleccionado: boolean;

    public constructor(nombre: string, seleccionado: boolean) {
        this.idConv        = parseInt(localStorage.getItem("idConv"));
        this.nombre = nombre;
        this.seleccionado = seleccionado;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getSeleccionado(): boolean {
        return this.seleccionado;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setSeleccionado(seleccionado: boolean) {
        this.seleccionado = seleccionado;
    }
}