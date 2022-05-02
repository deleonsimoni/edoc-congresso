import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuEndipeComponent } from './meu-endipe.component';

describe('MeuEndipeComponent', () => {
  let component: MeuEndipeComponent;
  let fixture: ComponentFixture<MeuEndipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeuEndipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuEndipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
