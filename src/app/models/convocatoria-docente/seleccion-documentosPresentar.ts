import { DocumentoPresentar } from '../clases/crear-convocatoria/documento-presentar';

export class SeleccionDocumentos{
    private documentosSeleccionados:DocumentoPresentar[];
    
    public constructor(){
        this.documentosSeleccionados=new Array();
    }

    public agregarDocumento(doc:DocumentoPresentar){
        this.documentosSeleccionados.push(doc);
    }
    public getDocumentosSeleccionados(){
        return this.documentosSeleccionados;
    }
}