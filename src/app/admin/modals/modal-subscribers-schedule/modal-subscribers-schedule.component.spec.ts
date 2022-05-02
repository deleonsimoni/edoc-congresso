import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSubscribersScheduleComponent } from './modal-subscribers-schedule.component';

describe('ModalSubscribersScheduleComponent', () => {
  let component: ModalSubscribersScheduleComponent;
  let fixture: ComponentFixture<ModalSubscribersScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSubscribersScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSubscribersScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
