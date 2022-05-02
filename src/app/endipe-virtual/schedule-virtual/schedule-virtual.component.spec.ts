import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleVirtualComponent } from './schedule-virtual.component';

describe('ScheduleVirtualComponent', () => {
  let component: ScheduleVirtualComponent;
  let fixture: ComponentFixture<ScheduleVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
