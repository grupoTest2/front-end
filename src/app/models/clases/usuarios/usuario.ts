export class Usuario {
    private idUsuario: number;
    private nombres: string;
    private apellidoPaterno: string;
    private apellidoMaterno: string;
    private telefono: number;
    private usuario: string;

    constructor(idUsuario: number, nombres: string, apllidoPaterno: string, apellidoMaterno: string, telefono: number, ususario: string) {
        this.idUsuario = idUsuario;
        this.nombres = nombres;
        this.apellidoPaterno = this.apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.telefono = telefono;
        this.usuario = this.usuario;
    }

    public getIdUsuario(): number {
        return this.idUsuario;
    }

    public setLdUsuario(idUsuario): void {
        this.idUsuario = idUsuario;
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
    public getTelefono(): number {
        return this.telefono;
    }

    public setTelefono(telefono): void {
        this.telefono = telefono;
    }
    public getUsuario(): string {
        return this.usuario;
    }

    public setUsuario(usuario): void {
        this.usuario = usuario;
    }



}
