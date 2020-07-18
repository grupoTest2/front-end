import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRequisitosPresentadosComponent } from './registro-requisitos-presentados.component';

describe('RegistroRequisitosPresentadosComponent', () => {
  let component: RegistroRequisitosPresentadosComponent;
  let fixture: ComponentFixture<RegistroRequisitosPresentadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRequisitosPresentadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRequisitosPresentadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
