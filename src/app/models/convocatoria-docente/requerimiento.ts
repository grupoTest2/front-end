import { Materia } from './materia';

export class Requerimiento {
    private cantidadItem: number;
    private hrsAcademicas: number;
    private nombreMateria: String;
    public constructor(cantidadItem: number, hrsAcademica: number, nombreM:String) {
        this.cantidadItem = cantidadItem;
        this.hrsAcademicas = hrsAcademica;
        this.nombreMateria =nombreM;
    }
    getCantidadItem(){
        return this.cantidadItem;
    }
    getHrsAcademicas(){
        return this.hrsAcademicas;
    }
    getnombreMateria(){
        return this.nombreMateria;
    }
    
}
