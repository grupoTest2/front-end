export class CalificacionConocimiento {
    private descripcion: String;
    private porcentaje: number;
    public constructor(descripcion: String, porcentaje: number) {
        this.descripcion = descripcion;
        this.porcentaje = porcentaje;
    }
    public getDescripcion() {
        return this.descripcion;
    }
    public getPorcentaje() {
        return this.porcentaje;
    }

}
