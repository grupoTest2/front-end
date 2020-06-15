import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionConocimientosComponent } from './calificacion-conocimientos.component';

describe('CalificacionConocimientosComponent', () => {
  let component: CalificacionConocimientosComponent;
  let fixture: ComponentFixture<CalificacionConocimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionConocimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionConocimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
