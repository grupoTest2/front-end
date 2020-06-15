import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TribunalesComponent } from './tribunales.component';

describe('TribunalesComponent', () => {
  let component: TribunalesComponent;
  let fixture: ComponentFixture<TribunalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TribunalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TribunalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
