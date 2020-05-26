import { Requerimiento } from './requerimiento';

export class SeleccionRequerimiento{
    //mis atributos
    private materiasSeleccionadas:Requerimiento[];
    private listaMaterias: Object[];
    private listaMateriasDisponibles: String[];
  
    constructor(listaMat:Object[]) {
      this.materiasSeleccionadas = new Array();
      this.listaMaterias = listaMat;
      //console.log(this.listaMaterias);
      this.actualizarListaMatDisponibles();
    }
  
    public actualizarListaMatDisponibles() {
      this.listaMateriasDisponibles = new Array();
      for (let i in this.listaMaterias) {
        let mat: any = this.listaMaterias[i];
        if (!mat.seleccionado) {
          this.listaMateriasDisponibles.push(mat.nombreMat);
  
        }
      }
      //console.log(this.listaMateriasDisponibles);
    }
    //devuelve el id de la materia que se esta buscando
    getIdMateria(nombMat) {
      let res = -1;
      for (let i in this.listaMaterias) {
        let mat: any = this.listaMaterias[i];
        if (mat.nombreMat == nombMat) {
          res = mat.idMat;
          break;
        }
      }
      return res;
    }
  
    public agregarRequerimientoSeleccionado(req:Requerimiento) {
        let idMateria = this.getIdMateria(req.getnombreMateria());
        if (idMateria != -1) {
          req.setIdMat(idMateria);
          this.deshabilitarSeleccion(req.getnombreMateria());
          this.materiasSeleccionadas.push(req);
          //console.log(JSON.stringify(this.materiasSeleccionadas));
        }
      
    }
  
    public deshabilitarSeleccion(nombreMatForm) {
      for (let i in this.listaMaterias) {
        let mat: any = this.listaMaterias[i];
        if (mat.nombreMat == nombreMatForm) {
          mat.seleccionado = true;
        }
      }
      this.actualizarListaMatDisponibles();
    }
    public hayMateriasDisponibles(){
      return this.listaMateriasDisponibles.length>0;
    }
    public existeMateriasSeleccionas() {
      return this.materiasSeleccionadas.length > 0;
    }
  
    public getListaMateriasDisponibles() {
      return this.listaMateriasDisponibles;
    }
  
    public getMateriasSeleccionadas() {
      return this.materiasSeleccionadas;
    }
   
  
}
