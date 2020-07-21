import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionRequisitosPostulanteComponent } from './evaluacion-requisitos-postulante.component';

describe('EvaluacionRequisitosPostulanteComponent', () => {
  let component: EvaluacionRequisitosPostulanteComponent;
  let fixture: ComponentFixture<EvaluacionRequisitosPostulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionRequisitosPostulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionRequisitosPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
