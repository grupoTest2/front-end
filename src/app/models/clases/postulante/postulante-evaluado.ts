import { Usuario } from '../comision/usuario';
import { Requisito } from '../convocatoria/requisito';
export class PostulanteEvaluado {
    private idPostulante: number;
    private idConv:number;
    private codigoSis: number;
    private nombreCompleto:string;
    private estado: string;
    private nombreUsuario:string;
    private idUsuarioHab:number;
    private listaRequisitos:Requisito[];
    constructor(idPostulante: number, idConv: number,codigoSis:number,nombreCompleto:string,estado:string,nombreUsuario:string="",idUsHab:number=-1) {
        this.idPostulante = idPostulante;
        this.idConv=idConv;
        this.codigoSis=codigoSis;
        this.nombreCompleto=nombreCompleto;
        this.estado=estado;
        this.nombreUsuario=nombreUsuario;
        this.idUsuarioHab=idUsHab;
        this.listaRequisitos=[];
    }
    public setIdUsuarioHab(value:number): void{
        this.idUsuarioHab=value;
    }
    public setListaRequisitos(value): void{
        this.listaRequisitos=value;
    }
    public getIdUsuario(): number {
        return this.idPostulante;
    }
    public getIdConv(): number{
        return this.idConv;
    }
    public getListaRequisitos(): Requisito[]{
        return this.listaRequisitos;
    }
    public setLdUsuario(idUsuario): void {
        this.idPostulante = idUsuario;
    }
    public getCodigoSis(): number {
        return this.codigoSis;
    }

    public setCodigoSis(value): void {
        this.codigoSis = value;
    }
    public getNombreCompleto(): string{
        return this.nombreCompleto;
    }
    public setNombreCompleto(value): void{
        this.nombreCompleto=value;
    }
    public getNombreUsuario(): string{
        return this.nombreUsuario;
    }
    public setNombreUsuario(value): void{
        this.nombreUsuario=value;
    }
    public getEstado(): string {
        return this.estado;
    }
    public setEstado(value: string):void {
        this.estado = value;
    }
}
