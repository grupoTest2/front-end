export class Idioma {
    private idioma: string;
    private habla: string;
    private lee: string;
    private escribe: string;
    
    constructor(){}

    public getIdioma(): string {
        return this.idioma;
    }
    public setIdioma(value: string) {
        this.idioma = value;
    }
    public getHabla(): string {
        return this.habla;
    }
    public setHabla(value: string) {
        this.habla = value;
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