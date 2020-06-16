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
        }
    }

    public getListaTiposDatosRotulo(){
        return this.listaTiposDatosRotulo;
    }
    /**
     * recuperar los tiposDatoRotulo desde la base de datos cuando se esta editando la convocatoria
     */
    public recuperarTipoDatoRotuloBD() {

    }

}