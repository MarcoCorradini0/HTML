import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GranPremio } from './gran-premio';

describe('GranPremio', () => {
  let component: GranPremio;
  let fixture: ComponentFixture<GranPremio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GranPremio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GranPremio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
