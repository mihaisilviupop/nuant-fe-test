import { getPokemonListTotalPages } from '@/app/lib/data';
import Pagination from '@/app/ui/pokemonList/pagination';
import PokemonsTable from '@/app/ui/pokemonList/table'

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        page?: string;
        query?: string;
    };
}) {
    const currentPage = Number(searchParams?.page) || 1;
    const query = searchParams?.query || '';

    const totalPages = await getPokemonListTotalPages(query);

    return (
        <div className="w-full">
            <PokemonsTable currentPage={currentPage} query={query} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}
