import { Link } from "react-router-dom";
import { PokemonListLimitedResult } from "../models/pokemon-list-models";
import '../styles/pokemon.scss';
import { capitalize } from "../utility";

interface Props {
   pokemon: PokemonListLimitedResult;
}

const PokemonCard = ({ pokemon }: Props) => {
   return (
      <div className="card-container">
         <div className="img-container">
            <Link to={`${pokemon.id}`}>
               <img src={pokemon.imageUrl} alt={pokemon.name} />
            </Link>
         </div>
         <div className="name-container">
            # {pokemon.id} -{capitalize(pokemon.name)}
         </div>
         <div className="type-container">
            {capitalize(pokemon.type)}
         </div>
      </div>
   )
}

export default PokemonCard;