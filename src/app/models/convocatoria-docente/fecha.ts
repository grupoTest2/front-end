export class Fecha{
    private evento:String;
    private fecha:Date;

    public constructor(evento:String, fecha:Date){
        this.fecha=fecha;
        this.evento=evento;
    }
    public getFecha():Date{
        return this.fecha;
    }
    public getEvento():String{
        return this.evento;
    }    

}
