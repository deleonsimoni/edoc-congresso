import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProgramacaoComponent } from './modal-programacao.component';

describe('ModalProgramacaoComponent', () => {
  let component: ModalProgramacaoComponent;
  let fixture: ComponentFixture<ModalProgramacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProgramacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProgramacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
