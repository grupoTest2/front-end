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

    /*public getNombres(): string {
        return this.nombres;
    }

    public setNombres(nombres): void {
        this.nombres = nombres;
    }
    public getApellidoPaterno(): string {
        return this.apellidoPaterno;
    }

    public setApellidoPaterno(apellidoPaterno): void {
        this.apellidoPaterno = apellidoPaterno;
    }
    public getApellidoMaterno(): string {
        return this.apellidoMaterno;
    }

    public setApellidoMaterno(apellidoMaterno): void {
        this.apellidoMaterno = apellidoMaterno;
    }*/
    public getEstado(): string {
        return this.estado;
    }
    public setEstado(value: string) {
        this.estado = value;
    }
    /*public getEvaluador(): Usuario {
        return this.evaluador;
    }
    public setEvaluador(value: Usuario) {
        this.evaluador = value;
    }*/


}
