import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCreate } from './session-create';

describe('SessionCreate', () => {
  let component: SessionCreate;
  let fixture: ComponentFixture<SessionCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
