import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosRotuloComponent } from './documentos-rotulo.component';

describe('DocumentosRotuloComponent', () => {
  let component: DocumentosRotuloComponent;
  let fixture: ComponentFixture<DocumentosRotuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosRotuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosRotuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
