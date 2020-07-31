export class ExperienciaUniversitaria {
    private idConv: number;
    private idPos: number;
    private tipoDeGestion: string;
    private facultad: string;
    private carrera: string;
    private materia: string;
    private cargaHoraria: number;
    private titular: boolean;
    private fechaInicio: Date;
    private fechaInicioS: string;
    private fechaFin: Date;
    private fechaFinS: string;

    constructor(tipoDeGestion: string, facultad: string, carrera: string, materia: string, cargaHoraria: number, titular: boolean, fechaInicio: Date, fechaFin: Date) {
        this.idConv=parseInt(localStorage.getItem("idConv"));
        let datos=JSON.parse(localStorage.getItem("postulante"));
        this.idPos=datos.idPostulante;
        this.fechaInicioS="";
        this.fechaFinS="";
        this.tipoDeGestion = tipoDeGestion;
        this.facultad = facultad;
        this.carrera = carrera;
        this.materia = materia;
        this.cargaHoraria = cargaHoraria;
        this.titular = titular;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public getTipoDeGestion(): string {
        return this.tipoDeGestion;
    }
    public setTipoDeGestion(value: string):void {
        this.tipoDeGestion = value;
    }
    public getFacultad(): string {
        return this.facultad;
    }
    public setFacultad(value: string) :void{
        this.facultad = value;
    }
    public getCarrera(): string {
        return this.carrera;
    }
    public setCarrera(value: string) :void{
        this.carrera = value;
    }
    public getMateria(): string {
        return this.materia;
    }
    public setMateria(value: string) :void{
        this.materia = value;
    }
    public getCargaHoraria(): number {
        return this.cargaHoraria;
    }
    public setCargaHoraria(value: number):void {
        this.cargaHoraria = value;
    } public getTitular(): boolean {
        return this.titular;
    }
    public seTitular(value: boolean) :void{
        this.titular = value;
    }
    public getFechaInicio(): Date {
        return this.fechaInicio;
    }
    public setFechaInicio(value: Date):void {
        this.fechaInicio = value;
    }
    public getFechaFin(): Date {
        return this.fechaFin;
    }
    public setFechaFin(value: Date):void {
        this.fechaFin = value;
    }

}