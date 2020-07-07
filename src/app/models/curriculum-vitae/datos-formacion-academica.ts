export class FormacionAcademica {
    private grado: string;
    private titulo: string;
    private institucionObtuvoGrado: string;
    private lugarObtuvoGrado: string;
    private fechaObtuvoGrado: Date;
    constructor(){
    }

    public getGrado(): string {
        return this.grado;
    }
    public setGrado(value: string) {
        this.grado = value;
    }
    public getTitulo(): string {
        return this.titulo;
    }
    public setTitulo(value: string) {
        this.titulo = value;
    }
    public getInstitucionObtuvoGrado(): string {
        return this.institucionObtuvoGrado;
    }
    public setInstitucionObtuvoGrado(value: string) {
        this.institucionObtuvoGrado = value;
    }

    public getLugarObtuvoGrado(): string {
        return this.lugarObtuvoGrado;
    }
    public setLugarObtuvoGrado(value: string) {
        this.lugarObtuvoGrado = value;
    }
    public getFechaObtuvoGrado(): Date {
        return this.fechaObtuvoGrado;
    }
    public setFechaObtuvoGrado(value: Date) {
        this.fechaObtuvoGrado = value;
    }
}