import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/clases/comision/usuario';
import { Comision } from 'src/app/models/clases/comision/comision';
import { TipoComision } from 'src/app/models/clases/comision/tipo-comision';
import { ComisionesServicePhp } from 'src/app/servicios/comisiones/comisiones.service';
import { UsuarioComision } from 'src/app/models/clases/comision/usuario-comision';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TipoUsuario } from 'src/app/models/clases/comision/tipo-usuario';
import { Router } from '@angular/router';

declare var $: any;
declare var tata: any;
declare var swal: any;
@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent implements OnInit {

  formTipoUsuario: FormGroup;
  comision1: Comision;
  comision2: Comision;
  listaTipoComision: TipoComision[] = [];
  listaUsuarios: Usuario[] = [];
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);
  listaComision: Comision[] = [];
  listaAux = [];
  idComisionAux;
  idUsuarioAux;
  idTipoUsuarioAux;
  indice;

  //
  banderaConocimiento = false;

  titulo = "";
  constructor(private comisionServ: ComisionesServicePhp,
    private formBuilder: FormBuilder, private router: Router) {
    this.titulo = localStorage.tituloConvocatoria;
    this.getTipoComisionesBD();
    this.getUsuariosBD();
    this.buildForm();

  }

  ngOnInit(): void {
  this.listaAux = [];

  }
  existeUsrComision(){
    return this.listaComision[0].getListaUsuarios.length==0;
  }
  existeUsuario(idTipoComision: number, idUsuario: number): boolean {
    let res = false;
    for (let i = 0; i < this.listaComision.length && !res; i++) {
      if (this.listaComision[i].getIdTipoComision() == idTipoComision) {
        res = this.listaComision[i].existeUsuario(idUsuario);
      }
    }
    return res;
  }
  getNombreTipoUsuario(idTipoComision, idUsuario):string {
    let res = "----";
    let bandera = true;
    for (let i = 0; i < this.listaComision.length && bandera; i++) {
      if (this.listaComision[i].getIdTipoComision() == idTipoComision) {

        let idAux = this.listaComision[i].getIdTipoUsuario(idUsuario);
        if (idAux != -1) {
          for (let j = 0; j < this.listaTipoComision.length; j++) {
            if (this.listaTipoComision[j].getIdTipoComision() == idTipoComision) {

              res = this.listaTipoComision[j].getNombreTipoUsuario(idAux);
              bandera = false;
              break;
            }
          }
        }
      }
    }
    return res;
  }

  agregarUsuarioComison(idUsuario, idTipoComision, idTipoUsuario):void {
    for (let i in this.listaComision) {
      let objCom: Comision = this.listaComision[i];
      if (objCom.getIdTipoComision() === idTipoComision) {
        let usuarioCom = new UsuarioComision(idUsuario, "insertar", idTipoUsuario);
        objCom.agregarUsuarioComision(usuarioCom);
      }
    }
  }

  getComision(idTipoComision) :Comision{
    let objCom: Comision;
    for (let i in this.listaComision) {
      objCom = this.listaComision[i];
      if (objCom.getIdTipoComision() === idTipoComision) {
        break;
      }
    }
    return objCom;
  }

  crearComisiones() :void{
    let com: Comision;
    for (let i in this.listaTipoComision) {
      let objAux = this.listaTipoComision[i];
      com = new Comision(objAux.getIdTipoComision());
      this.listaComision.push(com);
    }
    this.getComisionesBD();
  }

  lista() :void{
    this.banderaConocimiento = true;
    if(this.verificar()){
    this.alertRegistrar();
    }else{
      tata.error('Error', 'Por favor debe elegir al menos un usuario')
    }
  }

  verificar():boolean{
    let hayUsuarios: boolean = false;
    for (let i in this.listaComision) {
      hayUsuarios = this.listaComision[i].getListaUsuarios().length > 0;
      if (hayUsuarios) {
        break;
      }
    }
    return hayUsuarios;
  }

  modal(indice1: number, idTipoComision: number, idUsuario: number):void {
    this.listaAux = [];
    this.idComisionAux = idTipoComision;
    this.idUsuarioAux = idUsuario;
    this.indice = indice1;
    this.resetForm();
    this.listaAux = [];
    for (const tipo of this.listaTipoComision[indice1].getListaTipoUsuario()) {
      this.listaAux.push(tipo.getNombre());
    }
  }

  alertRegistrar(): void {
    swal.fire({
      title: 'Guardar Datos',
      text: "¿Está seguro de guardar datos?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.agregarUsuarioComisionBD();
        swal.fire(
          'Exitoso!',
          'Se guardaron los usuarios.',
          'success'
        ).then((result) => {
        });
      } else {
        swal.fire(
          'Cancelado!',
          'Los uuarios no fueron guardados.',
          'warning'
        );
      }
    });
  }

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
      $('#nombreTipo' + this.idUsuarioAux).text(this.listaAux[parseInt($('#seleccionaTipo').val())]);
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

  get tipoForm():any {
    return this.formTipoUsuario.get('tipo');
  }

  get tipoFormIsValid():boolean {
    return this.tipoForm.touched && this.tipoForm.valid;
  }

  get tipoFormIsInvalid():boolean {
    return this.tipoForm.touched && this.tipoForm.invalid;
  }

  marcar():void {
    $('#id' + this.idComisionAux + this.idUsuarioAux).toggleClass('text-primary').toggleClass("text-muted");
    $('#id' + this.idComisionAux + this.idUsuarioAux).toggleClass('shadow-sm');
    $('#check' + this.idComisionAux + this.idUsuarioAux).toggleClass('fa-user-times').toggleClass('fa-user-check');
    $('#boton' + this.idComisionAux + this.idUsuarioAux).toggleClass('btn-outline-secondary').toggleClass('btn-outline-success');
  }

  getTipoComisionesBD():void {
    this.comisionServ.getTiposComision().subscribe(
      resultado => {
        let tipoCom: TipoComision;
        let tipoUsuario: TipoUsuario;
        for (let i in resultado) {
          let tiposUsuario: TipoUsuario[] = [];
          let objAux = resultado[i].tipoUsuario;
          for (let j in objAux) {
            tipoUsuario = new TipoUsuario(objAux[j].idTipoUsuario, objAux[j].nombre);
            tiposUsuario.push(tipoUsuario);
          }
          tipoCom = new TipoComision(resultado[i].idTipoComision, resultado[i].nombre, tiposUsuario);
          this.listaTipoComision.push(tipoCom);
        }
        this.crearComisiones();
      }
    )
  }

  getUsuariosBD():void {
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
  }

  getComisionesBD() :void{
    for (let i in this.listaComision) {
      let objAux = {
        idConv: this.listaComision[i].getIdConv(),
        idTipoComision: this.listaComision[i].getIdTipoComision()
      }
      this.comisionServ.getComisiones(objAux).subscribe(
        resultado => {
          let misUsuarios = resultado['listaUsuarios'];
          let usuariosAux: UsuarioComision[] = [];
          for (let k in misUsuarios) {
            usuariosAux.push(new UsuarioComision(misUsuarios[k].idUsuario, misUsuarios[k].accion, misUsuarios[k].idTipoUsuario));
          }
          this.listaComision[i].setListaUsuarios(usuariosAux);
        }
      );
    }
  }

  agregarUsuarioComisionBD():void {
    let hayUsuarios: boolean = false;
    for (let i in this.listaComision) {
      hayUsuarios = this.listaComision[i].getListaUsuarios().length > 0;
      if (hayUsuarios) {
        break;
      }
    }
    if (hayUsuarios) {
      this.comisionServ.agregarUsuariosComision(this.listaComision).subscribe(
        resultado => {
          if (resultado['resultado'] == 'correcto') {
          } else {
          }
        }
      )
    }
  }
}
