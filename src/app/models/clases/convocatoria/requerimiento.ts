import { Tematica } from './tematica';
export class Requerimiento {
    private idConv: number;
    private cantidadItem: number;
    private hrsAcademicas: number;
    private nombreMateria: string;
    private idItem: number;
    private codigoAuxiliatura: string;
    private listaTematicas: Tematica[];

    public constructor(cantidadItem: number, hrsAcademica: number, nombreM: string, listaTematicas: Tematica[] = [], codigo: string = '') {
        this.idConv             = parseInt(localStorage.getItem("idConv"));
        this.cantidadItem       = cantidadItem;
        this.hrsAcademicas      = hrsAcademica;
        this.nombreMateria      = nombreM;
        this.listaTematicas     = listaTematicas;
        this.codigoAuxiliatura  = codigo;
    }

    public getCantidadItem(): number {
        return this.cantidadItem;
    }

    public getHrsAcademicas(): number {
        return this.hrsAcademicas;
    }

    public getnombreMateria(): string {
        return this.nombreMateria;
    }

    public getCodigoAuxiliatura(): string {
        return this.codigoAuxiliatura;
    }

    public setIdMat(id: number): void {
        this.idItem = id;
    }

    public setCodigoAuxiliatura(codigo: string): void {
        this.codigoAuxiliatura = codigo;
    }

    public setListaTematica(lista: Tematica[]): void {
        this.listaTematicas = lista;
    }

    public getListaTematica(): Tematica[] {
        return this.listaTematicas;
    }

    public agregarTematica(tematica: Tematica): boolean{
        let res = false;
        if (this.getNotaDisponible() >= tematica.getNota()) {
            this.listaTematicas.push(tematica);
            res = true;
        }
        return res;
    }
    public getNotaDisponible(): number {
        let suma = 0;
        for (let i in this.listaTematicas) {
            suma += this.listaTematicas[i].getNota();
        }
        return 100 - suma;
    }
}

