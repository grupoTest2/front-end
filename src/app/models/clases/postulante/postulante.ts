import { Item } from './item';
import { DatosPostulante } from './datos-postulante';

export class Postulante{
    private codigoSis: number;
    private idConv: number;
    private listaItems: Item[];
    private listaDatos: DatosPostulante[];

    public constructor(codigoSis:number,listaItems: Item[]=[], listaDatos:DatosPostulante[]=[]){
        this.idConv= parseInt(localStorage.getItem("idConv"));
        this.codigoSis=codigoSis;
        this.listaItems=listaItems;
        this.listaDatos=listaDatos;
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