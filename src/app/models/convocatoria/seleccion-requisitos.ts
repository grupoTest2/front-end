import { Requisito } from '../clases/convocatoria/requisito';

export class SeleccionRequisito {

    private listaRequisitosSeleccionados: Requisito[];

    public constructor(){
      this.listaRequisitosSeleccionados = new Array();
    }

    public getListaRequisitosSeleccionados(): Requisito[]{
      return this.listaRequisitosSeleccionados;
    }

    public agregarRequisito(req: Requisito): string{
      let res:string="ya existe un requisito identico a este";
      if(!this.existeRequisito(req)){
        this.listaRequisitosSeleccionados.push(req);
        res="exito";
      }
      return res;
    }

    private existeRequisito(req:Requisito): boolean{
      let existe:boolean=false;
      for(let i in this.listaRequisitosSeleccionados){
        if(this.listaRequisitosSeleccionados[i].getDescripcion()==req.getDescripcion()){
          existe=true;
          break;
        }
      }
      return existe;
    }


}