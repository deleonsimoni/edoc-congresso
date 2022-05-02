import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaVirtualComponent } from './secretaria-virtual.component';

describe('SecretariaVirtualComponent', () => {
  let component: SecretariaVirtualComponent;
  let fixture: ComponentFixture<SecretariaVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretariaVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretariaVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
