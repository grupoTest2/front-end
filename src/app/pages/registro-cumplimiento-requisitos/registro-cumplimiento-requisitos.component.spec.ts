import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCumplimientoRequisitosComponent } from './registro-cumplimiento-requisitos.component';

describe('RegistroCumplimientoRequisitosComponent', () => {
  let component: RegistroCumplimientoRequisitosComponent;
  let fixture: ComponentFixture<RegistroCumplimientoRequisitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCumplimientoRequisitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCumplimientoRequisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
