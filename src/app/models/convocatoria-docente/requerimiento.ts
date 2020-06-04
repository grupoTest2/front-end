//import { Materia } from './materia';
import { Tematica } from './tematica';

export class Requerimiento {
    private idLanzConv: number;
    private cantidadItem: number;
    private hrsAcademicas: number;
    private nombreMateria: string;
    private idMat: number;
    private codigoAuxiliatura: string;
    private listaCalificaciones: Tematica[];
    public constructor(cantidadItem: number, hrsAcademica: number, nombreM: string, codigoAuxiliatura: string = " ", listaCalificaciones: Tematica[] = []) {
        this.cantidadItem = cantidadItem;
        this.hrsAcademicas = hrsAcademica;
        this.nombreMateria = nombreM;
        this.codigoAuxiliatura = nombreM;
        this.listaCalificaciones = listaCalificaciones;
    }
    public getCantidadItem() {
        return this.cantidadItem;
    }
    public getHrsAcademicas() {
        return this.hrsAcademicas;
    }
    public getnombreMateria() {
        return this.nombreMateria;
    }
    public setIdMat(id: number) {
        this.idMat = id;
    }
    public setIdLanzamientoConv(idLanzConv) {
        this.idLanzConv = idLanzConv;
    }
    public getCodigoAuxiliatura() {
        return this.codigoAuxiliatura;
    }
    public getListaCalificaciones(): Tematica[] {
        return this.listaCalificaciones;
    }
    public setListaCalificaciones(value: Tematica[]) {
        this.listaCalificaciones = value;
    }

}
