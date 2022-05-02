import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBemVindoComponent } from './modal-bem-vindo.component';

describe('ModalBemVindoComponent', () => {
  let component: ModalBemVindoComponent;
  let fixture: ComponentFixture<ModalBemVindoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBemVindoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBemVindoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
