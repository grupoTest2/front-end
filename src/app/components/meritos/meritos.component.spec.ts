import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeritosComponent } from './meritos.component';

describe('MeritosComponent', () => {
  let component: MeritosComponent;
  let fixture: ComponentFixture<MeritosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeritosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
