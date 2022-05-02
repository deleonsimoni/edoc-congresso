import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConferencistasComponent } from './modal-conferencistas.component';

describe('ModalConferencistasComponent', () => {
  let component: ModalConferencistasComponent;
  let fixture: ComponentFixture<ModalConferencistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConferencistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConferencistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
