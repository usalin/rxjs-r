import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PokemonDetailedDisplayInfoInterface, PokemonSpeciesResultInterface } from "../models/pokemon-models";
import { capitalize } from "../utility";
import agent from "../agent";

const Pokemon = () => {
   const { id } = useParams<{ id: string }>();
   const [pokemon, setPokemon] = useState<PokemonDetailedDisplayInfoInterface>();
   const [species, setSpecies] = useState<PokemonSpeciesResultInterface>();

   useEffect(() => {
     const subscription = agent.Pokemon.getPokemonDetailedById(id!)
         .subscribe(
            (data: [PokemonDetailedDisplayInfoInterface, PokemonSpeciesResultInterface]) => {
               setPokemon(data[0]);
               setSpecies(data[1]);
            }
         );
         return () => {
            subscription.unsubscribe();
         }
   }, []);

   return (
      <div className="detail-container">
         <div className={`detail-card-container background-${pokemon?.type}`}>
            <div className="image-container">
               <img src={pokemon?.imageUrl} alt={pokemon?.name} />
            </div>
            <div className="info-container">
               <div className="name-container">
                  #{pokemon?.id} - {capitalize(pokemon?.name)}
               </div>
               <div className="description-container">
                  {species?.description}
                  Found in {species?.habitat}.
               </div>
            </div>
            <Link to='/' className={`link background-${pokemon?.type}`}>Back  to List</Link>
         </div>
      </div>
   )
};

export default Pokemon;