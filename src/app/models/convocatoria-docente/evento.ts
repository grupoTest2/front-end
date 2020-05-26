export class Evento{
    private idLanzConv:number;
    private nombre:String;
    private fechaIni:String;
    private fechaFin:String;
    private horaIni:String;
    private horaFin:String;

    public constructor(nombre,fechaIni,fechaFin,horaIni=" ",horaFin=" "){
        this.nombre=nombre;
        this.fechaIni=fechaIni;
        this.fechaFin=fechaFin;
        this.horaIni=horaIni;
        this.fechaFin=horaFin;
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
    public setIdLanzConv(nIdLanzConv){
        this.idLanzConv=nIdLanzConv;
    }
}