import { DatoRotulo } from '../clases/convocatoria/dato-rotulo';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';
import { TipoDatoRotulo } from '../clases/convocatoria/tipo-dato-rotulo';

export class SeleccionTipoDatoRotulo {
    private listaTiposDatosRotulo: DatoRotulo[];
    private tiposDatosRotulo:object[];
    public constructor(listaTipos:object[]) {
        this.listaTiposDatosRotulo = new Array();
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

    public setDatoRotulo(nombreDato:string){
/*        for(let i in this.listaTiposDatosRotulo){
            if(this.listaTiposDatosRotulo[i].getNombre()===nombreDato){
                this.listaTiposDatosRotulo[i].setEnLista(true);
                break;
            }
        }*/
    }

    public estaHabilitado(){
        let res: boolean=false;
       /* for(let i in this.listaTiposDatosRotulo){
            if(this.listaTiposDatosRotulo[i].getNombre()=="Nombre"||this.listaTiposDatosRotulo[i].getNombre()=="Apellido"){
                if(this.listaTiposDatosRotulo[i].getEnLista()){
                    res=true;
                }else{
                    res=false;
                    break;
                }
            }
        }*/
        return res;
    }
    public cantDatosEnLista(): number{
        let cont: number=0;
        for(let i in this.listaTiposDatosRotulo){
            if(this.listaTiposDatosRotulo[i].getEnLista()){
                cont++;
            }
        }
        return cont;
    }
}