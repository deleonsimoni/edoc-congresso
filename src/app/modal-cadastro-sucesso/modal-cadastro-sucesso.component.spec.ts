import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroSucessoComponent } from './modal-cadastro-sucesso.component';

describe('ModalCadastroSucessoComponent', () => {
  let component: ModalCadastroSucessoComponent;
  let fixture: ComponentFixture<ModalCadastroSucessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCadastroSucessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCadastroSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
