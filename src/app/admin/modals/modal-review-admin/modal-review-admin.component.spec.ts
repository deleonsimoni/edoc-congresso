import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReviewAdminComponent } from './modal-review-admin.component';

describe('ModalReviewAdminComponent', () => {
  let component: ModalReviewAdminComponent;
  let fixture: ComponentFixture<ModalReviewAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReviewAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReviewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
