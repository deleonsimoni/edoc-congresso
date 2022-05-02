import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReviewReviewerComponent } from './modal-review-reviewer.component';

describe('ModalReviewReviewerComponent', () => {
  let component: ModalReviewReviewerComponent;
  let fixture: ComponentFixture<ModalReviewReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReviewReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReviewReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
