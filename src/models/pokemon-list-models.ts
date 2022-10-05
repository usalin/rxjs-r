/**
 * @returns
 * POKEMON LIST LIMITED DATA
 */

export interface Result {
   name: string;
   url: string;
}

export interface PokemonListResult {
   count: number;
   next: string;
   previous?: any;
   results: Result[];
}

/**
 * @returns
 * DETAILED POKEMON DATA
 */

 export interface Ability2 {
   name: string;
   url: string;
}

export interface Ability {
   ability: Ability2;
   is_hidden: boolean;
   slot: number;
}

export interface Form {
   name: string;
   url: string;
}

export interface Species {
   name: string;
   url: string;
}

export interface DreamWorld {
   front_default: string;
   front_female?: any;
}
export interface Other {
   dream_world: DreamWorld;
}

export interface Icons {
   front_default: string;
   front_female?: any;
}


export interface Sprites {
   back_default: string;
   back_female: string;
   back_shiny: string;
   back_shiny_female: string;
   front_default: string;
   front_female: string;
   front_shiny: string;
   front_shiny_female: string;
   other: Other;
}

export interface Stat2 {
   name: string;
   url: string;
}

export interface Stat {
   base_stat: number;
   effort: number;
   stat: Stat2;
}

export interface Type2 {
   name: string;
   url: string;
}

export interface Type {
   slot: number;
   type: Type2;
}

export interface IndividulPokemonGeneralResult {
   abilities: Ability[];
   base_experience: number;
   forms: Form[];
   height: number;
   held_items: any[];
   id: number;
   is_default: boolean;
   location_area_encounters: string;
   name: string;
   order: number;
   past_types: any[];
   species: Species;
   sprites: Sprites;
   stats: Stat[];
   types: Type[];
   weight: number;
}

export interface PokemonListLimitedResult {
   id: number;
   type: string;
   imageUrl: string;
   name: string;
 }
