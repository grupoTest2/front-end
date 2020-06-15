import { TipoDatoRotulo } from '../clases/convocatoria/tipo-dato-rotulo';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';

export class SeleccionTipoDatoRotulo {
    private listaTiposDatosRotulo: TipoDatoRotulo[];

    public constructor(private apiPHP: PhpServeConvocatoria) {
        this.listaTiposDatosRotulo = new Array();
        this.getTipoDatoRotuloBD();
    }

    /**
     * recupera los tipos de dato para el rotulo a la listaTiposDatosRotulo 
     * cuando se esta creando la convocatoria
     */
    public getTipoDatoRotuloBD() {
        let listaTipos: Object[] = new Array();
        this.apiPHP.getTipoDatosRotulo().subscribe(
            result => {
                for (let i in result) {
                    
                }
                }
        );
    }

    /**
     * recuperar los tiposDatoRotulo desde la base de datos cuando se esta editando la convocatoria
     */
    public recuperarTipoDatoRotuloBD() {

    }

}