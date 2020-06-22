import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostulanteComponent } from './form-postulante.component';

describe('FormPostulanteComponent', () => {
  let component: FormPostulanteComponent;
  let fixture: ComponentFixture<FormPostulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPostulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
