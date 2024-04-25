import { getPokemonListTotalPages } from '@/app/lib/data';
import PokemonsTable from '@/app/ui/pokemonList/table'

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        page?: string;
    };
}) {
    const currentPage = Number(searchParams?.page) || 0;

    const totalPages = await getPokemonListTotalPages();
    console.log('CNX ~ totalPages:', totalPages);

    return (
        <PokemonsTable currentPage={currentPage} />
    )
}
