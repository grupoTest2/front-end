import { Item } from '../convocatoria/item';
import { DatosPostulante } from './datos-postulante';

export class Postulante{
    private codigoSis: number;
    private nombre: string;
    private apellidoP: string;
    private apellidoM: string;
    private idConv: number;
    private listaItems: Item[];
    private listaDatos: DatosPostulante[];
    private estado: string;
    private evaluador: string;
    private idPos:number;
    public constructor(codigoSis:number,listaItems: Item[]=[], listaDatos:DatosPostulante[]=[]){
        this.idConv= parseInt(localStorage.getItem("idConv"));
        this.idPos=0;
        this.codigoSis=codigoSis;
        this.listaItems=listaItems;
        this.listaDatos=listaDatos;
        this.nombre="";
        this.apellidoP="";
        this.apellidoM="";
        this.estado="sin evaluar"
        this.evaluador="sin evaluador"
    }
    public setIdPostulante(idPos:number){
        this.idPos=idPos;
    }
    public getEstado(): string {
        return this.estado;
    }
    public setEstado(value: string) {
        this.estado = value;
    }
    public getEvaluador(): string {
        return this.evaluador;
    }
    public setEvaluador(value: string) {
        this.evaluador = value;
    }
    
    public setNombre(nombre:string){
        this.nombre=nombre;
    }

    public setApellidoP(apellidoP:string){
        this.apellidoP=apellidoP;
    }

    public setApellidoM(apellidoM){
        this.apellidoM=apellidoM;
    }

    public getNombre(){
        return this.nombre;
    }
    public getApellidoP(){
        return this.apellidoP;
    }
    public getApellidoM(){
        return this.apellidoM;
    }
    public getCodigoSis(){
        return this.codigoSis;
    }
    public agregarItems(item:Item){
        this.listaItems.push(item);
    }

    public getListaItems():Item[]{
        return this.listaItems;
    }

    public getListaDatos():DatosPostulante[]{
        return this.listaDatos;
    }

    public setListaItems(listaItems): void{
        this.listaItems=listaItems;
    }

    public setListaDatos(listaDatos): void{
        this.listaDatos=listaDatos;
    }

}