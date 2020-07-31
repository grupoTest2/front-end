import { Idioma } from './datos-idiomas';
export class DatosPersonales {
    private idEstudiante: number;
    private idConv: number;
    private idPos: number;
    private nombreUsuario: string;//
    private apellidoPaterno: string;//
    private apellidoMaterno: string;//
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
    private fechaTituloBachillerato: Date;
    private carrera: string;
    private egresado: boolean;
    private fechaEgreso: Date;
    private fechaEgresoS: string;
    private nivelEnCurso: string;
    private idiomas: Idioma[];
        public constructor(apellidoPaterno: string,apellidoMaterno: string,nombreUsuario: string,fechaNacimiento: Date,lugarNacimiento: string,celulaIdentidad: string,lugarEmisionCI: string,nacionalidad: string,genero: string,estadoCivil: string,domicilioCalle: string,domicilioNumero: string,telefono: number,correo: string,nombreColegio: string,tipoColegio: string,fechaTituloBachillerato: Date,carrera: string, nivelEnCurso: string) { 
        this.idConv=parseInt(localStorage.getItem("idConv"));
        let datos=JSON.parse(localStorage.getItem("postulante"));
        this.idPos=datos.idPostulante;
        this.apellidoPaterno=apellidoPaterno;
        this.apellidoMaterno=apellidoMaterno;
        this.nombreUsuario=nombreUsuario;
        this.fechaNacimiento=fechaNacimiento;
        this.lugarNacimiento=lugarNacimiento;
        this.celulaIdentidad=celulaIdentidad;
        this.lugarEmisionCI=lugarEmisionCI;
        this.nacionalidad=nacionalidad;
        this.genero=genero;
        this.estadoCivil=estadoCivil;
        this.domicilioCalle=domicilioCalle;
        this.domicilioNumero=domicilioNumero;
        this.telefono=telefono;
        this.correo=correo;
        this.nombreColegio=nombreColegio;
        this.tipoColegio=tipoColegio;
        this.fechaTituloBachillerato=fechaTituloBachillerato;
        this.carrera=carrera;
        this.nivelEnCurso=nivelEnCurso;
        this.idiomas=[];
    }

    public getIdiomas(): Idioma[] {

        if(this.idiomas==undefined){
              this.idiomas=[];
        }
        return this.idiomas;
    }
    public setIdiomas(value: Idioma[]):void {
        this.idiomas = value;
    }

    public getIdEstudiante(): number {
        return this.idEstudiante;
    }

    public setIdEstudiante(id: number): void {
        this.idEstudiante = id;
    }
    public getIdConvocatoria(): number {
        return this.idConv;
    }

    public setIdConvocatoria(id: number): void {
        this.idConv = id;
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

    public setLugarEmisionCI(value: string):void {
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
    public setCorreo(value: string) :void{
        this.correo = value;
    }
    public getNombreColegio(): string {
        return this.nombreColegio;
    }
    public setNombreColegio(value: string) :void{
        this.nombreColegio = value;
    }
    public getTipoColegio(): string {
        return this.tipoColegio;
    }
    public setTipoColegio(value: string):void {
        this.tipoColegio = value;
    }

    public getFechaTituloBachillerato(): Date {
        return this.fechaTituloBachillerato;
    }
    
    public getCarrera(): string {
        return this.carrera;
    }
    public setCarrera(value: string):void {
        this.carrera = value;
    }
    public getEgresado(): boolean {
        return this.egresado;
    }
    public setEgresado(value: boolean):void {
        this.egresado = value;
    }

    public getFechaEgreso(): Date {
        return this.fechaEgreso;
    }
    public setFechaEgreso(value: Date):void {
        this.fechaEgreso = value;
        const fechaN = this.fechaEgreso.toLocaleString().split(' ')[0];
        let aux = fechaN.split('/', 3);
        this.fechaEgresoS = aux[2] + '-' + aux[1] + '-' + aux[0];
    }
    public getNivelEnCurso(): string {
        return this.nivelEnCurso;
    }
    
    public setNivelCurso(value: string):void {
        this.nivelEnCurso = value;
    }
}