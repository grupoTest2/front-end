import { TipoDatoRotulo } from './tipo-dato-rotulo';

export class DatoRotulo {
    private idConv: number;
    private idDato: number;
    private seleccionado: boolean;
    private enLista: boolean;
    private accion: string;
    private tipoDato: TipoDatoRotulo;
    public constructor(idDato:number,tipoDato:TipoDatoRotulo,seleccionado: boolean=false,enLista:boolean=false) {
        this.idConv = parseInt(localStorage.getItem("idConv"));
        this.idDato=idDato;
        this.seleccionado = seleccionado;
        this.enLista = enLista;
        this.tipoDato=tipoDato;
        this.accion ="nada";
    }
    
    public setIdDato(idDato:number){
        this.idDato=idDato;
    }
    public getIdDato(){
        return this.idDato;
    }
    public getNombreTipoDato(): string{
        return this.tipoDato.getNombre();
    }
    public getSeleccionado(): boolean {
        return this.seleccionado;
    }
    public setSeleccionado(seleccionado: boolean) {
        this.seleccionado = seleccionado;
    }

    public setEnLista(bandera:boolean){
        this.enLista=bandera;
    }

    public getEnLista(){
        return this.enLista;
    }

    public setAccion(accion:string): void{
        this.accion=accion;
    }

    public getAccion(accion:string): string{
        return this.accion;
    }
    public setTipoDato(tipo:TipoDatoRotulo): void{
        this.tipoDato=tipo;
    }

    public getTipoDato(): TipoDatoRotulo{
        return this.tipoDato;
    }
}