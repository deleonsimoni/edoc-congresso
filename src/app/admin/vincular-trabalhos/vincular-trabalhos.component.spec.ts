import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularTrabalhosComponent } from './vincular-trabalhos.component';

describe('VincularTrabalhosComponent', () => {
  let component: VincularTrabalhosComponent;
  let fixture: ComponentFixture<VincularTrabalhosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VincularTrabalhosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VincularTrabalhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
