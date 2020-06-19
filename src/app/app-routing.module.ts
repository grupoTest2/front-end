import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearConvocatoriaComponent } from './pages/crearConvocatoria/crearConvocatoria.component';
import { FormConvocatoriaComponent } from './pages/form-convocatoria/form-convocatoria.component';
import { EditarConvocatoriaComponent } from './pages/editar-convocatoria/editar-convocatoria.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'crearConvocatoria', component: CrearConvocatoriaComponent },
  { path: 'crearConvocatoria/formulario', component: FormConvocatoriaComponent },
  { path: 'editarConvocatoria/formulario', component: FormConvocatoriaComponent },
  { path: 'editarConvocatoria', component: EditarConvocatoriaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Add options right here
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
