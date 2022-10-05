import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { forkJoin, map } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { IndividulPokemonGeneralResult } from "../models/pokemon-list-models";
import { PokemonDetailedDisplayInfoInterface, PokemonSpeciesResult, PokemonSpeciesResultInterface } from "../models/pokemon-models";

const Pokemon = () => {
   const {id} = useParams<{id: string}>();
   const [pokemon, setPokemon] = useState<PokemonDetailedDisplayInfoInterface>();
   const [species, setSpecies] = useState<PokemonSpeciesResultInterface>();


   useEffect(() => {
      getPokemonDetailedById(id!).subscribe(
         (data: [PokemonDetailedDisplayInfoInterface, PokemonSpeciesResultInterface ]) => {
            setPokemon(data[0]);
            setSpecies(data[1]);
         }
      );
   });

   function getPokemonDetailedById(id: string) {
      const pokemonDetail = getPokemonDetailById(id);
      const species = getPokemonSpeciesById(id);
      return forkJoin([pokemonDetail, species]);
   }

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

   return(
      <div className="detail-container">
          <div className="card-container background-${pokemon?.type}$">
            <div className="image-container">
               <img src={pokemon?.imageUrl} alt={pokemon?.name} />
            </div>

            <div className="info-container">
               <div className="name-container">
                  #{ pokemon?.id} - { pokemon?.name }
               </div>

               <div className="description-container">
                  { species?.description}
                  Found in { species?.habitat}.
               </div>
            </div>
         </div>

         <button className="background-{ pokemon?.type }">Back  to List</button>
         </div>
      

   )
};


export default Pokemon;