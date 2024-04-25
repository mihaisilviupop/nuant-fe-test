import { NamedAPIResource, Pokemon, PokemonClient } from 'pokenode-ts';

const pokemonApi = new PokemonClient();

const PAGE_LIMIT = 20;
const DEFAULT_OFFSET = 0;
const NO_PAGE_LIMIT = -1;

export async function fetchPokemonList({
    currentPage = 1,
    limit = PAGE_LIMIT,
    query = '',
}) {
    try {
        // as pagination in UI starts from 1
        // we need to substract because offset starts from 0
        let offset = (currentPage - 1) * PAGE_LIMIT;

        let results = await fetchAndFilterPokemonList({ offset, limit, query });

        // in case that we had a query parameter, we will not use API pagination feature
        // and we need to do it ourselves 
        if (results.length > PAGE_LIMIT) {
            results = results.slice(offset, offset + limit)
        }

        const pokemonListPromiseResultList = await Promise.allSettled(
            results.map(({ name }) => pokemonApi.getPokemonByName(name))
        );

        const pokemonList = pokemonListPromiseResultList
            .reduce((accumulator, result) => result.status === 'fulfilled' ? [...accumulator, result.value] : accumulator, [] as Pokemon[]);

        return pokemonList.map(({ id, name, sprites }) => {
            return {
                id,
                name,
                image: sprites.front_shiny ?? sprites.front_default
            }
        });
    } catch (e) {
        throw new Error('Failed to fetch pokemon list');
    }
}

export async function getPokemonListTotalPages(query = '') {
    try {
        const count = (await fetchAndFilterPokemonList({ query })).length;
        return Math.ceil(count / PAGE_LIMIT);
    } catch (e) {
        throw new Error('Failed to fetch pokemon total pages number');
    }
}

function getFilteredList(results: NamedAPIResource[], query: string) {
    return results.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));
}

/**
 * fetch and filter pokemon list
 * 
 * if we have a query parameter
 * - then we need to set the limit to -1, so that the API will get all Pokemons
 *   - didn't find a way to get a filtred list from the API 
 * - set offset to 0, so that API will get the list from the first index
 */
async function fetchAndFilterPokemonList({
    offset = DEFAULT_OFFSET,
    limit = NO_PAGE_LIMIT,
    query = ''
}) {

    // when we have query param, we always use default values
    if (query) {
        offset = DEFAULT_OFFSET;
        limit = NO_PAGE_LIMIT;
    }

    let { results } = await pokemonApi.listPokemons(offset, limit);

    return query ? getFilteredList(results, query) : results;
}
