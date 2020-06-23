export class DatosPostulante{
    private idDato: number;
    private nombreDato: string;
    private valorDato: any;

    public constructor(idDato: number, nombreDato: string,valorDato: any=""){
        this.idDato=idDato;
        this.nombreDato=nombreDato;
        this.valorDato=valorDato;
    }

    public getNombreDato(): string{
        return this.nombreDato
    }

    public setValorDato(valorDato): void{
        this.valorDato=valorDato;
    }
    
}