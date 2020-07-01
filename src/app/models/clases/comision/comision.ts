import { Usuario } from './usuario';
import { TipoComision } from './tipo-comision';
import { UsuarioComision } from './usuario-comision';

export class Comision {
    private idConv: number;
    private idTipoComision: number;
    private listaUsuarios: UsuarioComision[];

	constructor(idTipoComision: number,listaUsuarios:UsuarioComision[]=[]) {
        this.idConv= parseInt(localStorage.getItem("idConv"));
        this.idTipoComision=idTipoComision;
        this.listaUsuarios=listaUsuarios;
	}

    public getListaUsuarios(): UsuarioComision[] {
        return this.listaUsuarios;
    }

    public setListaUsuarios(value: UsuarioComision[]) {
        this.listaUsuarios = value;
    }

    public getIdTipoComision(): number {
        return this.idTipoComision;
    }

    public setTipoComision(value: number) {
        this.idTipoComision = value;
    }

    public getIdConv(): number{
        return this.idConv;
    }

    public agregarUsuarioComision(usuario: UsuarioComision){
        this.listaUsuarios.push(usuario);
    }
    public existeUsuario(idUsuario):boolean{
        let res:boolean=false;
        for(let i in this.listaUsuarios){
            let objAux:UsuarioComision=this.listaUsuarios[i];
            if(objAux.getIdUsuario()===idUsuario){
                res=true;
                break;
            }

        }
        return res;
    }
}
