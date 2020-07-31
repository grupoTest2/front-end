export class FormacionAcademica {
    private idConv: number;
    private idPos: number;
    private grado: string;
    private titulo: string;
    private institucionObtuvoGrado: string;
    private lugarObtuvoGrado: string;
    private fechaObtuvoGrado: Date;
    private fechaObtuvoGradoS:string; 
    constructor(grado:string,titulo:string,institucionObtuvoGrado:string,lugarObtuvoGrado:string,fechaObtuvoGrado:Date){
        this.idConv=parseInt(localStorage.getItem("idConv"));
        let datos=JSON.parse(localStorage.getItem("postulante"));
        this.idPos=datos.idPostulante;
        this.fechaObtuvoGradoS="";
        this.grado=grado;
        this.titulo=titulo;
        this.institucionObtuvoGrado=institucionObtuvoGrado;
        this.lugarObtuvoGrado=lugarObtuvoGrado;
        this.fechaObtuvoGrado=fechaObtuvoGrado;
    }

    public getGrado(): string {
        return this.grado;
    }
    public setGrado(value: string) :void{
        this.grado = value;
    }
    public getTitulo(): string {
        return this.titulo;
    }
    public setTitulo(value: string):void {
        this.titulo = value;
    }
    public getInstitucionObtuvoGrado(): string {
        return this.institucionObtuvoGrado;
    }
    public setInstitucionObtuvoGrado(value: string):void {
        this.institucionObtuvoGrado = value;
    }

    public getLugarObtuvoGrado(): string {
        return this.lugarObtuvoGrado;
    }
    public setLugarObtuvoGrado(value: string) :void{
        this.lugarObtuvoGrado = value;
    }
    public getFechaObtuvoGrado(): Date {
        return this.fechaObtuvoGrado;
    }
    public setFechaObtuvoGrado(value: Date) :void{
        this.fechaObtuvoGrado = value;
    }
}