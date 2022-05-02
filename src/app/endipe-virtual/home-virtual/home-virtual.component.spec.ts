import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVirtualComponent } from './home-virtual.component';

describe('HomeVirtualComponent', () => {
  let component: HomeVirtualComponent;
  let fixture: ComponentFixture<HomeVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
