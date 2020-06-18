export class Convocatoria{
    private idConv: number;
    private idTipoConv: number;
    private titulo: string;
    private gestion: string;
    private estado: string;

    public constructor(idTipoConv: number, titulo: string, gestion: string, estado: string = 'No asignado'){
        this.idTipoConv = idTipoConv;
        this.titulo     = titulo;
        this.gestion    = gestion;
        this.estado     = estado;
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

    public getEstado(): string{
        return this.estado;
    }

    public setEstado(estado): void{
        this.estado = estado;
    }
}