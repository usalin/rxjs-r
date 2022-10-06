import { useEffect, useState } from "react";
import agent from "../agent";
import {  PokemonListLimitedResult } from "../models/pokemon-list-models";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
   const [limitedListData, setData] = useState<PokemonListLimitedResult[]>();

   useEffect(() => {
      const subscription = agent.Pokemon.getPokemonListResults
            .subscribe((data: PokemonListLimitedResult[]) => {
               setData(data)
            });

      return () => {
         subscription.unsubscribe();
      }
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