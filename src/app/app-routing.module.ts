import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { crearConvocatoriaComponent } from './pages/crearConvocatoria/crearConvocatoria.component';
import { FormConvocatoriaComponent } from './pages/form-convocatoria/form-convocatoria.component';


const routes: Routes = [
  { path: 'crearConvocatoria', component: crearConvocatoriaComponent },
  { path: 'crearConvocatoria/tipo/:id', component: FormConvocatoriaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'crearConvocatoria' },
  { path: '**', pathMatch: 'full', redirectTo: 'crearConvocatoria' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
