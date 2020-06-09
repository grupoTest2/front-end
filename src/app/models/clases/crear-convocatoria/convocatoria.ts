export class Convocatoria{
    private idConv:number;
    private idTipoConv:number;
    private titulo:String;
    private gestion:String;

    public constructor(idTipoConv,titulo,gestion){
        this.idTipoConv=idTipoConv;
        this.titulo=titulo;
        this.gestion=gestion;
    }

    public getTitulo(){
        return this.titulo;
    }
    
    public getGestion(){
        return this.gestion;
    }
    
    public getIdTipoConv(){
        return this.idTipoConv;
    }

    public getIdConv(){
        return this.idConv;
    }

    public setIdConv(idConv){
        this.idConv=idConv;
    }

    public setTitulo(titulo){
        this.titulo=titulo;
    }
    
    public setGestion(gestion){
        this.gestion=gestion;
    }

    
    public setTipoConv(idTipoConv){
        this.idTipoConv=idTipoConv;
    }

}