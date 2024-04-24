import { Pokemon, PokemonClient } from 'pokenode-ts';

const pokemonApi = new PokemonClient();

export async function fetchPokemonList(offset = 0, limit = 20) {
    try {
        const { results, count } = await pokemonApi.listPokemons(offset, limit);
        const pokemonList = await Promise.allSettled(
            results.map(({ name }) => pokemonApi.getPokemonByName(name))
        );
        console.log('total number of resources', count);
        const list = pokemonList
            .reduce((accumulator, result) => result.status === 'fulfilled' ? [...accumulator, result.value] : accumulator, [] as Pokemon[]);
        return list;
    } catch (e) {
        throw new Error('Failed to fetch pokemon list');
    }
}
