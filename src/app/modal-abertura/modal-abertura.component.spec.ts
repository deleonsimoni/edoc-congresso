import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAberturaComponent } from './modal-abertura.component';

describe('ModalAberturaComponent', () => {
  let component: ModalAberturaComponent;
  let fixture: ComponentFixture<ModalAberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
