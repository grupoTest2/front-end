import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { Comision } from 'src/app/models/clases/comision/comision';
import { TipoComision } from 'src/app/models/clases/comision/tipo-comision';
import { ComisionesServicePhp } from 'src/app/servicios/comisiones/comisiones.service';
import { UsuarioComision } from 'src/app/models/clases/comision/usuario-comision';

import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { TipoUsuario } from 'src/app/models/clases/comision/tipo-usuario';

declare var $: any;
declare var tata: any;
@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent implements OnInit {

  formTipoUsuario: FormGroup;
  comision1:Comision;
  comision2:Comision;
  listaTipoComision: TipoComision[]=[];
  listaUsuarios:Usuario[]=[];
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);
  listaComision: Comision[] = [];
  listaAux = [];
  idComisionAux;
  idUsuarioAux;
  idTipoUsuarioAux;
  indice;
  //
  banderaConocimiento=false;
  constructor(private comisionServ:ComisionesServicePhp,
    private formBuilder: FormBuilder,) { 
    //this.comision1=new Comision("revisora");
    //this.comision2=new Comision("revisora");
    this.getTipoComisionesBD();
    this.getUsuariosBD();
    this.buildForm();

  }

  ngOnInit(): void {
  }

  existeUsuario(idTipoComision:number, idUsuario: number): boolean{
    let res=false;
    for(let i=0;i<this.listaComision.length&&!res;i++){
      if(this.listaComision[i].getIdTipoComision()==idTipoComision){
        res=this.listaComision[i].existeUsuario(idUsuario);
      }
    }
    return res;
  }
  getNombreTipoUsuario(idTipoComision,idUsuario){
    let res="----";
    let bandera=true;
    for(let i=0;i<this.listaComision.length&&bandera;i++){
      if(this.listaComision[i].getIdTipoComision()==idTipoComision){
        
        let idAux=this.listaComision[i].getIdTipoUsuario(idUsuario);
        if(idAux!=-1){
          for(let j=0;j<this.listaTipoComision.length;j++){
            if(this.listaTipoComision[j].getIdTipoComision()==idTipoComision){
              
              res=this.listaTipoComision[j].getNombreTipoUsuario(idAux);
              bandera=false;
              break;
            }
          }
        }
      }
    }
    return res;
  }
  /*aniadirUsuario(tipoComision:string,usuario:Usuario){
    if(tipoComision===this.comision1.getTipoComision()){
      this.comision1.getListaUsuarios().push(usuario);
    }
    else{
      this.comision2.getListaUsuarios().push(usuario);
    }
  }*/
  //se añadio idTipoUsuario como parametro para agregar un miembro a una comision
  agregarUsuarioComison(idUsuario, idTipoComision, idTipoUsuario) {
    for (let i in this.listaComision) {
      let objCom: Comision = this.listaComision[i];
      if (objCom.getIdTipoComision() === idTipoComision) {
        let usuarioCom = new UsuarioComision(idUsuario, "insertar",idTipoUsuario);
        objCom.agregarUsuarioComision(usuarioCom);
      }
    }
  }

  getComision(idTipoComision) {
    let objCom: Comision;
    for (let i in this.listaComision) {
      objCom = this.listaComision[i];
      if (objCom.getIdTipoComision() === idTipoComision) {
        break;
      }
    }
    return objCom;
  }
  crearComisiones() {
    let com: Comision;
    for (let i in this.listaTipoComision) {
      let objAux = this.listaTipoComision[i];
      com = new Comision(objAux.getIdTipoComision());
      this.listaComision.push(com);
    }
    
    this.getComisionesBD();
    //console.log("las comisiones");
    //console.log(this.listaComision);
  }

  lista(){
    //this.agregarUsuarioComisionBD();
    console.log(JSON.stringify(this.listaComision));
    this.banderaConocimiento=true;
    this.agregarUsuarioComisionBD();
  }

  modal(indice1: number, idTipoComision: number, idUsuario: number){
    this.idComisionAux = idTipoComision;
    this.idUsuarioAux = idUsuario;
    this.indice = indice1;
    console.log(this.idComisionAux, idUsuario,"valoreeeeeees");
    this.resetForm();
    this.listaAux = [];
    for (const tipo of this.listaTipoComision[indice1].getListaTipoUsuario()) {
      this.listaAux.push(tipo.getNombre());
    }
  }

  // validacion ------------------------------------------------------------------------
  private buildForm(): void {
    this.formTipoUsuario = this.formBuilder.group({
      tipo: ['', [Validators.required]],
    });

    this.formTipoUsuario.valueChanges
      .subscribe(value => {
      });
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.formTipoUsuario.valid) {
      const value = this.formTipoUsuario.value;
    } else {
      this.formTipoUsuario.markAllAsTouched();
    }
  }

  formValido(): void {
    if (this.formTipoUsuario.valid) {
      $('#tablaTipo').modal('hide');
      tata.success('Agregado.', 'Se agregó al usuario.');
      this.idTipoUsuarioAux = this.listaTipoComision[this.indice].getListaTipoUsuario()[parseInt($('#seleccionaTipo').val())].getIdTipoUsuario();
      $('#nombreTipo'+this.idUsuarioAux).text(this.listaAux[parseInt($('#seleccionaTipo').val())]);
      console.log(this.idComisionAux, this.idUsuarioAux, this.idTipoUsuarioAux);
      this.marcar();
      this.agregarUsuarioComison(this.idUsuarioAux, this.idComisionAux, this.idTipoUsuarioAux);
    } else {
      tata.error('Error', 'Formulario invalido');
    }
  }
  resetForm(): void {
    this.formTipoUsuario.reset();
    this.buildForm();
  }

  get tipoForm() {
    return this.formTipoUsuario.get('tipo');
  }

  get tipoFormIsValid() {
    return this.tipoForm.touched && this.tipoForm.valid;
  }

  get tipoFormIsInvalid() {
    return this.tipoForm.touched && this.tipoForm.invalid;
  }


  marcar(){
    //  pintar fila y cambiar iconos
    $('#id' + this.idComisionAux + this.idUsuarioAux).toggleClass('text-primary').toggleClass("text-muted");
    $('#id' + this.idComisionAux + this.idUsuarioAux).toggleClass('shadow-sm');
    $('#check' + this.idComisionAux + this.idUsuarioAux).toggleClass('fa-user-times').toggleClass('fa-user-check');
    $('#boton' + this.idComisionAux + this.idUsuarioAux).toggleClass('btn-outline-secondary').toggleClass('btn-outline-success');

    // console.log(idUsuario, '-idUsuario', idTipo, '-idTipo');
    //this.agregarUsuarioComison(idUsuario, idTipo);
    //la linea de abajo esta hardcodeado para que no de errores al compilar
    // this.agregarUsuarioComison(idUsuario, idTipo,5);
   }

  /**
   * metodos que interactuan con la base de datos
   */

  getTipoComisionesBD() {
    this.comisionServ.getTiposComision().subscribe(
      resultado => {
        let tipoCom: TipoComision;
        let tipoUsuario:TipoUsuario;
        for (let i in resultado) {
          let tiposUsuario: TipoUsuario[]=[];
          let objAux=resultado[i].tipoUsuario;
          for(let j in objAux){
            tipoUsuario=new TipoUsuario(objAux[j].idTipoUsuario,objAux[j].nombre);
            tiposUsuario.push(tipoUsuario);
          }
          tipoCom = new TipoComision(resultado[i].idTipoComision, resultado[i].nombre,tiposUsuario);
          this.listaTipoComision.push(tipoCom);
        }
        this.crearComisiones();
      }
    )
    console.log("los tipos de comisionessss");
    console.log(this.listaTipoComision);

  }

  getUsuariosBD() {
    this.comisionServ.getUsuarios().subscribe(
      resultado => {
        let usuario: Usuario;
        for (let i in resultado) {
          let objAux = resultado[i];
          usuario = new Usuario(objAux.idUsuario, objAux.nombre, objAux.apellidoP, objAux.apellidoM, objAux.correo);
          this.listaUsuarios.push(usuario);
        }
      }
    )
    //console.log("los usuariossss");
    //console.log(this.listaUsuarios);
   }

   getComisionesBD(){
     console.log("en el metodo pro");
     console.log(this.listaComision.length);
     for(let i in this.listaComision){
       let objAux={
          idConv:this.listaComision[i].getIdConv(),
          idTipoComision:this.listaComision[i].getIdTipoComision()
       }
       this.comisionServ.getComisiones(objAux).subscribe(
        resultado=>{
            let misUsuarios=resultado['listaUsuarios'];
            let usuariosAux: UsuarioComision[]=[];
            for(let k in misUsuarios){
              usuariosAux.push(new UsuarioComision(misUsuarios[k].idUsuario,misUsuarios[k].accion,misUsuarios[k].idTipoUsuario));
            }
            this.listaComision[i].setListaUsuarios(usuariosAux);
          }
          
          
        
       );
     }
     console.log("despues de la insercion");
     console.log(this.listaComision);
   }

   agregarUsuarioComisionBD(){
    let hayUsuarios:boolean=false; 
    for(let i in this.listaComision){
      hayUsuarios=this.listaComision[i].getListaUsuarios().length>0;
      if(hayUsuarios){
        break;
      }
    }
    if(hayUsuarios){
      this.comisionServ.agregarUsuariosComision(this.listaComision).subscribe(
        resultado=>{
          if(resultado['resultado']=='correcto'){
            console.log("miembros agregados correctamente");
          }else{
            console.log("error al agregar miembros");
          }
        }
      )
    }else{
      console.log("no hay usuarios seleccionados");
    }
    
   }
  

   
}
