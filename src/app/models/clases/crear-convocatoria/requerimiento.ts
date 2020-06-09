//import { Materia } from './materia';
import { Tematica } from './tematica';
export class Requerimiento {
    private idConv: number=1;
    private cantidadItem: number;
    private hrsAcademicas: number;
    private nombreMateria: String;
    private idItem: number;
    private codigoAuxiliatura: String;
    


    private listaTematicas:Tematica[];
    public constructor(cantidadItem: number, hrsAcademica: number, nombreM: String, listaTematicas:Tematica[]=[], codigo: string = "soy codigo") {
        this.cantidadItem = cantidadItem;
        this.hrsAcademicas = hrsAcademica;
        this.nombreMateria = nombreM;
        this.listaTematicas=listaTematicas;
        this.codigoAuxiliatura = codigo;
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




    public setListaTematica(lista:Tematica[]) {
        this.listaTematicas=lista;
    }
    public getListaTematica(){
        return this.listaTematicas;
    }

    public agregarTematica(tematica:Tematica){
        let res=false;
        if(this.getNotaDisponible()>=tematica.getNota()){
            this.listaTematicas.push(tematica);
            res=true;
        }
        return res;
    }
    public getNotaDisponible(){
        let suma=0;
        for(let i in this.listaTematicas){
            suma+=this.listaTematicas[i].getNota();
        }
        return 100-suma;
    }
}
