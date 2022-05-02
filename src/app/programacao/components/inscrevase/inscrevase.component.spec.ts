import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscrevaseComponent } from './inscrevase.component';

describe('InscrevaseComponent', () => {
  let component: InscrevaseComponent;
  let fixture: ComponentFixture<InscrevaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscrevaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscrevaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
