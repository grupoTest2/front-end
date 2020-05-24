import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SeleccionRequisito { 
  private listaRequisitos:Object[];
  private listaRequisitosSeleccionados:String[];
  public constructor(){
    this.listaRequisitosSeleccionados=new Array();
    for(let i=1;i<5;i++){
      let mensaje="este es un requisito"+i;
      this.listaRequisitosSeleccionados.push(mensaje);
    }
  }
  public getInciso(num){
    //console.log("veamos............");
    let inciso=String.fromCharCode(97+num)+")";
    //console.log(inciso);
    return inciso;
  }
  public getListaRequisitosSeleccionados():String[]{
    return this.listaRequisitosSeleccionados;
  }

}
