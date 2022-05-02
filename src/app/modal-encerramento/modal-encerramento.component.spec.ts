import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEncerramentoComponent } from './modal-encerramento.component';

describe('ModalEncerramentoComponent', () => {
  let component: ModalEncerramentoComponent;
  let fixture: ComponentFixture<ModalEncerramentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEncerramentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEncerramentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
