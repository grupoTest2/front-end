export class ExperienciaExtraUniversitaria {

    private nombreInstitucionEmpresa: string;
    private nombreCargoActividad: string;
    private lugar: string;
    private duracion: string;
    private fechaInicio: Date;
    private fechaFin: Date;

    constructor(){}

    public getNombreInstitucionEmpresa(): string {
        return this.nombreInstitucionEmpresa;
    }
    public setNombreInstitucionEmpresa(value: string) {
        this.nombreInstitucionEmpresa = value;
    }
    public getNombreCargoActividad(): string {
        return this.nombreCargoActividad;
    }
    public setNombreCargoActividad(value: string) {
        this.nombreCargoActividad = value;
    }
    public getLugar(): string {
        return this.lugar;
    }
    public setLugar(value: string) {
        this.lugar = value;
    }
    public getDuracion(): string {
        return this.duracion;
    }
    public setDuracion(value: string) {
        this.duracion = value;
    }
    public getFechaInicio(): Date {
        return this.fechaInicio;
    }
    public setFechaInicio(value: Date) {
        this.fechaInicio = value;
    }
    public getFechaFin(): Date {
        return this.fechaFin;
    }
    public setFechaFin(value: Date) {
        this.fechaFin = value;
    }

}