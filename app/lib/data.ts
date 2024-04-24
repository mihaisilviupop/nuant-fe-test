import { PokemonClient } from 'pokenode-ts';

const pokemonApi = new PokemonClient();

export async function fetchPokemonList() {
    try {
        const { results, count } = await pokemonApi.listPokemons(0, 20); // TODO change this hardcoded value 
        console.log('total number of resources', count);
        return results.map(({ name }) => name);
    } catch (e) {
        throw new Error('Failed to fetch pokemon list');
    }
}
