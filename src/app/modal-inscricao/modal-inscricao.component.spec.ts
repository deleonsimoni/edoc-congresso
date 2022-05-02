import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInscricaoComponent } from './modal-inscricao.component';

describe('ModalInscricaoComponent', () => {
  let component: ModalInscricaoComponent;
  let fixture: ComponentFixture<ModalInscricaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInscricaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
