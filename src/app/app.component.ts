import { Component } from '@angular/core';

import { PokedexService } from './pokedex.service'
import { Pokemon } from './pokemon'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //initialize list
  pokemon: Pokemon[] = [];

  isLoading: boolean = false;
  error: boolean = true;

  //Inject Pokemon service
  constructor(private pokedexService:PokedexService) {}
  
  ngOnInit(){
    //Load initial data
    this.loadMore();
  }

  loadMore(){
    this.isLoading = true;

    //use the pokemon service to load the next 9 pokemons
    this.pokedexService.getPokemon(this.pokemon.length, 9)
      .then(pokemon => {
        pokemon = pokemon.map(p => {
          p.imageLoaded = false;
          return p;
        });
        //if loading was successful, we append the result to the list
        this.pokemon = this.pokemon.concat(pokemon);
        this.isLoading = false;
        this.error = false;
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
      })
  }
}
