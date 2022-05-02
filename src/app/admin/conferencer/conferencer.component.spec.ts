import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferencerComponent } from './conferencer.component';

describe('ConferencerComponent', () => {
  let component: ConferencerComponent;
  let fixture: ComponentFixture<ConferencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConferencerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
