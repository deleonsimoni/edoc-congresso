import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalApoiadoresComponent } from './modal-apoiadores.component';

describe('ModalApoiadoresComponent', () => {
  let component: ModalApoiadoresComponent;
  let fixture: ComponentFixture<ModalApoiadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalApoiadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalApoiadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
