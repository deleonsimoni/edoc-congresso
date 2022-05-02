import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacaoAbertaComponent } from './programacao-aberta.component';

describe('ProgramacaoAbertaComponent', () => {
  let component: ProgramacaoAbertaComponent;
  let fixture: ComponentFixture<ProgramacaoAbertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramacaoAbertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacaoAbertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
