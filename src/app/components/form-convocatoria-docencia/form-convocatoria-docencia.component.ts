import { Component, OnInit } from '@angular/core';
import { PhpServeService } from 'src/app/servicios/form-convocatoria-docencia/php-serve.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {SeleccionMateria} from 'src/app/modulos/requerimiento/requerimiento.module';
import { SeleccionRequisito } from 'src/app/modulos/requisito/requisito.module';
import { Merito } from 'src/app/modulos/merito/merito.module';
// import $ from "jquery";
 var swal: any;
declare var $: any;
@Component({
  selector: 'app-form-convocatoria-docencia',
  templateUrl: './form-convocatoria-docencia.component.html',
  styleUrls: ['./form-convocatoria-docencia.component.css']
})
export class FormConvocatoriaDocenciaComponent implements OnInit {

  formRequerimientos: FormGroup;
  idDepartamento = 1;
  seleccionMateria: SeleccionMateria;
  seleccionRequisito:SeleccionRequisito;
  listaMeritos:Merito[]=new Array();
  listaRequisitosSeleccionados:String[];
  materia = {
    nombreMat: null,
    idMat: null,
    cantidadAux: null,
    hrsMes: null
  }
  materiasSeleccionadas: Object[] = new Array();
  listaMaterias: Object[] = new Array();
  listaMateriasDisponibles: String[];

  constructor(private formBuilder: FormBuilder, private apiPHP: PhpServeService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getNombreMaterias();
    this.seleccionRequisito=new SeleccionRequisito();
  }

  // formularios con validaciones
  private buildForm() {
    this.formRequerimientos = this.formBuilder.group({
      items: ['',  Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      horasMes: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)])],
      materia: ['', [Validators.required]],
    });
    
    this.formRequerimientos.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }
  verificarNumero(num){
    return num>0;
  }
  save(event: Event){
      event.preventDefault();
      const value = this.formRequerimientos.value;
      console.log("dentro el save");
      console.log(value);
      
      console.log(value.items);
      console.log(value.cantidadAux);
      console.log(value.horasMes);
      console.log(value.materia);
  }
  getNombreMaterias() {
    this.apiPHP.getNombreMaterias(this.idDepartamento).subscribe(
      result => {
        for (let i in result) {
          this.listaMaterias.push(result[i]);
        }
        this.seleccionMateria = new SeleccionMateria(this.listaMaterias);
        this.listaMateriasDisponibles = this.seleccionMateria.getListaMateriasDisponibles();
  
        console.log(this.listaMateriasDisponibles);
      }
    );
  }
  guardarMateria() {
    //console.log(this.materia.cantidadAux);
    //console.log(this.materia.hrsMes);
    //console.log(this.materia.nombreMat);
    let objAux = JSON.parse(JSON.stringify(this.materia));
    this.seleccionMateria.agregarMateriaSeleccionada(objAux);
    this.materiasSeleccionadas = this.seleccionMateria.getMateriasSeleccionadas();
    //console.log(this.materiasSeleccionadas); 
    //console.log("funciona el boton");
  }

  agregarMateria() {

    this.materia.cantidadAux = null;
    this.materia.hrsMes = null;
    this.listaMateriasDisponibles = this.seleccionMateria.getListaMateriasDisponibles();
    console.log("despues de actualizar");
    console.log(this.listaMateriasDisponibles);

  }
  agregarMateriaBD() {
    this.apiPHP.agregarRequerimientos(this.seleccionMateria.getMateriasSeleccionadas()).subscribe(
      datos => {
        alert(datos['mensaje']);
      }
    );
  }
  //metodos para los requisitos
  establecerRequisitos(){

    this.listaRequisitosSeleccionados=this.seleccionRequisito.getListaRequisitosSeleccionados();
  }
  //devuelve una letra del abecedario(minuscula) en base al numero, tomando en cuenta que 0->a
  public convertirNum(num){
    return this.seleccionRequisito.getInciso(num);
  }
  //metodos de los meritos
  meritos(){
    let m1:Merito=new Merito("merito1","descrip1",65);
    this.agregarMerito(m1);
    //console.log(this.porcentajeDisponible())
    let m2:Merito=new Merito("merito2","descrip2",35);
    this.agregarMerito(m2);
    //console.log(this.porcentajeDisponible());
    //console.log(this.listaMeritos);
    let m3:Merito=new Merito("merito3","descrip3",20);
    this.agregarMerito2(1,m3);
    let m4:Merito=new Merito("merito1","descrip1",15);
    
    this.agregarMerito2(1,m4);
    //console.log(this.listaMeritos);
    let m5:Merito=new Merito("merito5","descrip5",10);
    this.agregarMerito3(1,0,m5);
    
    console.log(this.listaMeritos);
  }
  agregarMerito3(i,j,m){
    let objAux:Merito=this.listaMeritos[i];
    let listaMe=objAux.getListaMeritos();
    console.log("la lista de meritos obtenida");
    console.log(listaMe);
    console.log(listaMe[j]);
    listaMe[j].agregarMerito(m);
  }
  agregarMerito2(i:number,me:Merito){
    this.listaMeritos[i].agregarMerito(me);
  }
  agregarMerito(merito:Merito){
    if(this.porcentajeDisponible()>=merito.getPorcentaje()){
      this.listaMeritos.push(merito);
    }
    
  }
  porcentajeDisponible(){
      let sumaPorcentaje:number=0;
      for (let i in this.listaMeritos) {
        let objAux:Merito=this.listaMeritos[i];
        sumaPorcentaje+=objAux.getPorcentaje();
      }
      return 100-sumaPorcentaje;
  }

  alertEliminar() {
    swal.fire({
      title: 'Eliminar',
      text: "¿Desea eliminar el campo seleccionado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Exitoso!',
          'El campo fue eliminado.',
          'success'
        )
      } else {
        swal.fire(
          'Cancelado!',
          'El campo no fue eliminado.',
          'error'
        )
      }
    })
  }
}

