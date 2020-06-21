import { Evento } from '../clases/convocatoria/evento';

export class SeleccionEventos {

    private listaEventosSelecciados: Evento[];
    private listaEventos: object[];
    private listaEventosDisponibles: string[];

    public constructor() {
        this.listaEventosSelecciados = new Array();
    }

    public actualizarListaEventosDisponibles(): void {
        this.listaEventosDisponibles = new Array();
        for (let i in this.listaEventos) {
            let objAux: any = this.listaEventos[i];
            if (!objAux.seleccionado) {
                this.listaEventosDisponibles.push(objAux.nombre);
            }
        }
    }

    public agregarEvento(evento: Evento): string {
        let res: string;
        if (this.esValido(evento)) {
            if (!this.existeEvento(evento)) {
                evento.convertirseString();
                this.listaEventosSelecciados.push(evento);
                res = "exito";
            } else {
                res = "ya existe un evento con el mismo nombre";
            }
        } else {
            res = "la fecha ingresada debe ser superior al ultimo evento";
        }
        return res;
    }

    private existeEvento(evento: Evento): boolean {
        let existe: boolean = false;
        for (let i in this.listaEventosSelecciados) {
            if (this.listaEventosSelecciados[i].getNombre() == evento.getNombre()) {
                existe = true;
                break;
            }
        }
        return existe;
    }

    private esValido(evento: Evento): boolean {
        let res: boolean = false;
        if (this.listaEventosSelecciados.length === 0) {
            evento.setFechaIni(evento.getFechaFin());
            res = true;
        } else {
            let eventoAux = this.listaEventosSelecciados[this.listaEventosSelecciados.length - 1];
            if (evento.getFechaFin() >= eventoAux.getFechaFin()) {
                evento.setFechaIni(eventoAux.getFechaFin());
                res = true;
            }
        }
        return res;
    }

    public getListaEventosDisponibles(): string[] {
        return this.listaEventosDisponibles;
    }

    public getListaEventosSeleccionados(): Evento[] {
        return this.listaEventosSelecciados;
    }

    private deshabilitarEvento(nombreEv): void {
        for (let i in this.listaEventos) {
            let objAux: any = this.listaEventos[i];
            if (objAux.nombre == nombreEv) {
                objAux.seleccionado = true;
            }
        }
        this.actualizarListaEventosDisponibles();
    }

    public convertirEventosBD(): void {
        for (let i in this.listaEventosSelecciados) {
            this.listaEventosSelecciados[i].convertirseString();
        }
    }

}