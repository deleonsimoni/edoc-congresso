import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoLivrosComponent } from './lancamento-livros.component';

describe('LancamentoLivrosComponent', () => {
  let component: LancamentoLivrosComponent;
  let fixture: ComponentFixture<LancamentoLivrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancamentoLivrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
