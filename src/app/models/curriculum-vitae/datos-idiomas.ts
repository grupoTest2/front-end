export class Idioma {
    private idConv: number;
    private idPos: number;
    private idiom:string;
    private habla:string;
    private lee:string;
    private escribe:string;
    
    constructor(idiom: string, habla:string, lee:string, escribe:string) {
        this.idConv=parseInt(localStorage.getItem("idConv"));
        let datos=JSON.parse(localStorage.getItem("postulante"));
        this.idPos=datos.idPostulante;
        this.idiom = idiom;
        this.habla = habla;
        this.lee = lee;
        this.escribe = escribe;
    }

    public getIdiomas(): string {
        return this.idiom;
    }
    public setIdioma(value: string) :void{
        this.idiom = value;
    }
    public getHabla(): string {
        return this.habla;
    }
    public setHabla(value: string):void {
        this.habla = value;
    }
    public getLee(): string {
        return this.lee;
    }
    public setLee(value: string):void {
        this.lee = value;
    }
    public getEscribe(): string {
        return this.escribe;
    }
    public setEscribe(value: string):void {
        this.escribe = value;
    }

}