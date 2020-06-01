import { CalificacionConocimiento } from './calificacion-conocimiento';

export class SeleccionCalificacion{
    private listaCalificacionSeleccioada:CalificacionConocimiento[];

    public constructor(){
        this.listaCalificacionSeleccioada=new Array();
    }

    public agregarCalificacionConocimiento(calif:CalificacionConocimiento):boolean{
        let res:boolean=false;
        if(this.getPorcentajeDisponible()>=calif.getPorcentaje()){
            this.listaCalificacionSeleccioada.push(calif);
            res=true;
        }
        return res;
    }
    public getPorcentajeDisponible():number{
        let suma:number=0;
        for(let i in this.listaCalificacionSeleccioada){
            let objaux=this.listaCalificacionSeleccioada[i];
            suma+=objaux.getPorcentaje();
        }
        return 100-suma;
    }
    public getListaCalifConocimientosSeleccionada(){
        return this.listaCalificacionSeleccioada;
    }
}