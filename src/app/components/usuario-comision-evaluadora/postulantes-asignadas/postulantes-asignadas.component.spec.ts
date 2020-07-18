import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulantesAsignadasComponent } from './postulantes-asignadas.component';

describe('PostulantesAsignadasComponent', () => {
  let component: PostulantesAsignadasComponent;
  let fixture: ComponentFixture<PostulantesAsignadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulantesAsignadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulantesAsignadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
