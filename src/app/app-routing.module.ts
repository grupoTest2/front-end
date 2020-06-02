import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormConvocatoriaComponent } from './pages/form-convocatoria/form-convocatoria.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'convDocencia', component: FormConvocatoriaComponent },
  { path: 'convLaboratorio', component: FormConvocatoriaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
