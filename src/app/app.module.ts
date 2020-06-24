import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MeritosComponent } from './components/form-convocatoria/meritos/meritos.component';
import { RequerimientosComponent } from './components/form-convocatoria/requerimientos/requerimientos.component';
import { RequisitosComponent } from './components/form-convocatoria/requisitos/requisitos.component';
import { DocumentosPresentarComponent } from './components/form-convocatoria/documentos-presentar/documentos-presentar.component';
import { CalificacionConocimientosComponent } from './components/form-convocatoria/calificacion-conocimientos/calificacion-conocimientos.component';
import { FechasComponent } from './components/form-convocatoria/fechas/fechas.component';
import { TribunalesComponent } from './components/form-convocatoria/tribunales/tribunales.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { from } from 'rxjs';
import { CrearConvocatoriaComponent } from './pages/crearConvocatoria/crearConvocatoria.component';
import { FormConvocatoriaComponent } from './pages/form-convocatoria/form-convocatoria.component';
import { DatosRotuloComponent } from './components/datos-rotulo/datos-rotulo.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ConvocatoriasComponent } from './pages/convocatorias/convocatorias.component';
import { HomeComponent } from './pages/home/home.component';
import { FiltroConvocatoriasPipe } from './pipes/convocatoria/filtro-convocatorias.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { BlockUIModule } from 'ng-block-ui';
import { ComisionesComponent } from './pages/comisiones/comisiones.component';
import { EditarConvocatoriaServicePhp } from './servicios/editar-convocatoria/editar-convocatoria.service';
import { FormRegistroComponent } from './pages/form-registro/form-registro.component';
import { FormPostulanteComponent } from './pages/form-postulante/form-postulante.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ConvocatoriasEnCursoComponent } from './pages/convocatorias-en-curso/convocatorias-en-curso.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    SidebarComponent,
    FormConvocatoriaComponent,
    MeritosComponent,
    RequerimientosComponent,
    RequisitosComponent,
    DocumentosPresentarComponent,
    CalificacionConocimientosComponent,
    FechasComponent,
    TribunalesComponent,
    CrearConvocatoriaComponent,
    DatosRotuloComponent,
    ConvocatoriasComponent,
    HomeComponent,
    FiltroConvocatoriasPipe,
    LoadingSpinnerComponent,
    ComisionesComponent,
    FormRegistroComponent,
    FormPostulanteComponent,
    ConvocatoriasEnCursoComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    BlockUIModule.forRoot({
      template: LoadingSpinnerComponent
    })
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    EditarConvocatoriaServicePhp,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  entryComponents: [
    LoadingSpinnerComponent // Make sure to add it to the entry components
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
