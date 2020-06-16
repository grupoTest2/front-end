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
    DatosRotuloComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
