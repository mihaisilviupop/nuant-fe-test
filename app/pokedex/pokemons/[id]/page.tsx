import { getPokemonById } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const pokemon = await getPokemonById(params.id);
    return (
        <>
            <div>{params.id}</div>
            <div>{pokemon.name}</div>
            <div>{pokemon.weight}</div>
            <div>{pokemon.height}</div>
        </>
    );
}
