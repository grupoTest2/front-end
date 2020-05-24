export class SeleccionMateria {
    //mis atributos
    private materiasSeleccionadas: Object[];
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
  
    public agregarMateriaSeleccionada(materia) {
      if (materia.nombreMat != null && materia.cantidadAux != null && materia.hrsMes != null) {
        let idMateria = this.getIdMateria(materia.nombreMat);
        if (idMateria != -1) {
          materia.idMat = idMateria;
          this.deshabilitarSeleccion(materia.nombreMat);
          this.materiasSeleccionadas.push(materia);
          //console.log(JSON.stringify(this.materiasSeleccionadas));
        }
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
