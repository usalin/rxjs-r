import { Link } from "react-router-dom";
import { PokemonListLimitedResult } from "../models/pokemon-list";

interface Props {
   pokemon: PokemonListLimitedResult;
}

const PokemonCard = ({ pokemon }: Props) => {
   return (
      <div className="card-container">
         <div className="title-container">
            {pokemon.name}
         </div>
         <div className="info-container">
            <img src={pokemon.imageUrl} alt={pokemon.name} />
         </div>
         <Link to={`${pokemon.id}`}>
            {"Already have an account? Sign In"}
         </Link>
      </div>
   )
}

export default PokemonCard;