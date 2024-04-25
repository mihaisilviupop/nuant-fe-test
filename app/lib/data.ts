import { Pokemon, PokemonClient } from 'pokenode-ts';

const pokemonApi = new PokemonClient();

const PAGE_LIMIT = 20;

export async function fetchPokemonList(currentPage = 0, limit = PAGE_LIMIT) {
    try {
        const { results } = await pokemonApi.listPokemons(currentPage * PAGE_LIMIT, limit);

        const pokemonListPromiseResultList = await Promise.allSettled(
            results.map(({ name }) => pokemonApi.getPokemonByName(name))
        );

        const pokemonList = pokemonListPromiseResultList
            .reduce((accumulator, result) => result.status === 'fulfilled' ? [...accumulator, result.value] : accumulator, [] as Pokemon[]);

        return pokemonList
    } catch (e) {
        throw new Error('Failed to fetch pokemon list');
    }
}

export async function getPokemonListTotalPages() {
    try {
        const { count } = await pokemonApi.listPokemons();
        return count / PAGE_LIMIT;
    } catch (e) {
        throw new Error('Failed to fetch pokemon total pages number');
    }

}
