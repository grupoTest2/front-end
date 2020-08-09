export class Usuario {
    private idUsuario: number;
    private nombres: string;
    private apellidoPaterno: string;
    private apellidoMaterno: string;
    private telefono: number;
    private usuario: string;
    private correo:string;
    private seleccionado:boolean;
    private ocupacion:string;

    constructor(idUsuario: number, nombres: string, apellidoPaterno: string, apellidoMaterno: string, correo:string, ocupacion:string="") {
        this.idUsuario = idUsuario;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.correo=correo;
        this.seleccionado=false;
        this.ocupacion=ocupacion;
    }

    public getOcupacion(): string {
        return this.ocupacion;
    }

    public setOcupacion(value: string): void {
        this.ocupacion=value;
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
    
    public getCorreo(): string{
        return this.correo;
    }

    public getSeleccionado(): boolean {
        return this.seleccionado;
    }

    public setSeleccionado(value: boolean): void {
        this.seleccionado = value;
    }

}
