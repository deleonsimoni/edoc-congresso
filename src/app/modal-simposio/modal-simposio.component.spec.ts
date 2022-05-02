import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSimposioComponent } from './modal-simposio.component';

describe('ModalSimposioComponent', () => {
  let component: ModalSimposioComponent;
  let fixture: ComponentFixture<ModalSimposioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSimposioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSimposioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
