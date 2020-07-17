import { DatoRotulo } from '../clases/convocatoria/dato-rotulo';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { TipoDatoRotulo } from '../clases/convocatoria/tipo-dato-rotulo';

export class SeleccionTipoDatoRotulo {
    private listaTiposDatosRotulo: DatoRotulo[];
    private tiposDatosRotulo:object[];
    public constructor(listaTipos:object[]) {       this.listaTiposDatosRotulo = new Array();
        this.tiposDatosRotulo=listaTipos;
        this.cargarListaTiposDatosRotulo();
    }

    private cargarListaTiposDatosRotulo():void{
        for(let i in this.tiposDatosRotulo){
            let objAux:any=this.tiposDatosRotulo[i];
            let tipoAux=objAux.tipoDatoRotulo;
            let tipoDato:TipoDatoRotulo= new TipoDatoRotulo(tipoAux.nombre,tipoAux.tipoDato,tipoAux.minimo); 
            let datoRotulo:DatoRotulo=new DatoRotulo(objAux.idTipo,tipoDato);
            this.listaTiposDatosRotulo.push(datoRotulo);
        }
    }

    public getListaTiposDatosRotulo():DatoRotulo[]{
        return this.listaTiposDatosRotulo;
    }

    public setDatoRotulo(idDato:number){
        for(let i in this.listaTiposDatosRotulo){
            if(this.listaTiposDatosRotulo[i].getIdDato()===idDato){
                this.listaTiposDatosRotulo[i].setEnLista(true);
                break;
            }
        }
    }

 
    public estaHabilitado(): string{
        let res: string;
        let banderaCod: boolean=false;
        let banderaNombre: boolean=false;
        let banderaAp: boolean=false;
        let banderaAm: boolean=false;
        for(let i in this.listaTiposDatosRotulo){
            if(this.listaTiposDatosRotulo[i].getEnLista()){
                if(this.listaTiposDatosRotulo[i].getNombreTipoDato()=="codigo_sis"){
                    banderaCod=true; 
                 }
                if(this.listaTiposDatosRotulo[i].getNombreTipoDato()=="nombre"){
                   banderaNombre=true; 
                }
                if(this.listaTiposDatosRotulo[i].getNombreTipoDato()=="apellido_paterno"){
                    banderaAp=true; 
                }
                if(this.listaTiposDatosRotulo[i].getNombreTipoDato()=="apellido_materno"){
                    banderaAm=true; 
                }
            }
        }
        if(banderaNombre&&banderaAp&&banderaAm&&banderaCod){
            res="bien";
        }else{
            res="seleccionar los datos: "
            if(!banderaNombre){
                res+="nombre ";
            }
            if(!banderaAp){
                res+="apellido_parterno ";
            }
            if(!banderaAm){
                res+="apellido_materno";
            }
            if(!banderaCod){
                res+="codigo_sis";
            }
        }
        return res;
    }
}