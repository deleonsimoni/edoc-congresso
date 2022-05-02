import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReviewerComponent } from './modal-reviewer.component';

describe('ModalReviewerComponent', () => {
  let component: ModalReviewerComponent;
  let fixture: ComponentFixture<ModalReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
