import { fetchPokemonById, fetchPokemonByName, fetchPokemonTypes, fetchPokemons } from '@/app/lib/pokemon-api';
import { filterListByName, filterListByType } from '@/app/lib/utils';
import type { NamedAPIResource, Pokemon } from 'pokenode-ts';

const PAGE_LIMIT = 20;
const DEFAULT_OFFSET = 0;
const NO_PAGE_LIMIT = -1;

export async function fetchPokemonList({
    currentPage = 1,
    limit = PAGE_LIMIT,
    query = '',
    type = 'all'
}) {
    try {
        // as pagination in UI starts from 1
        // we need to substract because offset starts from 0
        let offset = (currentPage - 1) * PAGE_LIMIT;

        let results = await fetchAndFilterPokemonListByName({ offset, limit, query, type });

        let pokemonList = await fetchAndFilterPokemonListByType(results, type);

        // in case that we had a query parameter, we will not use API pagination feature
        // and we need to do it ourselves 
        if (pokemonList.length > PAGE_LIMIT) {
            pokemonList = pokemonList.slice(offset, offset + limit)
        }

        return pokemonList.map(({ id, name, sprites, types }) => {
            return {
                id,
                name,
                types,
                image: sprites.front_default ?? sprites.front_shiny
            }
        });
    } catch (e) {
        throw new Error('Failed to fetch pokemon list');
    }
}

export async function getPokemonListTotalPages(query = '', type = 'all') {
    try {
        let results: NamedAPIResource[] | Pokemon[] = await fetchAndFilterPokemonListByName({ query, type });
        if (type !== 'all') {
            results = await fetchAndFilterPokemonListByType(results, type);
        }
        return Math.ceil(results.length / PAGE_LIMIT);
    } catch (e) {
        throw new Error('Failed to fetch pokemon total pages number');
    }
}

export async function fetchPokemonTypeList() {
    try {
        const { results } = await fetchPokemonTypes();
        return results.map(({ name }) => name);
    } catch (e) {
        throw new Error('Failed to fetch pokemon type list');
    }
}

export async function getPokemonById(id: string) {
    try {
        return await fetchPokemonById(id);
    } catch (e) {
        throw new Error('Failed to fetch pokemon details');
    }
}

/**
 * fetch and filter pokemon list
 * 
 * if we have a query parameter
 * - then we need to set the limit to -1, so that the API will get all Pokemons
 *   - didn't find a way to get a filtred list from the API 
 * - set offset to 0, so that API will get the list from the first index
 */
async function fetchAndFilterPokemonListByName({
    offset = DEFAULT_OFFSET,
    limit = NO_PAGE_LIMIT,
    query = '',
    type = 'all'
}) {

    // when we have query param and type is different than all, we always use default values
    if (query || type !== 'all') {
        offset = DEFAULT_OFFSET;
        limit = NO_PAGE_LIMIT;
    }

    let { results } = await fetchPokemons(offset, limit);

    return query ? filterListByName(results, query) : results;
}

async function fetchAndFilterPokemonListByType(
    results: NamedAPIResource[],
    type = 'all',
) {
    const pokemonListPromiseResultList = await Promise.allSettled(
        results.map(({ name }) => fetchPokemonByName(name))
    );

    const pokemonList = pokemonListPromiseResultList
        .reduce((accumulator, result) => result.status === 'fulfilled' ? [...accumulator, result.value] : accumulator, [] as Pokemon[]);

    return type === 'all' ? pokemonList : filterListByType(pokemonList, type);
}
