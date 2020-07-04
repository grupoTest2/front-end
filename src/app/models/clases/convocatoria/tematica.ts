import {TipoEvaluacion} from './tipo-de-evaluacion'
export class Tematica {

    private nombre: string;
    private nota: number; //////////////
    private idTematica: number;
    private accion:string;
   
    ///////////////
    private listaTiposEvaluacioin:TipoEvaluacion[];
    private seleccionado:boolean;
    public constructor(nombre: string, nota: number = 0,idTematica: number=-1) {
        this.nombre = nombre;
        this.nota   = nota;
        this.idTematica=idTematica;
        this.accion="nada";
        this.listaTiposEvaluacioin=[];
        this.seleccionado=false;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(value: string): void {
        this.nombre = value;
    }

    public getNota(): number {
        return this.nota;
    }

    public setNota(value: number): void {
        this.nota = value;
    }
    public setAccion(accion: string): void{
        this.accion=accion;
    }
    public setListaTipoEvaluacion(lista: TipoEvaluacion[]): void {
        this.listaTiposEvaluacioin=lista;
    }
    public getListaTipoEvaluacion() :TipoEvaluacion []{
        return this.listaTiposEvaluacioin;
    }
    public getSeleccionado(): boolean {
        return this.seleccionado;
    }

    public setSeleccionado(value: boolean): void {
        this.seleccionado = value;
    }

}
