import { Usuario } from './usuario';
import { TipoComision } from './tipo-comision';
import { UsuarioComision } from './usuario-comision';

export class Comision {
    private idConv: number;
    private idComision: number;
    private idTipoComision: number;
    private listaUsuarios: UsuarioComision[];

	constructor(idTipoComision: number,listaUsuarios:UsuarioComision[]=[],idComision: number=-1) {
        this.idConv= parseInt(localStorage.getItem("idConv"));
        this.idTipoComision=idTipoComision;
        this.listaUsuarios=listaUsuarios;
        this.idComision=idComision;
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

}
