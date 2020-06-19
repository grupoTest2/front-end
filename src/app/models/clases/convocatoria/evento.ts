export class Evento{
    private idConv: number;
    private nombre: string;
    private fechaIni: Date;
    private fechaFin: Date;
    private horaIni: string;
    private horaFin: string;
    private fechaIniString: string;
    private fechaFinString: string;

    public constructor(nombre: string, fecha: string, horaFin: string = '', horaIni: string = ''){
        this.idConv =  parseInt(localStorage.getItem("idConv"));
        this.nombre = nombre;
        this.construirFecha(fecha);
        this.horaFin = horaFin;
        this.horaIni= horaIni;
    }

    private construirFecha(fecha: string): void{
        let aux = fecha.split('/', 3);
        this.fechaFin = new Date(aux[2] + '-' + aux[1] + '-' + aux[0]);
    }

    public getNombre(): string{
        return this.nombre;
    }

    public getFechaIni(): Date{
        return this.fechaIni;
    }

    public getFechaFin(): Date{
        return this.fechaFin;
    }

    public getHoraIni(): string{
        return this.horaIni;
    }

    public getHoraFin(): string{
        return this.horaFin;
    }

    public getFecha(): string{
        return this.fechaFin.toLocaleString().split(' ')[0];
    }

    public setFechaIni(nFecha): void{
        this.fechaIni = nFecha;
    }

    public setFechaFin(nFecha): void{
        this.fechaFin = nFecha;
    }

    public convertirseString(): void{
        const fechaF = this.fechaFin.toLocaleString().split(' ')[0];
        const fechaI = this.fechaIni.toLocaleString().split(' ')[0];
        let aux = fechaF.split('/', 3);
        this.fechaFinString = aux[2] + '-' + aux[1] + '-' + aux[0];
        aux = fechaI.split('/', 3);
        this.fechaIniString = aux[2] + '-' + aux[1] + '-' + aux[0];
    }
    public setIdLanzConv(nIdLanzConv: number): void{
        this.idConv = nIdLanzConv;
    }
}