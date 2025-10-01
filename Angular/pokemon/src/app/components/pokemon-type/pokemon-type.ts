import { Component, input, computed } from '@angular/core';
import { PokemonType } from '../../../pokemon-type';
import { Pokemon } from '../../app';
import { NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-type',
  standalone: true,
  imports: [TitleCasePipe, NgFor],
  templateUrl: './pokemon-type.html',
  styleUrl: './pokemon-type.css'
})

export class PokemonTypeComponent {
    type = input.required<PokemonType>();
    pokemonList = input.required<Pokemon[]>();
    filteredPokemon = this.pokemonList().filter(pokemon => pokemon.typeId === this.type().id);
}
