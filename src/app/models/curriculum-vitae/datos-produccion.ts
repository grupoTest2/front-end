export class Produccion {
    private tipoDocumento: string;
    private tipoDifusion: string;
    private medioPublicacion: string;
    private institucionEntrega: string;
    private fechaCoclusion: Date;

    public constructor(tipoDocumento: string,tipoDifusion: string,medioPublicacion: string,institucionEntrega: string,fechaCoclusion: Date) {
        this.tipoDifusion=tipoDocumento;
        this.tipoDocumento=tipoDocumento;
        this.medioPublicacion=medioPublicacion;
        this.institucionEntrega=institucionEntrega;
        this.fechaCoclusion=fechaCoclusion;
     }

    public getTipoDocumento(): string {
        return this.tipoDocumento;
    }
    public setTipoDocumento(value: string) {
        this.tipoDocumento = value;
    }
    public getTipoDifusion(): string {
        return this.tipoDifusion;
    }
    public setTipoDifusion(value: string) {
        this.tipoDifusion = value;
    }
    public getMdioPublicacion(): string {
        return this.medioPublicacion;
    }
    public setMdioPublicacion(value: string) {
        this.medioPublicacion = value;
    }
    public getInstitucionEntrega(): string {
        return this.institucionEntrega;
    }
    public setInstitucionEntrega(value: string) {
        this.institucionEntrega = value;
    }
    public getFechaConclusion(): Date {
        return this.fechaCoclusion;
    }
    public setFechaConclusion(value: Date) {
        this.fechaCoclusion = value;
    }
}
