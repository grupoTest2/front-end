export class TipoDatoRotulo {
    private nombre: string;
    private tipoDeDato: string;
    private tamanioMinimo: number;
    private valor: string;
    constructor(nombre: string, tipoDato: string, tamanioMinimo: number) {
        this.nombre = nombre;
        this.tipoDeDato = tipoDato;
        this.tamanioMinimo = tamanioMinimo;
        this.valor=""
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
    public getValor(): string {
        return this.valor;
    }
    public setValor(value: string) {
        this.valor = value;
    }
}
