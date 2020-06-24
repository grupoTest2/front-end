import { DocumentoPresentar } from '../clases/convocatoria/documento-presentar';

export class SeleccionDocumentos{

    private documentosSeleccionados: DocumentoPresentar[];

    public constructor(){
        this.documentosSeleccionados = new Array();
    }

    public agregarDocumento(doc: DocumentoPresentar): string{
        let res:string="El documento ya existe";
        if(!this.existeDocumento(doc)){
            this.documentosSeleccionados.push(doc);
            res="exito";
        }
        return res;
    }

    private existeDocumento(req:DocumentoPresentar): boolean{
        let existe:boolean=false;
        for(let i in this.documentosSeleccionados){
          if(this.documentosSeleccionados[i].getDescripcion()==req.getDescripcion()){
            existe=true;
            break;
          }
        }
        return existe;
    }  

    public getDocumentosSeleccionados(): DocumentoPresentar[]{
        return this.documentosSeleccionados;
    }
}