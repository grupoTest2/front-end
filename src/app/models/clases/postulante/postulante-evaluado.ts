import { Usuario } from '../comision/usuario';
export class PostulanteEvaluado {
    private idPostulante: number;
    private codigoSis: number;
    private nombres: string;
    private apellidoPaterno: string;
    private apellidoMaterno: string;
    private estado: string;
    private evaluador: Usuario;
    constructor(idUsuario: number, codigoSis:number,nombres:string, apellidoPaterno: string, apellidoMaterno: string,estado:string,evaluador:Usuario) {
        this.idPostulante = idUsuario;
        this.codigoSis=codigoSis;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.estado=estado;
        this.evaluador=evaluador;
    }

    public getIdUsuario(): number {
        return this.idPostulante;
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
    public getNombres(): string {
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
    }
    public getEstado(): string {
        return this.estado;
    }
    public setEstado(value: string) {
        this.estado = value;
    }
    public getEvaluador(): Usuario {
        return this.evaluador;
    }
    public setEvaluador(value: Usuario) {
        this.evaluador = value;
    }


}
