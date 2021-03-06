import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { DatosRotuloComponent } from './components/form-convocatoria/datos-rotulo/datos-rotulo.component';
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
//convertir pdf
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { AsingacionAreaConocimientoComponent } from './pages/asingacion-area-conocimiento/asingacion-area-conocimiento.component';
import { CurriculumVitaeComponent } from './pages/curriculum-vitae/curriculum-vitae.component';
import { DatosPersonalesComponent } from './components/curriculum-vitae/datos-personales/datos-personales.component';
import { FormacionAcademicaComponent } from './components/curriculum-vitae/formacion-academica/formacion-academica.component';
import { EstudiosCursosComponent } from './components/curriculum-vitae/estudios-cursos/estudios-cursos.component';
import { ExperienciaUniversitariaComponent } from './components/curriculum-vitae/experiencia-universitaria/experiencia-universitaria.component';
import { ExperienciaExtraUniversitariaComponent } from './components/curriculum-vitae/experiencia-extra-universitaria/experiencia-extra-universitaria.component';
import { ProduccionComponent } from './components/curriculum-vitae/produccion/produccion.component'; // fonts provided for pdfmake
 
//
import { MatStepperModule  } from '@angular/material/stepper';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {CdkStepperModule} from '@angular/cdk/stepper';

import { MatInputModule } from '@angular/material/input';
import { RegistroRequisitosPresentadosComponent } from './components/usuario-comision-evaluadora/registro-requisitos-presentados/registro-requisitos-presentados.component';
import { ConvocatoriasAsignadasComponent } from './components/usuario-comision-evaluadora/convocatorias-asignadas/convocatorias-asignadas.component';
import { PostulantesAsignadasComponent } from './components/usuario-comision-evaluadora/postulantes-asignadas/postulantes-asignadas.component';
import { FiltroCodSisPipe } from './pipes/postulante/filtro-cod-sis.pipe';
import { RecepcionDocumentosPostulanteComponent } from './pages/recepcion-documentos-postulante/recepcion-documentos-postulante.component';
import { EvaluacionRequisitosPostulanteComponent } from './pages/evaluacion-requisitos-postulante/evaluacion-requisitos-postulante.component';
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

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
    ConvocatoriasEnCursoComponent,
    AsingacionAreaConocimientoComponent,
    CurriculumVitaeComponent,
    DatosPersonalesComponent,
    FormacionAcademicaComponent,
    EstudiosCursosComponent,
    ExperienciaUniversitariaComponent,
    ExperienciaExtraUniversitariaComponent,
    ProduccionComponent,
    RegistroRequisitosPresentadosComponent,
    ConvocatoriasAsignadasComponent,
    PostulantesAsignadasComponent,
    FiltroCodSisPipe,
    RecepcionDocumentosPostulanteComponent,
    EvaluacionRequisitosPostulanteComponent,
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
    MatStepperModule,
    CdkStepperModule,
    MatFormFieldModule,
    MatInputModule,
    BlockUIModule.forRoot({
      template: LoadingSpinnerComponent
    })
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTabsModule,
    EditarConvocatoriaServicePhp,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  entryComponents: [
    LoadingSpinnerComponent // Make sure to add it to the entry components
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
