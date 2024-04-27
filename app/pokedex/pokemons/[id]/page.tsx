import { getPokemonById } from '@/app/lib/data';
import { convertDmToCm, convertHgToKg, getPokemonImage } from '@/app/lib/utils';
import BackButton from '@/app/ui/back-button';
import Description from '@/app/ui/pokemonDetails/description';
import DescriptionDetail from '@/app/ui/pokemonDetails/description-detail';
import DescriptionDetailList from '@/app/ui/pokemonDetails/description-detail-list';
import { Metadata } from 'next';
import Image from 'next/image';
import { PokemonAbility, PokemonType } from 'pokenode-ts';

type Props = {
    params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const pokemon = await getPokemonById(params.id);

    return {
        title: pokemon.name + ' details',
    }
}

export default async function Page({ params }: Props) {
    const pokemon = await getPokemonById(params.id);
    const imageUrl = getPokemonImage(pokemon.sprites);
    return (
        <div className="w-full">
            <div className='flex flew-row items-center'>
                <BackButton />
                <h1 className='p-4 text-2xl capitalize'>{pokemon.name}</h1>
            </div>
            <div className='flex flex-row flex-wrap justify-between p-4'>
                <Description>
                    <DescriptionDetail term='Weight' details={`${convertHgToKg(pokemon.weight)} kg`} />
                    <DescriptionDetail term='Height' details={`${convertDmToCm(pokemon.height)} cm`} />
                    <DescriptionDetail term='Species' details={pokemon.species.name} />
                    <DescriptionDetailList term='Types' details={getPokemonTypeList(pokemon.types)} />
                    <DescriptionDetailList term='Abilities' details={getPokemonAbilityList(pokemon.abilities)} />
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

function getPokemonAbilityList(abilities: PokemonAbility[]) {
    return abilities.map(({ ability: { name } }) => ({ name }));
}

function getPokemonTypeList(types: PokemonType[]) {
    return types.map(({ type: { name } }) => ({
        name,
        url: `/pokedex/pokemons?type=${name}`
    }));
}
