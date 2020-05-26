import { Merito } from './merito';

export class SeleccionMerito {
    private tablaMeritos:Merito[];
    
    public constructor(){
        this.tablaMeritos=new Array();
    }
    public agregarMerito(merito:Merito):boolean{
        let res:boolean=false;
        if(this.getPorcentajeDisponible()>=merito.getPorcentaje()){
            this.tablaMeritos.push(merito);
            res=true;
        }
        return res;
    }
    public agregarSubMerito(merito:Merito,i:number):boolean{
        let subMerito:Merito= this.tablaMeritos[i];
        return subMerito.agregarMerito(merito);
    }
    public agregarSubSubMerito(merito:Merito,i:number,j:number):boolean{
        let subMerito:Merito= this.tablaMeritos[i];
        let subLista=subMerito.getListaMeritos();
        let subSubMerito:Merito=subLista[j];
        return subSubMerito.agregarMerito(merito);
    }
    public getPorcentajeDisponible():number{
        let suma:number=0;
        for(let i in this.tablaMeritos){
            let objaux=this.tablaMeritos[i];
            suma+=objaux.getPorcentaje();
        }
        return 100-suma;
    }
    public getTablaMeritos(){
        return this.tablaMeritos;
    }
}