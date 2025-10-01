import { Component, input } from '@angular/core';
import { PokemonType } from '../../../pokemon-type';
import { Pokemon } from '../../app';

@Component({
  selector: 'app-pokemon-type',
  imports: [],
  templateUrl: './pokemon-type.html',
  styleUrl: './pokemon-type.css'
})
export class PokemonTypeComponent {
    type = input.required<PokemonType>();
    pokemonList = input.required<Pokemon[]>();
}
