import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTurismoComponent } from './modal-turismo.component';

describe('ModalTurismoComponent', () => {
  let component: ModalTurismoComponent;
  let fixture: ComponentFixture<ModalTurismoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTurismoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTurismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
