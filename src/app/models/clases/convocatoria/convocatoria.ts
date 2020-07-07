import { TipoConvocatoria } from './tipo-convocatoria';
export class Convocatoria{
    private idConv: number;
    private idTipoConv: number;
    private titulo: string;
    private gestion: string;
    private estado: string;
    private tipoConv: TipoConvocatoria;
    private rotuloConvocatoria: boolean;
    public constructor(idTipoConv: number, titulo: string, gestion: string, estado: string = 'No asignado',
                        tipo: TipoConvocatoria = new TipoConvocatoria(idTipoConv,'Docencia')){
        this.idTipoConv = idTipoConv;
        this.titulo     = titulo;
        this.gestion    = gestion;
        this.estado     = estado;
        this.tipoConv   = tipo;
        this.idConv=-1;
        this.rotuloConvocatoria=false;
    }

    public getTitulo(): string{
        return this.titulo;
    }

    public getGestion(): string{
        return this.gestion;
    }

    public getIdTipoConv(): number{
        return this.idTipoConv;
    }

    public getIdConv(): number{
        return this.idConv;
    }

    public setIdConv(idConv): void{
        this.idConv = idConv;
    }

    public setTitulo(titulo): void{
        this.titulo = titulo;
    }

    public setGestion(gestion): void{
        this.gestion = gestion;
    }

    public setTipoConv(idTipoConv){
        this.idTipoConv = idTipoConv;
    }

    public setRotuloConvocatoria(rotuloConvocatoria:boolean){
        this.rotuloConvocatoria=rotuloConvocatoria;
    }
    
    public getEstado(): string{
        return this.estado;
    }

    public setEstado(estado): void{
        this.estado = estado;
    }

    public setTipo(tipo: TipoConvocatoria): void{
        this.tipoConv = tipo;
    }

    public getTipo(): TipoConvocatoria{
        return this.tipoConv;
    }
}