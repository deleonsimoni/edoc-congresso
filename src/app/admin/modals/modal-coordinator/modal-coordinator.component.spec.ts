import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCoordinatorComponent } from './modal-coordinator.component';

describe('ModalCoordinatorComponent', () => {
  let component: ModalCoordinatorComponent;
  let fixture: ComponentFixture<ModalCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
