import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormConvocatoriaDocenciaComponent } from './pages/form-convocatoria-docencia/form-convocatoria-docencia.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'convDocencia', component: FormConvocatoriaDocenciaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
