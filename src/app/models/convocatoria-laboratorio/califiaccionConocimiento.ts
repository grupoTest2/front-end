import { Tematica } from '../clases/crear-convocatoria/tematica';

export class CalifiaccionConocimientoAuxLabo {
    private codigoAxiliarura: String;
    private listaTematicas: Tematica[];
    public constructor(codigoAxiliarura: String, listaTematicas: Tematica[]=[]) {
        this.codigoAxiliarura = codigoAxiliarura;
        this.listaTematicas = listaTematicas;
    }
    public getCodigoAxiliarura(): String {
        return this.codigoAxiliarura;
    }
    public setCodigoAxiliarura(value: String) {
        this.codigoAxiliarura = value;
    }
    public getListaTematicas(): Tematica[] {
        return this.listaTematicas;
    }
    public setListaTematicas(value: Tematica[]) {
        this.listaTematicas = value;
    }

}