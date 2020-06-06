//import { Materia } from './materia';
import { Tematica } from './tematica';

export class Requerimiento {
    private idConv: number;
    private cantidadItem: number;
    private hrsAcademicas: number;
    private nombreMateria: string;
    private idMat: number;
    private codigoAuxiliatura: string;
    public constructor(cantidadItem: number, hrsAcademica: number, nombreM: string) {
        this.cantidadItem = cantidadItem;
        this.hrsAcademicas = hrsAcademica;
        this.nombreMateria = nombreM;
        this.codigoAuxiliatura = nombreM;
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
        this.idConv = idLanzConv;
    }
    public getCodigoAuxiliatura() {
        return this.codigoAuxiliatura;
    }
}
