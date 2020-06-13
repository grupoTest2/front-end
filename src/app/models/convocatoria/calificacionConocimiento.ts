import { Tematica } from '../clases/convocatoria/tematica';

export class CalificacionConocimiento {

    private codigoAxiliarura: string;
    private listaTematicas: Tematica[];

    public constructor(codigoAxiliarura: string, listaTematicas: Tematica[]= []) {
        this.codigoAxiliarura = codigoAxiliarura;
        this.listaTematicas = listaTematicas;
    }

    public getCodigoAxiliarura(): string {
        return this.codigoAxiliarura;
    }

    public setCodigoAxiliarura(value: string) {
        this.codigoAxiliarura = value;
    }

    public getListaTematicas(): Tematica[] {
        return this.listaTematicas;
    }

    public setListaTematicas(value: Tematica[]): void {
        this.listaTematicas = value;
    }

}