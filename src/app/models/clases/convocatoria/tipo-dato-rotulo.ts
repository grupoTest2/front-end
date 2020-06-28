export class TipoDatoRotulo {
    private nombre: string;
    private tipoDeDato: string;
    private tamanioMinimo: number;
    private tamanioMaximo: number;
    constructor(nombre: string, tipoDato: string, tamanioMinimo: number, tamanioMaximo: number) {
        this.nombre = nombre;
        this.tipoDeDato = tipoDato;
        this.tamanioMinimo = tamanioMinimo;
        this.tamanioMaximo = tamanioMaximo;
    }

    public getNombre(): string {
        return this.nombre;
    }
    public setNombre(value: string) {
        this.nombre = value;
    }
    public getTipoDeDato(): string {
        return this.tipoDeDato;
    }
    public setTipoDeDato(value: string) {
        this.tipoDeDato = value;
    }
    public getTamanioMinimo(): number {
        return this.tamanioMinimo;
    }
    public setTamanioMinimo(value: number) {
        this.tamanioMinimo = value;
    }
    public getTamanioMaximo(): number {
        return this.tamanioMinimo;
    }
    public setTamanioMaximo(value: number) {
        this.tamanioMinimo = value;
    }
}
