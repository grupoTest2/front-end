import { Usuario } from '../usuarios/usuario';

export class Comision {
    private tipoComision: string;
    private listaUsuarios: Usuario[];

	constructor(tipoComision:string,listaUsuarios:Usuario[]=[]) {
        this.tipoComision=tipoComision;
        this.listaUsuarios=listaUsuarios;
	}

    public getListaUsuarios(): Usuario[] {
        return this.listaUsuarios;
    }
    public setListaUsuarios(value: Usuario[]) {
        this.listaUsuarios = value;
    }

    public getTipoComision(): string {
        return this.tipoComision;
    }
    public setTipoComision(value: string) {
        this.tipoComision = value;
    }

}
