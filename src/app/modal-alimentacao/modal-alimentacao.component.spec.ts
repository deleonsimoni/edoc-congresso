import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlimentacaoComponent } from './modal-alimentacao.component';

describe('ModalAlimentacaoComponent', () => {
  let component: ModalAlimentacaoComponent;
  let fixture: ComponentFixture<ModalAlimentacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAlimentacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
