import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewListWorksComponent } from './review-list-works.component';

describe('ReviewListWorksComponent', () => {
  let component: ReviewListWorksComponent;
  let fixture: ComponentFixture<ReviewListWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewListWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewListWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
