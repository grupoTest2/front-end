export class Item{
    private idItem: number;
    private codigoItem: number;
    private nombreItem: string;
    private seleccionado: boolean;

    public constructor(idItem:number,codigoItem:number,nombreItem:string, seleccionado:boolean=false){
        this.idItem=idItem;
        this.codigoItem=codigoItem;
        this.nombreItem=nombreItem;
        this.seleccionado=seleccionado;
    }

    public getIdItem(): number{
        return this.idItem;
    }

    public getCodigoItem(): number{
        return this.codigoItem;
    }

    public getNombreItem(): string{
        return this.nombreItem;
    }

    public getSeleccionado(): boolean{
        return this.seleccionado;
    }

    public setSeleccionado(seleccionado){
        this.seleccionado=seleccionado;
    }
}