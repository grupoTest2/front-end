import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { crearConvocatoriaComponent } from './crearConvocatoria.component';

describe('crearConvocatoriaComponent', () => {
  let component: crearConvocatoriaComponent;
  let fixture: ComponentFixture<crearConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ crearConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(crearConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
