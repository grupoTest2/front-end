export class EstudiosCursosTomados {
    private tipoDocumento: string;
    private tituloDocumento: string;
    private institucionObtencionDcumento: string;
    private lugarObtencionDocumento: string;
    private fechaDocumento: Date;

    public constructor() { }

    public getTipoDocumento(): string {
        return this.tipoDocumento;
    }
    public setTipoDocumento(value: string) {
        this.tipoDocumento = value;
    }
    public getTituloDocumento(): string {
        return this.tituloDocumento;
    }
    public setTituloDocumento(value: string) {
        this.tituloDocumento = value;
    }
    public getInstitucionObtencionDcumento(): string {
        return this.institucionObtencionDcumento;
    }
    public setInstitucionObtencionDcumento(value: string) {
        this.institucionObtencionDcumento = value;
    }
    public getLugarObtencionDocumento(): string {
        return this.lugarObtencionDocumento;
    }
    public setLugarObtencionDocumento(value: string) {
        this.lugarObtencionDocumento = value;
    }
    public getFechaDocumento(): Date {
        return this.fechaDocumento;
    }
    public setFechaDocumento(value: Date) {
        this.fechaDocumento = value;
    }
}