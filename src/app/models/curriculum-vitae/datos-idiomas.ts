export class Idioma {
    private idiom:string;
    private habla:string;
    private lee:string;
    private escribe:string;
    
    constructor(idiom: string, habla:string, lee:string, escribe:string) {
        this.idiom = idiom;
        this.habla = habla;
        this.lee = lee;
        this.escribe = escribe;
    }

    public getIdiomas(): string {
        return this.idiom;
    }
    public setIdioma(value: string) {
        this.idiom = value;
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