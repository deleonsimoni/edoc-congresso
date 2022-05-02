import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDataComponent } from './work-data.component';

describe('WorkDataComponent', () => {
  let component: WorkDataComponent;
  let fixture: ComponentFixture<WorkDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkDataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
