import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConvocatoriaComponent } from './editar-convocatoria.component';

describe('EditarConvocatoriaComponent', () => {
  let component: EditarConvocatoriaComponent;
  let fixture: ComponentFixture<EditarConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
