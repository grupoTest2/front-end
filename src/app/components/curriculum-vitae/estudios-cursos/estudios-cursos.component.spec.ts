import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiosCursosComponent } from './estudios-cursos.component';

describe('EstudiosCursosComponent', () => {
  let component: EstudiosCursosComponent;
  let fixture: ComponentFixture<EstudiosCursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiosCursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiosCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
