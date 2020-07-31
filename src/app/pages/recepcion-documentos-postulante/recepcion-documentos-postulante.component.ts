import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/clases/convocatoria/item'
import { Convocatoria } from '../../models/clases/convocatoria/convocatoria';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { getTestBed } from '@angular/core/testing';
import { RecepcionService } from 'src/app/servicios/recepcionDocumentos/recepcion.service';
import { Postulante } from 'src/app/models/clases/postulante/postulante';
import { Router } from '@angular/router';

declare var $: any;
declare var tata: any;
declare var swal: any;

@Component({
  selector: 'app-recepcion-documentos-postulante',
  templateUrl: './recepcion-documentos-postulante.component.html',
  styleUrls: ['./recepcion-documentos-postulante.component.css']
})

export class RecepcionDocumentosPostulanteComponent implements OnInit {

  fecha: Date = new Date();
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  editar=false;
  item: Item;
  listaItems: Item[] = [];
  convocatoria: Convocatoria;
  postulante:Postulante;
  listaAuxiliar = ['nombre: jhonn', 'apellidos: Camacho Ledezma', 'correo: jhonnwcl@gmail.com', 'codigo_sis: 2010342'];
  bandera = false;

  constructor(private recepcion: RecepcionService, private router:Router) {
 
  }

  ngOnInit(): void {
    this.horas = this.getHora();
    this.minutos = this.getMinutos();
    this.segundos = this.getSegundos();
    setInterval(() => {
      this.segundos += 1;
      if (this.minutos == 59 && this.segundos == 59) {
        this.horas += 1;
        this.minutos = 0;
        this.segundos = 0;
      } else {
        if (this.segundos == 60) {
          this.segundos = 0;
          this.minutos += 1;
        }
      }
      if (this.horas == 24) {
        this.horas = 1;
      }
    }, 1000);
  }

  cargarPruebas():void {
    this.item = new Item(1, "1", "Introduccion");
    this.listaItems.push(this.item);
    this.item = new Item(1, "1", "Elementos Y Estructura De Progra");
    this.listaItems.push(this.item);
    this.item = new Item(1, "1", "Teoria De Grafos");
    this.listaItems.push(this.item);
    this.convocatoria = new Convocatoria(1, "convocatoria prueba", "Gestion 2020");

  }

  editarHora():void{
    this.editar = !this.editar;
  }

  getHora(): number {
    let hr = this.fecha.getHours();
    return hr;

  }
  getMinutos():number {
    let mn = this.minutos = this.fecha.getMinutes();
    return mn;
  }
  getSegundos():number {
    let sg = this.fecha.getSeconds();
    return sg;
  }

  buscarCodigo():void {
    let codigo = $('#codigo').val();
    this.existeCodigoBD(codigo);
  }

  limpiarDatos():void {
    $('#codigo').val("");
    $('#numero_doc').val("");
    this.bandera = false;
    $('#hora').val(this.getHora() + "");
  }

  guardarDatos() :void{
    let numeroDoc = $('#numero_doc').val();
    let hora = $('#hora').val();
    this.registrarRecepcionBD(numeroDoc,this.horas + ":" + this.minutos + ":" + this.segundos);
    this.limpiarDatos();
  }
//          

  alertGuardar(): void {
    let numDocs = parseInt($('#numero_doc').val());
    if (numDocs >= 7) {
      this.alertConfirmacion();
    }
    else {
      tata.error("Error:", "el numero de documentos es incompleto! ");
    }
  }

  salir():void{
    this.router.navigate(['/home']);
  }

  alertConfirmacion():void {
    swal.fire({
      title: 'Guardar',
      text: "¿Desea guardar los datos registrados",
      icon: 'question',//wrning
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
          this.guardarDatos();
      } else {
        swal.fire(
          'Cancelado!',
          'No se guardo el registro',
          'info'
        )
      }
    })
  }

  existeCodigoBD(codigo: string):void{
    this.recepcion.getInformacionPostulante(codigo).subscribe(
      resp=>{
        if(resp['existe']==0){
          let conv=resp['convocatoria'];
          this.convocatoria=new Convocatoria(0,conv.titulo,conv.gestion);
          this.convocatoria.setIdConv(conv.idConv);
          let post=resp['postulante'];
          let items=post.listaItems;
          for(let i in items){
            this.listaItems.push(new Item(items[i].idItem,items[i].codigoItem,items[i].nombreItem));
          }
          this.postulante=new Postulante(post.codigoSis,items);
          this.postulante.setNombre(post.nombre);
          this.postulante.setApellidoP(post.apellidoP);
          this.postulante.setApellidoM(post.apellidoM);
          this.postulante.setIdPostulante(post.idPos);
          this.bandera=true;
          if (this.bandera) {
            tata.success("Exito:", "puede configurar el registro");
          }
        }else if(resp['existe']==-1){
          tata.error("Error:", "el codigo ingresaado no existe!");
          this.bandera=false;
        }else{
          tata.error("Error:", "la recepcion de los documentos de este postulante ya se realizo!");
          this.bandera=false;
        }
      }
    );
  }
  
  registrarRecepcionBD(nroDoc,hora):void{
    let datos={
      "idConv":this.convocatoria.getIdConv(),
      "idPos":this.postulante.getIdPostulante(),
      "idItem":this.listaItems[0].getIdItem(),
      "nroDocumentos":nroDoc,
      "horaRegistro":hora
    }
    this.recepcion.registrarRecepcion(datos).subscribe(
      resp=>{
        if(resp=="correcto"){
          swal.fire(
            'Exitoso!',
            'El registro fue guardado',
            'success'
          );
        }
      }
    );
  }
}
