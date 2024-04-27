import { PokemonClient } from 'pokenode-ts';
import { memoize as cache } from 'nextjs-better-unstable-cache'

const pokemonApi = new PokemonClient();

export const fetchPokemonTypes = cache(
    async () => await pokemonApi.listTypes(),
    {
        revalidateTags: () => ['pokemon-type-list'],
        additionalCacheKey: ['pokemon-type-list'],
    }
);

export const fetchPokemonById = cache(
    async (id: string) => await pokemonApi.getPokemonById(Number(id)),
    {
        revalidateTags: (id) => ['pokemon-details', id],
        additionalCacheKey: ['pokemon-details'],
    }
);

export const fetchPokemons = cache(
    async (offset: number, limit: number) => await pokemonApi.listPokemons(offset, limit),
    {
        revalidateTags: (offset, limit) => ['pokemon-list', offset.toString(), limit.toString()],
        additionalCacheKey: ['pokemon-list'],
    }
);

export const fetchPokemonByName = cache(
    async (name: string) => await pokemonApi.getPokemonByName(name),
    {
        revalidateTags: (name) => ['pokemon-name', name],
        additionalCacheKey: ['pokemon-name'],
    }
);
