import { Evento } from './evento';

export class SeleccionEvento{
    private listaEventosSelecciados:Evento[];
    private listaEventos:Object[];
    private listaEventosDisponibles:String[];

    public constructor(listaE:Object[]){
        this.listaEventosSelecciados=new Array();
        this.listaEventos=listaE;
        this.actualizarListaEventosDisponibles();
    }
    public actualizarListaEventosDisponibles(){
        this.listaEventosDisponibles=new Array();
        for(let i in this.listaEventos){
            let objAux:any=this.listaEventos[i];
            if(!objAux.seleccionado){
                this.listaEventosDisponibles.push(objAux.nombre);
            }
        }
    }
    public agregarEvento(evento:Evento){
        this.listaEventosSelecciados.push(evento);
        this.deshabilitarEvento(evento.getNombre());
    }
    public getListaEventosDisponibles(){
        return this.listaEventosDisponibles;
    }
    public getListaEventosSeleccionados(){
        return this.listaEventosSelecciados;
    }
    private deshabilitarEvento(nombreEv){
        for(let i in this.listaEventos){
            let objAux:any=this.listaEventos[i];
            if(objAux.nombre==nombreEv){
               objAux.seleccionado=true; 
            }
        }
        this.actualizarListaEventosDisponibles();
    }

}