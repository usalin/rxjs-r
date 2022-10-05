import { useEffect, useState } from "react";
import { Subject, takeUntil } from "rxjs";
import agent from "../agent";
import {  PokemonListLimitedResult } from "../models/pokemon-list-models";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
   const [limitedListData, setData] = useState<PokemonListLimitedResult[]>();
   const destroy$ = new Subject();

   useEffect(() => {
       agent.Pokemon.getPokemonListResults
      .pipe(takeUntil(destroy$))
      .subscribe((data: PokemonListLimitedResult[]) => {
         setData(data)
      });
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div>
         <header>
            <h1>Pokemon List</h1>
         </header>
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