import { TipoEvaluacion } from './tipo-de-evaluacion';

export class Tematica{
    private idTematica:number;
    private nombre: string;
    private porcentaje:number;
    private seleccionado:boolean;
    private tiposEvaluacion: TipoEvaluacion[];
    private accion: string;

    public constructor(idTematica:number, nombre:string,porcentaje:number=0,tiposEvaluacion:TipoEvaluacion[]=[]){
        this.idTematica=idTematica;
        this.nombre=nombre;
        this.porcentaje=porcentaje;
        this.seleccionado=false;
        this.tiposEvaluacion=tiposEvaluacion;
        this.accion="nada";
    }

    public getIdTematica():number{
        return this.idTematica;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public getPorcentaje(): number{
        return this.porcentaje;
    }

    public getSeleccionado(): boolean{
        return this.seleccionado;
    }
    public setSeleccionado(bandera:boolean):void{
       this.seleccionado=bandera;
    }

    public getTiposEvaluacion(): TipoEvaluacion[]{
        return this.tiposEvaluacion;
    }

    public getAccion(): string{
        return this.accion;
    }

    public setTiposEvaluacion(tiposEvaluacion:TipoEvaluacion[]): void{
        this.tiposEvaluacion=tiposEvaluacion;
    }

    public setAccion(accion): void{
        this.accion=accion;
    }

    public agregarTipoEvaluacion(tipoEv:TipoEvaluacion):void{
        this.tiposEvaluacion.push(tipoEv);
    }


}