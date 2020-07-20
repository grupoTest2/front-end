import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionDocumentosPostulanteComponent } from './recepcion-documentos-postulante.component';

describe('RecepcionDocumentosPostulanteComponent', () => {
  let component: RecepcionDocumentosPostulanteComponent;
  let fixture: ComponentFixture<RecepcionDocumentosPostulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionDocumentosPostulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionDocumentosPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
