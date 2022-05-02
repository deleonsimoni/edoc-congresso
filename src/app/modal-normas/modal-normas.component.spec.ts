import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNormasComponent } from './modal-normas.component';

describe('ModalNormasComponent', () => {
  let component: ModalNormasComponent;
  let fixture: ComponentFixture<ModalNormasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNormasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNormasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
