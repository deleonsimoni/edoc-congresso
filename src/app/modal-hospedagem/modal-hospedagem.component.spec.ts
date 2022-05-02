import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHospedagemComponent } from './modal-hospedagem.component';

describe('ModalHospedagemComponent', () => {
  let component: ModalHospedagemComponent;
  let fixture: ComponentFixture<ModalHospedagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHospedagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHospedagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
