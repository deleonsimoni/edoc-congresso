import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnaisComponent } from './modal-anais.component';

describe('ModalAnaisComponent', () => {
  let component: ModalAnaisComponent;
  let fixture: ComponentFixture<ModalAnaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAnaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAnaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
