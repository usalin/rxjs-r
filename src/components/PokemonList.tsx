import { useEffect, useState } from "react";
import { mergeMap} from "rxjs/operators";
import { fromFetch } from 'rxjs/fetch';



const PokemonList = () => {
   const [data, setData] = useState(null);

   useEffect(() => {
      const subscription = fromFetch('https://pokeapi.co/api/v2/pokemon')
        .pipe(
          mergeMap(response => response.json())
        )
        .subscribe(data => setData(data));
      return () => subscription.unsubscribe();
    }, []);

   return(


      <div>
            <header>PokemonList</header>
         <div className="list-container">
         
            <div className="card-container">
               <div className="title-container">
               </div>
               <div className="info-container">

               </div>

            </div>

         </div>
      </div>
   )
};


export default PokemonList;