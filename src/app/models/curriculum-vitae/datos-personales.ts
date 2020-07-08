import { Idioma } from './datos-idiomas';
export class DatosPesoanles {
    private idEstudiante: number;
    private idConvoactoria: number;
    private nombreUsuario: string;
    private apellidoPaterno: string;
    private apellidoMaterno: string;
    private fechaNacimiento: Date;
    private lugarNacimiento: string;
    private celulaIdentidad: string;
    private lugarEmisionCI: string;
    private nacionalidad: string;
    private genero: string;
    private estadoCivil: string;
    private domicilioCalle: string;
    private domicilioNumero: string;
    private telefono: number;
    private correo: string;
    private nombreColegio: string;
    private tipoColegio: string;
    private fechaTituloBachillerato: string;
    private carrera: string;
    private egresado: boolean;
    private fechaEgreso: Date;
    private nuvelEnCurso: string;
    private idiomas: Idioma[]=[];
    public constructor() { 
        let idioma=new Idioma();
        idioma.setIdioma("español");
        idioma.setHabala("bien");
        idioma.setLee("bien");
        idioma.setEscribe("bien");
        this.idiomas.push(idioma);
    }


    public getIdEstudiante(): number {
        return this.idEstudiante;
    }

    public setIdEstudiante(id: number): void {
        this.idEstudiante = id;
    }
    public getIdConvocatoria(): number {
        return this.idConvoactoria;
    }

    public setIdConvocatoria(id: number): void {
        this.idConvoactoria = id;
    }

    public getNombreUsuario(): string {
        return this.nombreUsuario;
    }

    public setNombreUsuario(nombre: string): void {
        this.nombreUsuario = nombre;
    }

    public getApellidoPaterno(): string {
        return this.apellidoPaterno;
    }

    public setApellidoPaterno(apellido: string): void {
        this.apellidoPaterno = apellido;
    }

    public getApellidoMaterno(): string {
        return this.apellidoMaterno;
    }

    public setApellidoMaterno(apellido: string): void {
        this.apellidoMaterno = apellido;
    }

    public getFechaNacimiento(): Date {
        return this.fechaNacimiento;
    }

    public setFechaNacimiento(fecha: Date): void {
        this.fechaNacimiento = fecha;
    }

    public getLugarNacimiento(): string {
        return this.lugarNacimiento;
    }

    public setLugarNacimiento(lugar: string): void {
        this.lugarNacimiento = lugar;
    }
    public getNacionalidad(): string {
        return this.nacionalidad;
    }
    public getCelulaIdentidad(): string {
        return this.celulaIdentidad;
    }
    public setCelulaIdentidad(value: string) {
        this.celulaIdentidad = value;
    }
    public getLugarEmisionCI(): string {
        return this.lugarEmisionCI;
    }
    public setLugarEmisionCI(value: string) {
        this.lugarEmisionCI = value;
    }

    public setNacionalidad(nacionalidad: string): void {
        this.nacionalidad = nacionalidad;
    }

    public getGenero(): string {
        return this.genero;
    }

    public setGenero(sexo: string): void {
        this.genero = sexo;
    }

    public getEstadoCivil(): string {
        return this.estadoCivil;
    }

    public setEstadoCivil(estadoCivil: string): void {
        this.estadoCivil = estadoCivil;
    }

    public getDomicilioCalle(): string {
        return this.domicilioCalle;
    }

    public setDomicilioCalle(domicilioCalle: string): void {
        this.domicilioCalle = domicilioCalle;
    }

    public getDomicilioNumero(): string {
        return this.domicilioNumero;
    }

    public setDomicilioNumero(domicilioNumero: string): void {
        this.domicilioNumero = domicilioNumero;
    }

    public getTelefono(): number {
        return this.telefono;
    }

    public setTelefono(telefono: number): void {
        this.telefono = telefono;
    }
    public getCorreo(): string {
        return this.correo;
    }
    public setCorreo(value: string) {
        this.correo = value;
    }
    public getNombreColegio(): string {
        return this.nombreColegio;
    }
    public setNombreColegio(value: string) {
        this.nombreColegio = value;
    }
    public getTipoColegio(): string {
        return this.tipoColegio;
    }
    public setTipoColegio(value: string) {
        this.tipoColegio = value;
    }

    public getFechaTituloBachillerato(): string {
        return this.fechaTituloBachillerato;
    }
    public setFechaTituloBachillerato(value: string) {
        this.fechaTituloBachillerato = value;
    }
    public getCarrera(): string {
        return this.carrera;
    }
    public setCarrera(value: string) {
        this.carrera = value;
    }
    public getEgresado(): boolean {
        return this.egresado;
    }
    public setEgresado(value: boolean) {
        this.egresado = value;
    }

    public getFechaEgreso(): Date {
        return this.fechaEgreso;
    }
    public seFechaEgreso(value: Date) {
        this.fechaEgreso = value;
    }
    public getNuvelEnCurso(): string {
        return this.nuvelEnCurso;
    }
    public setNuvelEnCurso(value: string) {
        this.nuvelEnCurso = value;
    }
}