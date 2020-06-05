export class Evento{
    private idConv:number;
    private nombre:String;
    private fechaIni:Date;
    private fechaFin:Date;
    private horaIni:String;
    private horaFin:String;
    private fechaIniString:String;
    private fechaFinString:String;
    public constructor(nombre,fecha,horaFin="",horaIni=""){
        this.nombre=nombre;
        this.construirFecha(fecha);
        this.horaFin=horaFin;
    }
    private construirFecha(fecha:String){
        let aux=fecha.split("/",3);
        this.fechaFin=new Date(aux[2]+"-"+aux[1]+"-"+aux[0]);
    }
    public getNombre(){
        return this.nombre;
    }
    public getFechaIni(){
        return this.fechaIni;
    }
    public getFechaFin(){
        return this.fechaFin;
    }
    public getHoraIni(){
        return this.horaIni;
    }
    public getHoraFin(){
        return this.horaFin;
    }
    public getFecha():String{
        return this.fechaFin.toLocaleString().split(" ")[0];
    }
    public setFechaIni(nFecha){
        this.fechaIni=nFecha;
    }
    public setFechaFin(nFecha){
        this.fechaFin=nFecha;
    }
    public convertirseString(){
        let fechaF=this.fechaFin.toLocaleString().split(" ")[0];
        let fechaI=this.fechaIni.toLocaleString().split(" ")[0];
        let aux=fechaF.split("/",3);
        this.fechaFinString=aux[2]+"-"+aux[1]+"-"+aux[0];
        aux=fechaI.split("/",3);
        this.fechaFinString=aux[2]+"-"+aux[1]+"-"+aux[0];
    }
    public setIdLanzConv(nIdLanzConv){
        this.idConv=nIdLanzConv;
    }
}