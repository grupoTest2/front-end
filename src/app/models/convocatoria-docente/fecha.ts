export class Fecha {
    private evento: String;
    private fecha: Date;
    private descripcion:String;
    public constructor(evento: String, fecha: Date, descripcion: String) {
        this.fecha = fecha;
        this.evento = evento;
        this.descripcion = descripcion;
    }
    public getFecha(): Date {
        return this.fecha;
    }
    public getEvento(): String {
        return this.evento;
    }
    public getDescripcion() {
        return this.descripcion
    }
}
