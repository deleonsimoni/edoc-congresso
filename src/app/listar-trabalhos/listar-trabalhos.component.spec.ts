import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTrabalhosComponent } from './listar-trabalhos.component';

describe('ListarTrabalhosComponent', () => {
  let component: ListarTrabalhosComponent;
  let fixture: ComponentFixture<ListarTrabalhosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTrabalhosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTrabalhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
