import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTemplates } from './session-templates';

describe('SessionTemplates', () => {
  let component: SessionTemplates;
  let fixture: ComponentFixture<SessionTemplates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionTemplates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionTemplates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
