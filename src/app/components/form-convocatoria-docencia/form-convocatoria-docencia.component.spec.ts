import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConvocatoriaDocenciaComponent } from './form-convocatoria-docencia.component';

describe('FormConvocatoriaDocenciaComponent', () => {
  let component: FormConvocatoriaDocenciaComponent;
  let fixture: ComponentFixture<FormConvocatoriaDocenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConvocatoriaDocenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConvocatoriaDocenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
