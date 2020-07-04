export class Item{
    private idItem: number;
    private codigoItem: string;
    private nombreItem: string;
    private seleccionado: boolean;

    public constructor(idItem:number,codigoItem:string,nombreItem:string, seleccionado:boolean=false){
        this.idItem=idItem;
        this.codigoItem=codigoItem;
        this.nombreItem=nombreItem;
        this.seleccionado=seleccionado;
    }

    public getIdItem(): number{
        return this.idItem;
    }

    public getCodigoItem(): string{
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