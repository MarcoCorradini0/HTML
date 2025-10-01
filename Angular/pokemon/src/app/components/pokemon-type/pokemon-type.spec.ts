import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonType } from './pokemon-type';

describe('PokemonType', () => {
  let component: PokemonType;
  let fixture: ComponentFixture<PokemonType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
