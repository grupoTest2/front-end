export class SeleccionRequisito {
    private listaRequisitosSeleccionados:String[];
    public constructor(){
      this.listaRequisitosSeleccionados=new Array();
    }
    public getListaRequisitosSeleccionados():String[]{
      return this.listaRequisitosSeleccionados;
    }
  }
  