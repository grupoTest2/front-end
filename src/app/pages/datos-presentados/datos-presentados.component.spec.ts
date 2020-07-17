import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPresentadosComponent } from './datos-presentados.component';

describe('DatosPresentadosComponent', () => {
  let component: DatosPresentadosComponent;
  let fixture: ComponentFixture<DatosPresentadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPresentadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPresentadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
