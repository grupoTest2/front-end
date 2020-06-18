export class TipoDatoRotulo {
    private idConv: number;
    private nombre: string;
    private seleccionado: boolean;
    private enLista:boolean;

    public constructor(nombre: string, seleccionado: boolean,enLista:boolean=false) {
        this.idConv        = parseInt(localStorage.getItem("idConv"));
        this.nombre = nombre;
        this.seleccionado = seleccionado;
        this.enLista=enLista;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getSeleccionado(): boolean {
        return this.seleccionado;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setSeleccionado(seleccionado: boolean) {
        this.seleccionado = seleccionado;
    }
    public setEnLista(bandera:boolean){
        this.enLista=bandera;
    }
    public getEnLista(){
        return this.enLista;
    }
}