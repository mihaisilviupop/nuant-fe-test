import { getPokemonById } from '@/app/lib/data';
import { convertDmToCm, convertHgToKg, getPokemonImage } from '@/app/lib/utils';
import Description from '@/app/ui/pokemonDetails/description';
import DescriptionDetail from '@/app/ui/pokemonDetails/description-detail';
import DescriptionDetailList from '@/app/ui/pokemonDetails/description-detail-list';
import Image from 'next/image';

export default async function Page({ params }: { params: { id: string } }) {
    const pokemon = await getPokemonById(params.id);
    const imageUrl = getPokemonImage(pokemon.sprites);
    return (
        <div className="w-full">
            <h1 className='p-4 text-2xl capitalize'>{pokemon.name}</h1>
            <div className='flex flex-row flex-wrap justify-between p-4'>
                <Description>
                    <DescriptionDetail term='Weight' details={`${convertHgToKg(pokemon.weight)} kg`} />
                    <DescriptionDetail term='Height' details={`${convertDmToCm(pokemon.height)} cm`} />
                    <DescriptionDetail term='Species' details={pokemon.species.name} />
                    <DescriptionDetailList term='Types' details={pokemon.types.map(({ type }) => type.name)} />
                    <DescriptionDetailList term='Abilities' details={pokemon.abilities.map(({ ability }) => ability.name)} />
                </Description>
                <div>
                    <Image
                        src={imageUrl}
                        alt={`${pokemon.name} profile picture`}
                        width={250}
                        height={250}
                        className='max-w-min'
                    ></Image>
                </div>
            </div>
        </div>
    );
}
