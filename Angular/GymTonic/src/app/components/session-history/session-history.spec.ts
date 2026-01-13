import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHistory } from './session-history';

describe('SessionHistory', () => {
  let component: SessionHistory;
  let fixture: ComponentFixture<SessionHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
