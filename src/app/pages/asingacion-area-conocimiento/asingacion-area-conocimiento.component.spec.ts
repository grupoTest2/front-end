import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsingacionAreaConocimientoComponent } from './asingacion-area-conocimiento.component';

describe('AsingacionAreaConocimientoComponent', () => {
  let component: AsingacionAreaConocimientoComponent;
  let fixture: ComponentFixture<AsingacionAreaConocimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsingacionAreaConocimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsingacionAreaConocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
