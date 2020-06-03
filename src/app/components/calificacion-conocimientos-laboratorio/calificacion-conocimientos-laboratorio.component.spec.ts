import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionConocimientosLaboratorioComponent } from './calificacion-conocimientos-laboratorio.component';

describe('CalificacionConocimientosLaboratorioComponent', () => {
  let component: CalificacionConocimientosLaboratorioComponent;
  let fixture: ComponentFixture<CalificacionConocimientosLaboratorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionConocimientosLaboratorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionConocimientosLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
