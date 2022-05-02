import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaisVirtualComponent } from './anais-virtual.component';

describe('AnaisVirtualComponent', () => {
  let component: AnaisVirtualComponent;
  let fixture: ComponentFixture<AnaisVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaisVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaisVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
