import { useEffect, useState } from "react";
import { forkJoin, Observable, of } from "rxjs";
import { fromFetch } from 'rxjs/fetch';
import { map, mergeMap } from "rxjs/operators";
import { IndividulPokemonGeneralResult, PokemonListLimitedResult, PokemonListResult, Result } from "../models/pokemon-list";

const PokemonList = () => {
   const [data, setData] = useState<PokemonListResult[]>();

   useEffect(() => {
      fromFetch<PokemonListResult>('https://pokeapi.co/api/v2/pokemon', {
         selector: response => response.json()
      }).pipe(
         map((listResult: PokemonListResult) => listResult.results),
         mergeMap((results: Result[]) => 
         forkJoin(results.map((result) => getPokemonByUrl(result.url)))
         )
      ).subscribe((data) => {
         console.log(data);
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
  
          return  {id, name, type, imageUrl };
        })
      );
    }

   return (
      <div>
         <header>Pokemon List</header>
         <div className="list-container">
            {
               // data?.results.map(item => (
               //    <div key={item.name} className="card-container">
               //       <div className="title-container">
               //          {item.name}
               //       </div>
               //       <div className="info-container">
               //          {item.url}
               //       </div>
               //    </div>
               // ))
            }
         </div>
      </div>
   )
};


export default PokemonList;