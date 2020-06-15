import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearConvocatoriaComponent } from './pages/crearConvocatoria/crearConvocatoria.component';
import { FormConvocatoriaComponent } from './pages/form-convocatoria/form-convocatoria.component';


const routes: Routes = [
  { path: 'crearConvocatoria', component: CrearConvocatoriaComponent },
  { path: 'crearConvocatoria/formulario', component: FormConvocatoriaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'crearConvocatoria' },
  { path: '**', pathMatch: 'full', redirectTo: 'crearConvocatoria' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
