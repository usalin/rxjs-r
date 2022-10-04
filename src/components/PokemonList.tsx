import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { forkJoin, Observable, of } from "rxjs";
import { fromFetch } from 'rxjs/fetch';
import { map, mergeMap } from "rxjs/operators";
import { IndividulPokemonGeneralResult, PokemonListLimitedResult, PokemonListResult, Result } from "../models/pokemon-list";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
   const [limitedListData, setData] = useState<PokemonListLimitedResult[]>();

   useEffect(() => {
      fromFetch<PokemonListResult>('https://pokeapi.co/api/v2/pokemon', {
         selector: response => response.json()
      }).pipe(
         map((listResult: PokemonListResult) => listResult.results),
         mergeMap((results: Result[]) =>
            forkJoin(results.map((result) => getPokemonByUrl(result.url)))
         )
      ).subscribe((data: PokemonListLimitedResult[]) => {
         setData(data)
      });
   }, []);

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

   return (
      <div>
         <header>Pokemon List</header>
         <div className="list-container">
            {
               limitedListData?.map(pokemon => (
                  <PokemonCard key={pokemon.name} pokemon={pokemon} />
               ))
            }
         </div>
      </div>
   )
};


export default PokemonList;