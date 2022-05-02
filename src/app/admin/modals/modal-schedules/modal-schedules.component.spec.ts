import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSchedulesComponent } from './modal-schedules.component';

describe('ModalSchedulesComponent', () => {
  let component: ModalSchedulesComponent;
  let fixture: ComponentFixture<ModalSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
