import { Item } from './item';
import { Tematica } from './tematica';

export class Requerimiento{
    private hrsAcademicas: number;
    private cantidadItem: number;
    private item:Item;
    private listaTematicas: Tematica[];
    private notaDisponible: number;
    private accion: string;

    public constructor(hrsAcademicas:number,cantidadItem:number,item:Item,listaTematicas:Tematica[]=[]){
        this.hrsAcademicas=hrsAcademicas;
        this.cantidadItem=cantidadItem;
        this.item=item;
        this.listaTematicas=listaTematicas;
        this.accion="nada";
        this.notaDisponible=100;
    }

    public getHrsAcademicas():number{
        return this.hrsAcademicas;
    }

    public getCantidadItem(): number{
        return this.cantidadItem;
    }

    public getItem():Item{
        return this.item;
    }

    public getListaTematicas(): Tematica[]{
        return this.listaTematicas;
    }

    public getNotaDisponible(): number{
        return this.notaDisponible;
    }

    public getAccion(): string{
        return this.accion;
    }
    public getCodigoItem(): string{
        return this.item.getCodigoItem();
    }
    public getNombreItem():string{
        return this.item.getNombreItem();
    }
    public setListaTematicas(listaTematicas:Tematica[]): void{
        this.listaTematicas=listaTematicas;
    }

    public setAccion(accion): void{
        this.accion=accion;
    }

    public agregarTematica(tem: Tematica):boolean{
        let res=false;
        if(this.notaDisponible>=tem.getNota()){
            this.listaTematicas.push(tem);
            this.notaDisponible-=tem.getNota();
            res=true;
        }
        return res;
    }
}