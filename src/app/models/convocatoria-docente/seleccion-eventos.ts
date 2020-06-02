import { Evento } from './evento';

export class SeleccionEventos{
    private listaEventosSelecciados:Evento[];//seleccionados
    private listaEventos:Object[];//
    private listaEventosDisponibles:String[];//extridsos de la bd

    public constructor(){
        this.listaEventosSelecciados=new Array();
        //this.listaEventos=listaE;
        //this.actualizarListaEventosDisponibles();
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
        let res:boolean=false;
        if(this.esValido(evento)){
            this.listaEventosSelecciados.push(evento);
            res=true;
        }
        return res;
    }
    private esValido(evento:Evento):boolean{
        let res:boolean=false;
        if(this.listaEventosSelecciados.length==0){
            evento.setFechaIni(evento.getFechaFin());
            res=true;
        }else{
            let eventoAux=this.listaEventosSelecciados[this.listaEventosSelecciados.length-1];
            if(evento.getFechaFin()>=eventoAux.getFechaFin()&&evento.getNombre()!=eventoAux.getNombre()){
                evento.setFechaIni(eventoAux.getFechaFin());
                res=true;
            }
        }
        return res;    
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
    public convertirEventosBD(){
        for(let i in this.listaEventosSelecciados){
            this.listaEventosSelecciados[i].convertirseString();
        }
    }

}