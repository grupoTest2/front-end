import { Component, OnInit } from '@angular/core';
import { Convocatoria } from 'src/app/models/clases/convocatoria/convocatoria';

//rutas
import { Router } from '@angular/router';

// form y validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoConvocatoria } from '../../models/clases/convocatoria/tipo-convocatoria';
import { EditarConvocatoriaServicePhp } from 'src/app/servicios/editar-convocatoria/editar-convocatoria.service';
import { EstadoConv } from 'src/app/models/clases/convocatoria/estadoConv';
import { PhpServeConvocatoria } from 'src/app/servicios/form-convocatoria/php-serve.service';

// jquery y toast
declare var tata: any;
declare var $: any;
@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css']
})
export class ConvocatoriasComponent implements OnInit {

  formCrearConv: FormGroup;
  filtroGestion = '';
  filtroTipo = '';
  filtroEstado = '';
  href: string = '';
  expandContent = true;
  listaConvocatoria: Convocatoria[] = [];
  listaEstados:EstadoConv[]=[];
  listaTiposConv:TipoConvocatoria[]=[];

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private editarConv:EditarConvocatoriaServicePhp,
    private cargarDatos:PhpServeConvocatoria) {
    this.buildForm();
    
    localStorage.setItem('tituloConvocatoria', "");
    localStorage.setItem('gestionConvocatoria', "");
    localStorage.setItem('idTipo',"");
    localStorage.setItem("idConv","");
  }

  ngOnInit(): void {
    this.cargarEstados();
    this.cargarTiposConv();
    this.cargarDatosConvocatoria();
    this.href = this.router.url;
    if (this.href === '/editar/convocatorias') {
    }else{
      this.listaConvocatoriaComision();
    }
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  clickComision(item: Convocatoria){
    localStorage.setItem("idConv",item.getIdConv()+"");
    localStorage.setItem("tituloConvocatoria",item.getTitulo()+"");
  }

  cambiar(id: string):void{
    $('#id2'+id).toggleClass('color');
    $('#id2'+id).toggleClass('shadow-sm').toggleClass('rounded');
    $('#idIcono'+id).toggleClass('fa-angle-right');
    $('#idIcono'+id).toggleClass('fa-angle-down');
  }

  expand():void{
    this.expandContent = !this.expandContent
    }
  
  listarTodo() :void{
    this.filtroGestion = '';
    this.filtroTipo = '';
    this.filtroEstado = '';
  }

  listaConvocatoriaComision() :void{
    let listaAuxiliar:Convocatoria[]=[];
    for (let index = 0; index < this.listaConvocatoria.length; index++) {
      if (this.listaConvocatoria[index].getEstado().toLowerCase() === 'en curso' || 
          this.listaConvocatoria[index].getEstado().toLowerCase() === 'en configuracion') {
          listaAuxiliar.push(this.listaConvocatoria[index]);
      }
    }
    this.listaConvocatoria = listaAuxiliar;
  }


  editar(item: Convocatoria) :void{
    this.formCrearConv.reset();
    this.formCrearConv.get('titulo').setErrors(null);
    this.formCrearConv.get('gestion').setErrors(null);
    $('#tituloConvocatoria').val(item.getTitulo());
    $('#seleccionGestion').val(item.getGestion());
    localStorage.setItem('tituloConvocatoria', item.getTitulo());
    localStorage.setItem('gestionConvocatoria',item.getGestion());
    localStorage.setItem('idTipo',item.getIdTipoConv()+"");
    localStorage.setItem("idConv",item.getIdConv()+"");
  }

  habilitar(item: Convocatoria):void{
    localStorage.setItem('tituloConvocatoria', item.getTitulo());
    localStorage.setItem('gestionConvocatoria',item.getGestion());
    localStorage.setItem('idTipo',item.getIdTipoConv()+"");
    localStorage.setItem("idConv",item.getIdConv()+"");
  }

 private buildForm(): void {
    this.formCrearConv = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      gestion: ['', [Validators.required]]
    });
  }
  save(event: Event): void {
    event.preventDefault();
    if (this.formCrearConv.valid) {
      const value = this.formCrearConv.value;
    } else {
      this.formCrearConv.markAllAsTouched();
    }
  }

  formValido():void{
    if (this.formCrearConv.valid) {
      tata.success('Cambios.', 'Se cambió los datos con exito.');
      $('#tablaEditar').modal('hide');
    } else {
      this.formCrearConv.markAllAsTouched();
      tata.error('Error', 'Formulario invalido');
    }
  }

  resetForm(): void {
    this.buildForm();
  }

  get tituloForm() :any{
    return this.formCrearConv.get('titulo');
  }
  get tituloFormIsValid():boolean {
    return this.tituloForm.touched && this.tituloForm.valid;
  }
  get tituloFormIsInvalid():boolean {
    return this.tituloForm.touched && this.tituloForm.invalid;
  }

  get gestionForm() :any{
    return this.formCrearConv.get('gestion');
  }
  get gestionFormIsValid():boolean {
    return this.gestionForm.touched && this.gestionForm.valid;
  }
  get gestionFormIsInvalid() :boolean{
    return this.gestionForm.touched && this.gestionForm.invalid;
  }

  get tipoForm() :any{
    return this.formCrearConv.get('tipo');
  }
  get tipoFormIsValid():boolean {
    return this.tipoForm.touched && this.tipoForm.valid;
  }
  get tipoFormIsInvalid() :boolean{
    return this.tipoForm.touched && this.tipoForm.invalid;
  }

  cargarDatosConvocatoria():void{
    let idDep=1;
    this.editarConv.getConvocatorias(idDep).subscribe(
      resultado => {
        let conv:Convocatoria;
        let tipo:TipoConvocatoria;
        for (let i in resultado) {
          let objAux:any=resultado[i];
          tipo = new TipoConvocatoria(objAux.idTipoConv, objAux.tipoConv);
          conv = new Convocatoria(
            objAux.idTipoConv,
            objAux.titulo,
            objAux.gestion.toString(),
            objAux.estado,
            tipo
          );
          conv.setIdConv(objAux.idConv);
          this.listaConvocatoria.push(conv);
        }
      }
    );
  }

  cargarEstados():void{
    this.cargarDatos.getEstadosConv().subscribe(
      (resultado:EstadoConv[])=>{
        for(let i in resultado){
          this.listaEstados.push(resultado[i]);
        }
      }
    )
  }

  cargarTiposConv():void{
    this.cargarDatos.getTipoConvocatoria(1).subscribe(
      (resultado:TipoConvocatoria[])=>{
        for(let i in resultado){
          this.listaTiposConv.push(resultado[i]);
        }
      }
    )    
  }
}
