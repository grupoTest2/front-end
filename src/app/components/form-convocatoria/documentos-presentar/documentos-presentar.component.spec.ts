import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosPresentarComponent } from './documentos-presentar.component';

describe('DocumentosPresentarComponent', () => {
  let component: DocumentosPresentarComponent;
  let fixture: ComponentFixture<DocumentosPresentarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosPresentarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosPresentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
