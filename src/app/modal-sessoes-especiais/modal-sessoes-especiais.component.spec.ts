import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSessoesEspeciaisComponent } from './modal-sessoes-especiais.component';

describe('ModalSessoesEspeciaisComponent', () => {
  let component: ModalSessoesEspeciaisComponent;
  let fixture: ComponentFixture<ModalSessoesEspeciaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSessoesEspeciaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSessoesEspeciaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
