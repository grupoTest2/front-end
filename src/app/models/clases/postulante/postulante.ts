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

    public constructor(codigoSis:number,listaItems: Item[]=[], listaDatos:DatosPostulante[]=[]){
        this.idConv= parseInt(localStorage.getItem("idConv"));
        this.codigoSis=codigoSis;
        this.listaItems=listaItems;
        this.listaDatos=listaDatos;
        this.nombre="";
        this.apellidoP="";
        this.apellidoM="";
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