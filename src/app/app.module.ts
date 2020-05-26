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
import { FormConvocatoriaDocenciaComponent } from './components/form-convocatoria-docencia/form-convocatoria-docencia.component';
import { MeritosComponent } from './components/meritos/meritos.component';
import { RequerimientosComponent } from './components/requerimientos/requerimientos.component';
import { RequisitosComponent } from './components/requisitos/requisitos.component';
import { DocumentosPresentarComponent } from './components/documentos-presentar/documentos-presentar.component';
import { CalificacionConocimientosComponent } from './components/calificacion-conocimientos/calificacion-conocimientos.component';
import { FechasComponent } from './components/fechas/fechas.component';
import { TribunalesComponent } from './components/tribunales/tribunales.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    SidebarComponent,
    FormConvocatoriaDocenciaComponent,
    MeritosComponent,
    RequerimientosComponent,
    RequisitosComponent,
    DocumentosPresentarComponent,
    CalificacionConocimientosComponent,
    FechasComponent,
    TribunalesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
