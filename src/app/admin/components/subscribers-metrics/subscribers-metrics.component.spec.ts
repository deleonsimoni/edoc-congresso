import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersMetricsComponent } from './subscribers-metrics.component';

describe('SubscribersMetricsComponent', () => {
  let component: SubscribersMetricsComponent;
  let fixture: ComponentFixture<SubscribersMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribersMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribersMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
