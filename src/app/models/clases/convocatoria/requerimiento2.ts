import { Item } from './item';
import { Tematica } from './tematica2';
import { TipoEvaluacion } from './tipo-de-evaluacion';

export class Requerimiento {
    private hrsAcademicas: number;
    private cantidadItem: number;
    private item: Item;
    private listaTematicas: Tematica[];
    private accion: string;
    private idConv: number;
    public constructor(hrsAcademicas: number, cantidadItem: number, item: Item, listaTematicas: Tematica[] = []) {
        this.idConv = parseInt(localStorage.getItem("idConv"));
        this.hrsAcademicas = hrsAcademicas;
        this.cantidadItem = cantidadItem;
        this.item = item;
        this.listaTematicas = listaTematicas;
        this.accion = "nada";
    }

    public getIdItem(): number {
        return this.item.getIdItem();
    }

    public getHrsAcademicas(): number {
        return this.hrsAcademicas;
    }

    public getCantidadItem(): number {
        return this.cantidadItem;
    }

    public getItem(): Item {
        return this.item;
    }

    public getListaTematicas(): Tematica[] {
        return this.listaTematicas;
    }

    public getNotaDisponible(): number {
        let suma=0;
        for(let i in this.listaTematicas){
            suma+=this.listaTematicas[i].getPorcentaje();
        }
        return 100-suma;
    }

    public getAccion(): string {
        return this.accion;
    }
    public getCodigoItem(): string {
        return this.item.getCodigoItem();
    }
    public getNombreItem(): string {
        return this.item.getNombreItem();
    }
    public setListaTematicas(listaTematicas: Tematica[]): void {
        this.listaTematicas = listaTematicas;
    }
    public getListaEvaluacion(tematica:Tematica): TipoEvaluacion[]{
        let res:TipoEvaluacion[]=[];
        for(let i in this.listaTematicas){
            if(this.listaTematicas[i].getIdTematica()==tematica.getIdTematica()){
                res=this.listaTematicas[i].getTiposEvaluacion();
            }
        }
        return res;
    }
    public setAccion(accion): void {
        this.accion = accion;
    }

    public setIdConv(idConv): void {
        this.idConv = idConv;
    }
    public agregarTematica(tem: Tematica): boolean {
        let res = false;
        if (this.getNotaDisponible() >= tem.getPorcentaje()) {
            this.listaTematicas.push(tem);
            res = true;
        }
        return res;
    }

    public getPorcentajeTematica(tematica: Tematica): number {
        let res = 0;
        let bandera=true;
        if (this.listaTematicas != []) {
            for (let index = 0; index < this.listaTematicas.length&&bandera; index++) {
                if (this.listaTematicas[index].getIdTematica() === tematica.getIdTematica()) {
                    res = this.listaTematicas[index].getPorcentaje();
                    bandera=false;
                }
            }
        }
        return res;
    }
}