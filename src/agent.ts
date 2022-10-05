import { map, mergeMap, forkJoin, Observable } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { IndividulPokemonGeneralResult, PokemonListLimitedResult, PokemonListResult, Result } from "./models/pokemon-list-models";
import { PokemonDetailedDisplayInfoInterface, PokemonSpeciesResult } from "./models/pokemon-models";

const Pokemon = {
   getPokemonListResults:
      fromFetch<PokemonListResult>('https://pokeapi.co/api/v2/pokemon', {
         selector: response => response.json()
      }).pipe(
         map((listResult: PokemonListResult) => listResult.results),
         mergeMap((results: Result[]) =>
            forkJoin(results.map((result) => getPokemonByUrl(result.url)))
         )
      ),
   getPokemonDetailedById(id: string) {
      const pokemonDetail = getPokemonDetailById(id);
      const species = getPokemonSpeciesById(id);
      return forkJoin([pokemonDetail, species]);
   }
}

/**
 * Get Pokemon General Info By ID 
 * */
function getPokemonByUrl(url: string): Observable<PokemonListLimitedResult> {
   return fromFetch<IndividulPokemonGeneralResult>(url,
      { selector: response => response.json() }
   ).pipe(
      map((data: IndividulPokemonGeneralResult) => {
         const imageUrl = data.sprites.front_default;
         const id = data.id;
         const type = data.types[0].type.name;
         const name = data.name;

         return { id, name, type, imageUrl };
      })
   );
}


/**
 * Get Pokemon Detailed Info By ID 
 * */

function getPokemonDetailById(id: string) {
   return fromFetch<IndividulPokemonGeneralResult>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
      { selector: response => response.json() }
   ).pipe(
      map((data: IndividulPokemonGeneralResult) => {
         const { id, name, sprites, types, weight, height } = data;
         const detailedInfo: PokemonDetailedDisplayInfoInterface = {
            id,
            name,
            height,
            weight,
            imageUrl: sprites.other.dream_world.front_default,
            type: types[0].type?.name,
         };
         return detailedInfo;
      })
   );
}

function getPokemonSpeciesById(id: string) {
   return fromFetch<PokemonSpeciesResult>(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
      { selector: response => response.json() }
   ).pipe(
      map((data: PokemonSpeciesResult) => {
         const { habitat, flavor_text_entries } = data;
         const habitatText = habitat.name;
         const decriptiveText = flavor_text_entries[0].flavor_text.replace(
            /\f/g,
            ' '
         );
         return { habitat: habitatText, description: decriptiveText };
      })
   );
}

const agent = {
   Pokemon
};

export default agent;