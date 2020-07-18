import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionRequisitosComponent } from './evaluacion-requisitos.component';

describe('EvaluacionRequisitosComponent', () => {
  let component: EvaluacionRequisitosComponent;
  let fixture: ComponentFixture<EvaluacionRequisitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionRequisitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionRequisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
