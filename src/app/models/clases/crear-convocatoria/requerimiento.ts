//import { Materia } from './materia';
import { Tematica } from './tematica';

export class Requerimiento {
    private idConv: number=1;
    private cantidadItem: number;
    private hrsAcademicas: number;
    private nombreMateria: String;
    private idItem: number;
    private codigoAuxiliatura: String;
    public constructor(cantidadItem: number, hrsAcademica: number, nombreM: String) {
        this.cantidadItem = cantidadItem;
        this.hrsAcademicas = hrsAcademica;
        this.nombreMateria = nombreM;
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
    public getCodigoAuxiliatura() {
        return this.codigoAuxiliatura;
    }
    
    public setIdMat(id: number) {
        this.idItem = id;
    }
    public setCodigoAuxiliatura(codigo:String){
        this.codigoAuxiliatura=codigo;
    }
}
