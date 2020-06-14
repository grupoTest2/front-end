import { TipoDatoRotulo } from '../clases/convocatoria/tipo-dato-rotulo';

export class SeleccionTipoDatoRotulo {
    private listaTiposDatosRotulo: TipoDatoRotulo[];

    public constructor(){
        this.listaTiposDatosRotulo=new Array();
    }

    /**
     * recupera los tipos de dato para el rotulo a la listaTiposDatosRotulo 
     * cuando se esta creando la convocatoria
     */
     public getTipoDatoRotuloBD(){

    }

    /**
     * recuperar los tiposDatoRotulo desde la base de datos cuando se esta editando la convocatoria
     */
    public recuperarTipoDatoRotuloBD(){
        
    }

}