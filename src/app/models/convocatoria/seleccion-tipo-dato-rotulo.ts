import { DatoRotulo } from '../clases/convocatoria/dato-rotulo';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';

export class SeleccionTipoDatoRotulo {
    private listaTiposDatosRotulo: DatoRotulo[];
    private tiposDatosRotulo:object[];
    public constructor(listaTipos:object[]) {
        this.listaTiposDatosRotulo = new Array();
        this.tiposDatosRotulo=listaTipos;
        this.cargarListaTiposDatosRotulo();
    }

    private cargarListaTiposDatosRotulo():void{
        /*for(let i in this.tiposDatosRotulo){
            let objAux:any=this.tiposDatosRotulo[i]; 
            let tipoDato:DatoRotulo=new DatoRotulo(objAux.nombre,objAux.seleccionado);
            tipoDato.setIdDato(objAux.idTipo);
            this.listaTiposDatosRotulo.push(tipoDato);
        }*/
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