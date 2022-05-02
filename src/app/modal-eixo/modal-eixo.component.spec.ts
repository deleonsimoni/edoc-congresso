import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEixoComponent } from './modal-eixo.component';

describe('ModalEixoComponent', () => {
  let component: ModalEixoComponent;
  let fixture: ComponentFixture<ModalEixoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEixoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
