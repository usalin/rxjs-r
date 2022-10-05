
/**
 * POKEMON SPECIES MODELS
 */
export interface Color {
   name: string;
   url: string;
}

export interface EggGroup {
   name: string;
   url: string;
}

export interface FlavorTextEntry {
   flavor_text: string;
}
export interface Genera {
   genus: string;
}

export interface Habitat {
   name: string;
   url: string;
}

export interface Name {
   name: string;
}

export interface Area {
   name: string;
   url: string;
}

export interface Pokedex {
   name: string;
   url: string;
}

export interface PokedexNumber {
   entry_number: number;
   pokedex: Pokedex;
}

export interface Shape {
   name: string;
   url: string;
}

export interface Pokemon {
   name: string;
   url: string;
}

export interface PokemonSpeciesResult {
   base_happiness: number;
   capture_rate: number;
   color: Color;
   egg_groups: EggGroup[];
   flavor_text_entries: FlavorTextEntry[];
   form_descriptions: any[];
   forms_switchable: boolean;
   gender_rate: number;
   genera: Genera[];
   habitat: Habitat;
   has_gender_differences: boolean;
   hatch_counter: number;
   id: number;
   is_baby: boolean;
   is_legendary: boolean;
   is_mythical: boolean;
   name: string;
   names: Name[];
   order: number;
   pokedex_numbers: PokedexNumber[];
   shape: Shape;
}

export interface PokemonDetailedDisplayInfoInterface {
   id: number;
   name: string;
   height: number;
   weight: number;
   imageUrl: string;
   type: string;
 }
 
 export interface PokemonSpeciesResultInterface {
   habitat: string;
   description: string;
 }