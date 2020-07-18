import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriasAsignadasComponent } from './convocatorias-asignadas.component';

describe('ConvocatoriasAsignadasComponent', () => {
  let component: ConvocatoriasAsignadasComponent;
  let fixture: ComponentFixture<ConvocatoriasAsignadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriasAsignadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriasAsignadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
