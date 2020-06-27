import { Component, OnInit } from '@angular/core';

declare var swal: any;

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mostrarMensajesW(){
    console.log("si se pudo instanciar el componente");
  }

  refresh(): void {
    swal.fire({
      title: 'Guardar Datos',
      text: "¿Está seguro de guardar los datos?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Exitoso!',
          'Se guardaron los cambios de la convocatoria.',
          'success'
        )
      } else {
        swal.fire(
          'Cancelado!',
          'Los datos no fueron guardados.',
          'error'
        )
      }
    })
  }

}
