export class Produccion {
    private idConv: number;
    private idPos: number;
    private tituloDocumento: string;
    private tipoDifusion: string;
    private medioPublicacion: string;
    private institucionEntrega: string;
    private fechaCoclusion: Date;
    private fechaCoclusionS: string;

    public constructor(tituloDocumento: string,tipoDifusion: string,medioPublicacion: string,institucionEntrega: string,fechaCoclusion: Date) {
        this.idConv=parseInt(localStorage.getItem("idConv"));
        let datos=JSON.parse(localStorage.getItem("postulante"));
        this.idPos=datos.idPostulante;
        this.fechaCoclusionS="";
        this.tipoDifusion=tipoDifusion;
        this.tituloDocumento=tituloDocumento;
        this.medioPublicacion=medioPublicacion;
        this.institucionEntrega=institucionEntrega;
        this.fechaCoclusion=fechaCoclusion;
     }

    public getTituloDocumento(): string {
        return this.tituloDocumento;
    }
    public setTituloDocumento(value: string) {
        this.tituloDocumento = value;
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
