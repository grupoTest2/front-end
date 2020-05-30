export class Evento{
    private idLanzConv:number;
    private nombre:String;
    private fechaIni:Date;
    private fechaFin:Date;
    private horaIni:String;
    private horaFin:String;

    public constructor(nombre,fechaIni,fechaFin,horaIni=" ",horaFin=" "){
        this.nombre=nombre;
        this.fechaIni=fechaIni;
        this.fechaFin=fechaFin;
        this.horaIni=horaIni;
        this.horaFin=horaFin;
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
        return this.fechaFin.getDay()+"/"+this.fechaFin.getMonth()+"/"+this.fechaFin.getUTCFullYear();
    }
    public setFechaIni(nFecha){
        this.fechaIni=nFecha;
    }
    public setFechaFin(nFecha){
        this.fechaFin=nFecha;
    }
    public setIdLanzConv(nIdLanzConv){
        this.idLanzConv=nIdLanzConv;
    }
}