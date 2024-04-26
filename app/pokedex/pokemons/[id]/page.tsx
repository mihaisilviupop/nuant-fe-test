import { getPokemonById } from '@/app/lib/data';
import { convertDmToCm, convertHgToKg } from '@/app/lib/utils';
import Description from '@/app/ui/pokemonDetails/description';
import DescriptionDetail from '@/app/ui/pokemonDetails/description-detail';

export default async function Page({ params }: { params: { id: string } }) {
    const pokemon = await getPokemonById(params.id);
    return (
        <div className="w-full">
            <h1 className='p-4 text-2xl capitalize'>{pokemon.name}</h1>
            <Description>
                <DescriptionDetail term='Weight' details={`${convertHgToKg(pokemon.weight)} kg`} />
                <DescriptionDetail term='Height' details={`${convertDmToCm(pokemon.height)} cm`} />
            </Description>

        </div>
    );
}
