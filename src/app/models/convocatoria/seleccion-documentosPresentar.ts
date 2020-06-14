import { DocumentoPresentar } from '../clases/convocatoria/documento-presentar';

export class SeleccionDocumentos{

    private documentosSeleccionados: DocumentoPresentar[];

    public constructor(){
        this.documentosSeleccionados = new Array();
    }

    public agregarDocumento(doc: DocumentoPresentar): string{
        this.documentosSeleccionados.push(doc);
        return "exito";
    }

    public getDocumentosSeleccionados(): DocumentoPresentar[]{
        return this.documentosSeleccionados;
    }
}