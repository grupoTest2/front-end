import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaExtraUniversitariaComponent } from './experiencia-extra-universitaria.component';

describe('ExperienciaExtraUniversitariaComponent', () => {
  let component: ExperienciaExtraUniversitariaComponent;
  let fixture: ComponentFixture<ExperienciaExtraUniversitariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienciaExtraUniversitariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienciaExtraUniversitariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
