import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferencerCardComponent } from './conferencer-card.component';

describe('ConferencerCardComponent', () => {
  let component: ConferencerCardComponent;
  let fixture: ComponentFixture<ConferencerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferencerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferencerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
