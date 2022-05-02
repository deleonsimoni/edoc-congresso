import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVirtualComponent } from './live-virtual.component';

describe('LiveVirtualComponent', () => {
  let component: LiveVirtualComponent;
  let fixture: ComponentFixture<LiveVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
