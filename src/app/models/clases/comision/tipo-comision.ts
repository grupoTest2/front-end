import { TipoUsuario } from './tipo-usuario';

export class TipoComision{
    private idTipoComision: number;
    private nombre: string;
    private listaTipoUsuario: TipoUsuario[];
    public constructor(idTipoComision: number, nombre: string,listaTipoUsuario:TipoUsuario[]=[]){
        this.idTipoComision=idTipoComision;
        this.nombre=nombre;
        this.listaTipoUsuario=listaTipoUsuario;
    }

    public getIdTipoComision(): number{
        return this.idTipoComision;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public getListaTipoUsuario(): TipoUsuario[]{
        return this.listaTipoUsuario;
    }
    
    public getNombreTipoUsuario(idTipoUsuario:number):string{
        let res="";
        for(let i in this.listaTipoUsuario){
            if(this.listaTipoUsuario[i].getIdTipoUsuario()==idTipoUsuario){
                res=this.listaTipoUsuario[i].getNombre();
            }
        }
        return res;
    }
    
    public setListaTipoUsuario(listaTipoUsuario:TipoUsuario[]): void{
        this.listaTipoUsuario=listaTipoUsuario;
    }
}