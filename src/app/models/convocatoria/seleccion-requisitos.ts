import { Requisito } from '../clases/convocatoria/requisito';

export class SeleccionRequisito {

    private listaRequisitosSeleccionados: Requisito[];

    public constructor(){
      this.listaRequisitosSeleccionados = new Array();
    }

    public getListaRequisitosSeleccionados(): Requisito[]{
      return this.listaRequisitosSeleccionados;
    }

    public agregarRequisito(req: Requisito): void{
      this.listaRequisitosSeleccionados.push(req);
    }

    public setIdLanzamientoConvocatoria(idLanzConv): void{
      for(let i in this.listaRequisitosSeleccionados){
        this.listaRequisitosSeleccionados[i].setIdLanzConv(idLanzConv);
      }
    }
}