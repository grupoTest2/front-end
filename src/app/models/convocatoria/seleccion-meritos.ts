import { Merito } from '../clases/convocatoria/merito';

export class SeleccionMerito {

    private tablaMeritos: Merito[];

    public constructor() {
        this.tablaMeritos = new Array();
    }

    public agregarMerito(merito: Merito): string {
        let res: string;
        if (this.getPorcentajeDisponible() >= merito.getPorcentaje()) {
            if (!this.existeMerito(merito)) {
                this.tablaMeritos.push(merito);
                res = "exito";
            } else {
                res = "ya existe un merito con el mismo nombre";
            }
        } else {
            res = "el porcentaje debe ser menor o igual a" + this.getPorcentajeDisponible();
        }
        return res;
    }

    public agregarSubMerito(merito: Merito, i: number): string {
        let subMerito: Merito = this.tablaMeritos[i];
        return subMerito.agregarMerito(merito);
    }

    public agregarSubSubMerito(merito: Merito, i: number, j: number): string {
        let subMerito: Merito = this.tablaMeritos[i];
        let subLista = subMerito.getListaMeritos();
        let subSubMerito: Merito = subLista[j];
        return subSubMerito.agregarMerito(merito);
    }

    private existeMerito(merito: Merito): boolean{
        let existe: boolean = false;
        for (let i in this.tablaMeritos) {
            if (this.tablaMeritos[i].getTitulo() == merito.getTitulo()) {
                existe = true;
                break;
            }
        }
        return existe;
    }
    
    public getPorcentajeDisponible(): number {
        let suma: number = 0;
        for (let i in this.tablaMeritos) {
            let objaux = this.tablaMeritos[i];
            suma += objaux.getPorcentaje();
        }
        return 100 - suma;
    }

    public getTablaMeritos(): Merito[] {
        return this.tablaMeritos;
    }

    public setIdLanzamientoConv(idLanzConv): void {
        for (let i in this.tablaMeritos) {
            let objAux = this.tablaMeritos[i];
            objAux.setLanzConv(idLanzConv);
            let listaSubMeritos = objAux.getListaMeritos();
            for (let j in listaSubMeritos) {
                let objAux2 = listaSubMeritos[j];
                objAux2.setLanzConv(idLanzConv);
                let listaSubMeritos2 = objAux2.getListaMeritos();
                for (let k in listaSubMeritos2) {
                    let objAux3 = listaSubMeritos2[k];
                    objAux3.setLanzConv(idLanzConv);
                }
            }
        }
    }

    public getSubSubMeritos(i: number, j: number): Merito[] {
        return this.tablaMeritos[i].getListaMeritos()[j].getListaMeritos();
    }
}
