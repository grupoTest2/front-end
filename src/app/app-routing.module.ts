import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearConvocatoriaComponent } from './pages/crearConvocatoria/crearConvocatoria.component';
import { FormConvocatoriaComponent } from './pages/form-convocatoria/form-convocatoria.component';
import { ConvocatoriasComponent } from './pages/convocatorias/convocatorias.component';
import { HomeComponent } from './pages/home/home.component';
import { ComisionesComponent } from './pages/comisiones/comisiones.component';
import { FormRegistroComponent } from './pages/form-registro/form-registro.component';
import { FormPostulanteComponent } from './pages/form-postulante/form-postulante.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'crearConvocatoria', component: CrearConvocatoriaComponent },
  { path: 'crearConvocatoria/formulario', component: FormConvocatoriaComponent },
  { path: 'editarConvocatoria/formulario', component: FormConvocatoriaComponent },
  { path: 'editar/convocatorias', component: ConvocatoriasComponent },
  { path: 'formularioRegistro', component: FormPostulanteComponent },
  { path: 'formularioMiembro', component: FormRegistroComponent},
  { path: 'convocatorias', component: ConvocatoriasComponent },
  { path: 'comisiones', component: ComisionesComponent },
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
