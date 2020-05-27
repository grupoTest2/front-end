//import { Materia } from './materia';

export class Requerimiento {
    private idLanzConv:number;
    private cantidadItem: number;
    private hrsAcademicas: number;
    private nombreMateria: String;
    private idMat: number;
    public constructor(cantidadItem: number, hrsAcademica: number, nombreM:String) {
        this.cantidadItem = cantidadItem;
        this.hrsAcademicas = hrsAcademica;
        this.nombreMateria =nombreM;
    }
    public getCantidadItem(){
        return this.cantidadItem;
    }
    public getHrsAcademicas(){
        return this.hrsAcademicas;
    }
    public getnombreMateria(){
        return this.nombreMateria;
    }
    public setIdMat(id:number){
        this.idMat=id;
    }
    public setIdLanzamientoConv(idLanzConv){
        this.idLanzConv=idLanzConv;
    }
}
