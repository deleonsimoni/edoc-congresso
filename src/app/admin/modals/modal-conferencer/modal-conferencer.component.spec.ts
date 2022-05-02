import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConferencerComponent } from './modal-conferencer.component';

describe('ModalConferencerComponent', () => {
  let component: ModalConferencerComponent;
  let fixture: ComponentFixture<ModalConferencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConferencerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConferencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
