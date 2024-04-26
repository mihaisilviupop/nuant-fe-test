import { fetchPokemonList } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function PokemonsTable({
    currentPage,
    query,
    type
}: {
    currentPage: number;
    query: string;
    type: string;
}) {
    const pokemonList = await fetchPokemonList({
        currentPage,
        query,
        type
    });

    return <table className="min-w-full md:table dark:text-white light:text-gray-900">
        <thead className="rounded-lg text-left text-sm font-normal sr-only">
            <tr>
                <th scope="col">
                    Pokemon
                </th>
            </tr>
        </thead>
        <tbody className="bg-white text-gray-900">
            {
                pokemonList.map(({ id, name, image }) => (
                    <tr
                        key={id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                        <td className="whitespace-nowrap py-2 pl-6 pr-3">
                            <Link href={`/pokedex/pokemons/${id}`}    >
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={image || '/pokeball.webp'}
                                        className="rounded-full"
                                        width={44}
                                        height={44}
                                        alt={`${name}'s front picture`}
                                        priority={true}
                                    />
                                    <p className='capitalize'>{name}</p>
                                </div>
                            </Link>
                        </td>
                    </tr>
                )
                )
            }
        </tbody>
    </table >
}
