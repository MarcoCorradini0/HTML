import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GranPremi } from './gran-premi';

describe('GranPremi', () => {
  let component: GranPremi;
  let fixture: ComponentFixture<GranPremi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GranPremi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GranPremi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
