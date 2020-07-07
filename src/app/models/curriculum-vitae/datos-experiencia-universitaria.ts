export class ExperienciaUniversitaria {

    private tipoDeGestion: string;
    private facultad: string;
    private carrera: string;
    private materia: string;
    private cargaHoraria: number;
    private _titular: boolean;
    private fechaInicio: Date;
    private fechaFin: Date;

    constructor(){}

    public getTipoDeGestion(): string {
        return this.tipoDeGestion;
    }
    public setTipoDeGestion(value: string) {
        this.tipoDeGestion = value;
    }
    public getFacultad(): string {
        return this.facultad;
    }
    public setFacultad(value: string) {
        this.facultad = value;
    }
    public getCarrera(): string {
        return this.carrera;
    }
    public setCarrera(value: string) {
        this.carrera = value;
    }
    public getMateria(): string {
        return this.materia;
    }
    public setMateria(value: string) {
        this.materia = value;
    }
    public getCargaHoraria(): number {
        return this.cargaHoraria;
    }
    public setCargaHoraria(value: number) {
        this.cargaHoraria = value;
    }    public get titular(): boolean {
        return this._titular;
    }
    public set titular(value: boolean) {
        this._titular = value;
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