import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { UsuarioComision } from 'src/app/models/clases/comision/usuario-comision';
import { TipoUsuario } from 'src/app/models/clases/comision/tipo-usuario';
import { Comision } from 'src/app/models/clases/comision/comision';
import { Tematica } from 'src/app/models/clases/convocatoria/tematica2';
import { ComisionesServicePhp } from 'src/app/servicios/comisiones/comisiones.service';
declare var $: any;
declare var tata: any;
@Component({
  selector: 'app-asingacion-area-conocimiento',
  templateUrl: './asingacion-area-conocimiento.component.html',
  styleUrls: ['./asingacion-area-conocimiento.component.css']
})


export class AsingacionAreaConocimientoComponent implements OnInit {


  comision: Comision; 
  listaUsuarios: Usuario[] = [];
  listaUsuariosComision: UsuarioComision[] = [];
  listaTiposUsuario: TipoUsuario[] = [];
  listaTematicas: Tematica[] = [];
  indiceActual = 0;
  tituloActual = "";
  tituloConv="";
  constructor(private comisionServ:ComisionesServicePhp) {
    this.comision =new Comision(1);
    this.getTiposUsuarioBD();
    this.getTematicasBD();
    this.getComisionesBD();
    this.tituloConv=localStorage.getItem('tituloConvocatoria');
  }

  ngOnInit(): void {
  }

  getTipoUsuario(id: number):string {
    let res = "";
    for (let index = 0; index < this.comision.getListaUsuarios().length; index++) {
      if (this.comision.getListaUsuarios()[index].getIdUsuario() == this.listaUsuarios[id].getIdUsuario()) {
        for (let i = 0; i < this.listaTiposUsuario.length; i++) {
          if (this.comision.getListaUsuarios()[index].getIdTipoUsuario() == this.listaTiposUsuario[i].getIdTipoUsuario()) {
            res = this.listaTiposUsuario[i].getNombre();
          }
        }
      }
    }
    return res;
  }

  mostrarMensaje(ind: number) :void{
    this.indiceActual = ind;
    this.tituloActual = "Por El Usuario: " + this.listaUsuarios[this.indiceActual].getNombres() + " " + this.listaUsuarios[this.indiceActual].getApellidoPaterno() + " " + this.listaUsuarios[this.indiceActual].getApellidoMaterno();
    this.quitarSeleecionTematicas();
    $("#tablaDatosSeleccionables").modal("show");
    for (let i = 0; i < this.comision.getListaUsuarios().length; i++) {
      if (this.comision.getListaUsuarios()[i].getIdUsuario() == this.listaUsuarios[this.indiceActual].getIdUsuario()) {
        for (let index = 0; index < this.comision.getListaUsuarios()[i].getListaTematica().length; index++) {
          for (let j = 0; j < this.listaTematicas.length; j++) {
            if (this.listaTematicas[j].getNombre() == this.comision.getListaUsuarios()[i].getListaTematica()[index].getNombre()) {
              this.listaTematicas[j].setSeleccionado(true);
            }
          }
        }
      }
    }
  }

  seleccionado(index: number): void {
    if (this.listaTematicas[index].getSeleccionado())
      this.listaTematicas[index].setSeleccionado(false);
    else {
      this.listaTematicas[index].setSeleccionado(true);
    }
  }

  agregarTematicasEvaluar():void {
    let listaTemporalTematica: Tematica[] = [];
    let banderaSeleccionado = false;
    for (let i = 0; i < this.comision.getListaUsuarios().length; i++) {
      if (this.comision.getListaUsuarios()[i].getIdUsuario() == this.listaUsuarios[this.indiceActual].getIdUsuario()) {
        for (let index = 0; index < this.listaTematicas.length; index++) {
          if (this.listaTematicas[index].getSeleccionado()) {
            this.listaTematicas[index].setAccion("insertar");
            listaTemporalTematica.push(this.listaTematicas[index]);
            banderaSeleccionado = true;
          }
        }
        this.comision.getListaUsuarios()[i].setListaTematica(listaTemporalTematica);
      }
    }
    this.quitarSeleecionTematicas();
    if (banderaSeleccionado) {
      this.listaUsuarios[this.indiceActual].setSeleccionado(true);
    }
    else {
      this.listaUsuarios[this.indiceActual].setSeleccionado(false);
    }
  }


  quitarSeleecionTematicas():void {
    for (let index = 0; index < this.listaTematicas.length; index++) {
      this.listaTematicas[index].setSeleccionado(false);
    }
  }

  guardarDatos():void {
   if(this.verificarSeleccionTematicas()){
     this.guardarDatosBD();
   }
   else{
    this.mensajeToastError(`Debe De Asignar Por Lo Menos Un Usuario De Tipo Evaluador <br> A Cada Item`);
   }
  }
  mensajeToastError(mensaje) {
    tata.error("Error", mensaje);

  }
  mensajeToastExito(mensaje) {
    tata.success("Registro Exitoso", mensaje);
  }
  
  verificarSeleccionTematicas2():boolean {
    let banderaValidador = true;
    let banderaContador = true;
    let contador = 0;
    for (let i = 0; i < this.listaTematicas.length; i++) {//--------------------------------recorro la lista de tematicas existentes
      for (let j = 0; j < this.comision.getListaUsuarios().length; j++) {//----------------rrecorro a los ususarios que  tienen id del tipo de usuario y el id del ususario y la lista de tematicas
        if (this.comision.getListaUsuarios()[j].getListaTematica().length > 0) {
          for (let h = 0; h < this.listaTiposUsuario.length; h++) {//---------------------rrecorro la lista de tipos usuarios existentes tiene el id del ususuario y el nombre del tipo
            if (this.comision.getListaUsuarios()[j].getIdTipoUsuario() == this.listaTiposUsuario[h].getIdTipoUsuario()) {   /// comparo los ids de los usuario
              if (this.listaTiposUsuario[h].getNombre() == "evaluador") {
                for (let index = 0; index < this.comision.getListaUsuarios()[j].getListaTematica().length; index++) {
                  if (this.listaTematicas[i].getNombre() == this.comision.getListaUsuarios()[j].getListaTematica()[index].getNombre()) {
                    if (banderaContador) {
                      contador += 1;
                      banderaContador = false;
                    }
                  }
                }
              }
            }
          }
        }
      }
      banderaContador = true;
    }
    if(contador!=this.listaTematicas.length){
      banderaValidador=false;
    }
    return banderaValidador
  }
  
  verificarSeleccionTematicas():boolean{
    let res=true;
    for(let i=0; i<this.listaTematicas.length&&res;i++){
      let bandera=false;
      let usuariosComision=this.comision.getListaUsuarios();
      for(let j=0;j<usuariosComision.length&&!bandera;j++){
          if(usuariosComision[j].existeTematica(this.listaTematicas[i].getIdTematica())){
            if(usuariosComision[j].getNombreTipoUsuario(this.listaTiposUsuario)==="evaluador"){
              bandera=true;
            }
          }
      }
      res=bandera;
    }
    return res;
  }

getUsuariosBD() {
  this.comisionServ.getUsuarios().subscribe(
    resultado => {
      let usuario: Usuario;
      for (let i in resultado) {
        let objAux = resultado[i];
        if(this.comision.existeUsuario(objAux.idUsuario)){
          usuario = new Usuario(objAux.idUsuario, objAux.nombre, objAux.apellidoP, objAux.apellidoM, objAux.correo);
          this.listaUsuarios.push(usuario);
        }
      }
    }
  )
 }

 getComisionesBD(){
    let objAux={
       idConv:this.comision.getIdConv(),
       idTipoComision:this.comision.getIdTipoComision()
    }
    this.comisionServ.getComisiones(objAux).subscribe(
     resultado=>{
         let misUsuarios=resultado['listaUsuarios'];
         let usuariosAux: UsuarioComision[]=[];
         for(let k in misUsuarios){
           usuariosAux.push(new UsuarioComision(misUsuarios[k].idUsuario,misUsuarios[k].accion,misUsuarios[k].idTipoUsuario));
         }
         this.comision.setListaUsuarios(usuariosAux);
         this.getUsuariosBD();
       }
       
    );
  }

  getTiposUsuarioBD(){
    let idDep=1;
    this.comisionServ.getTiposUsuario(idDep).subscribe(
      resultado=>{
        for(let i in resultado){
          this.listaTiposUsuario.push(new TipoUsuario(resultado[i].idTipoUsuario,resultado[i].nombre));
        }
      }
    );
  }

  getTematicasBD(){
    let idConv=parseInt(localStorage.getItem("idConv"));
    this.comisionServ.getTematicas(idConv).subscribe(
      resultado=>{
        for(let i in resultado){
          this.listaTematicas.push(new Tematica(resultado[i].idTematica, resultado[i].nombre));
        }
      }
    );
  }

  guardarDatosBD(){
    this.comisionServ.agregarUsuarioTematica(this.comision).subscribe(
      resultado=>{
        if(resultado['resultado']=='correcto'){
          this.mensajeToastExito("se guardaron los datos correctamete !");
        }else{
          this.mensajeToastError(`ocurrio un error al agregar los datos`);
        }
      }
    );
  }
}

