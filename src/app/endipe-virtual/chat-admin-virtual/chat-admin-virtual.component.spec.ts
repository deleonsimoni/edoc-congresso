import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatVirtualComponent } from './chat-admin-virtual.component';

describe('ChatVirtualComponent', () => {
  let component: ChatVirtualComponent;
  let fixture: ComponentFixture<ChatVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
