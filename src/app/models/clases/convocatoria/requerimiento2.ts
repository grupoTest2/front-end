import { Item } from './item';
import { Tematica } from './tematica2';

export class Requerimiento {
    private hrsAcademicas: number;
    private cantidadItem: number;
    private item: Item;
    private listaTematicas: Tematica[];
    private notaDisponible: number;
    private accion: string;
    private idConv: number;
    public constructor(hrsAcademicas: number, cantidadItem: number, item: Item, listaTematicas: Tematica[] = []) {
        this.idConv = parseInt(localStorage.getItem("idConv"));
        this.hrsAcademicas = hrsAcademicas;
        this.cantidadItem = cantidadItem;
        this.item = item;
        this.listaTematicas = listaTematicas;
        this.accion = "nada";
        this.notaDisponible = 100;
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
        return this.notaDisponible;
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

    public setAccion(accion): void {
        this.accion = accion;
    }

    public setIdConv(idConv): void {
        this.idConv = idConv;
    }
    public agregarTematica(tem: Tematica): boolean {
        let res = false;
        if (this.notaDisponible >= tem.getPorcentaje()) {
            this.listaTematicas.push(tem);
            this.notaDisponible -= tem.getPorcentaje();
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