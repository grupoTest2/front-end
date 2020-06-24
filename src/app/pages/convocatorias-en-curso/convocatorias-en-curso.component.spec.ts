import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriasEnCursoComponent } from './convocatorias-en-curso.component';

describe('ConvocatoriasEnCursoComponent', () => {
  let component: ConvocatoriasEnCursoComponent;
  let fixture: ComponentFixture<ConvocatoriasEnCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriasEnCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriasEnCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
