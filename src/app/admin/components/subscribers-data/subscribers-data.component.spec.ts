import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersDataComponent } from './subscribers-data.component';

describe('SubscribersDataComponent', () => {
  let component: SubscribersDataComponent;
  let fixture: ComponentFixture<SubscribersDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribersDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
