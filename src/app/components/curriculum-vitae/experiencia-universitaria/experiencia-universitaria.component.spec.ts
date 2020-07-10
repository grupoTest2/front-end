import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaUniversitariaComponent } from './experiencia-universitaria.component';

describe('ExperienciaUniversitariaComponent', () => {
  let component: ExperienciaUniversitariaComponent;
  let fixture: ComponentFixture<ExperienciaUniversitariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienciaUniversitariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienciaUniversitariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
