import { TipoDatoRotulo } from '../clases/convocatoria/tipo-dato-rotulo';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';

export class SeleccionTipoDatoRotulo {
    private listaTiposDatosRotulo: TipoDatoRotulo[];
    private tiposDatosRotulo:object[];
    public constructor(listaTipos:object[]) {
        this.listaTiposDatosRotulo = new Array();
        this.tiposDatosRotulo=listaTipos;
        this.cargarListaTiposDatosRotulo();
    }

    private cargarListaTiposDatosRotulo():void{
        for(let i in this.tiposDatosRotulo){
            let objAux:any=this.tiposDatosRotulo[i]; 
            let tipoDato:TipoDatoRotulo=new TipoDatoRotulo(objAux.nombre,objAux.seleccionado);
            tipoDato.setIdDato(objAux.idTipo);
            this.listaTiposDatosRotulo.push(tipoDato);
        }
    }

    public getListaTiposDatosRotulo():TipoDatoRotulo[]{
        return this.listaTiposDatosRotulo;
    }

    public setDatoRotulo(nombreDato:string){
        for(let i in this.listaTiposDatosRotulo){
            if(this.listaTiposDatosRotulo[i].getNombre()===nombreDato){
                this.listaTiposDatosRotulo[i].setEnLista(true);
                this.listaTiposDatosRotulo[i].setSeleccionado(true);
                break;
            }
        }
    }
}