import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConvocatoriaComponent } from './form-convocatoria.component';

describe('FormConvocatoriaDocenciaComponent', () => {
  let component: FormConvocatoriaComponent;
  let fixture: ComponentFixture<FormConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
