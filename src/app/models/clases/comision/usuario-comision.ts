import { Tematica } from '../convocatoria/tematica';
import { TipoUsuario } from './tipo-usuario';

export class UsuarioComision{
    private idUsuario: number;
    private idTipoUsuario: number;
    private accion: string;
    private listaTematicas:Tematica[];
    constructor(idUsuario: number, accion: string,idTipoUsuario:number,listaTematicas:Tematica[]=[]) {
        this.idUsuario = idUsuario;
        this.accion=accion;
        this.idTipoUsuario=idTipoUsuario;
        this.listaTematicas=listaTematicas;
    }
   
    public setListaTematica(lista:Tematica[]): void{
        this.listaTematicas=lista;
    }
    public getListaTematica(): Tematica []{
        return this.listaTematicas;
    }

    public setIdTipoUsuario(idTipoUsuario: number): void{
        this.idTipoUsuario=idTipoUsuario;
    }
    public getIdTipoUsuario(): number{
        return this.idTipoUsuario;
    }

    public getIdUsuario(): number {
        return this.idUsuario;
    }

    public setLdUsuario(idUsuario): void {
        this.idUsuario = idUsuario;
    }

    public getAccion(): string{
        return this.accion;
    }
    public setAccion(accion): void{
        this.accion=accion;
    }
    public existeTematica(idTematica):boolean{
        let res:boolean=false;
        for(let i=0;i<this.listaTematicas.length&&!res;i++){
            res= this.listaTematicas[i].getIdTematica()==idTematica;
        }
        return res;
    }
    public getNombreTipoUsuario(listaTiposUsuario:TipoUsuario[]): string{
        let res:string="";
        for(let i=0;i<listaTiposUsuario.length;i++){
            if(listaTiposUsuario[i].getIdTipoUsuario()===this.idTipoUsuario){
                res=listaTiposUsuario[i].getNombre()
                break;
            }
        }
        return res;
    }

}