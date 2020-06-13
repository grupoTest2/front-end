import { DocumentoPresentar } from '../clases/convocatoria/documento-presentar';

export class SeleccionDocumentos{

    private documentosSeleccionados: DocumentoPresentar[];

    public constructor(){
        this.documentosSeleccionados = new Array();
    }

    public agregarDocumento(doc: DocumentoPresentar): void{
        this.documentosSeleccionados.push(doc);
    }

    public getDocumentosSeleccionados(): DocumentoPresentar[]{
        return this.documentosSeleccionados;
    }
}