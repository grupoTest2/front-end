export class Idioma {
    private idioma: string;
    private habala: string;
    private lee: string;
    private escribe: string;
    
    constructor(){}

    public getIdioma(): string {
        return this.idioma;
    }
    public setIdioma(value: string) {
        this.idioma = value;
    }
    public getHabala(): string {
        return this.habala;
    }
    public setHabala(value: string) {
        this.habala = value;
    }
    public getLee(): string {
        return this.lee;
    }
    public setLee(value: string) {
        this.lee = value;
    }
    public getEscribe(): string {
        return this.escribe;
    }
    public setEscribe(value: string) {
        this.escribe = value;
    }

}