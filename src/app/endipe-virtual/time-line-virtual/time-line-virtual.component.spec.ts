import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineVirtualComponent } from './time-line-virtual.component';

describe('TimeLineVirtualComponent', () => {
  let component: TimeLineVirtualComponent;
  let fixture: ComponentFixture<TimeLineVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLineVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
