import { fetchPokemonTypeList, getPokemonListTotalPages } from '@/app/lib/data';
import Dropdown from '@/app/ui/dropdown';
import Pagination from '@/app/ui/pokemonList/pagination';
import PokemonsTable from '@/app/ui/pokemonList/table'
import Search from '@/app/ui/search';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        page?: string;
        query?: string;
        type?: string;
    };
}) {
    const currentPage = Number(searchParams?.page) || 1;
    const query = searchParams?.query || '';
    const type = searchParams?.type || 'all';

    const totalPages = await getPokemonListTotalPages(query, type);
    const typeList = await fetchPokemonTypeList();

    return (
        <div className="w-full">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search Pokemon by name" />
                <Dropdown placeholder='All Pokemon by types' list={typeList} />
            </div>
            <PokemonsTable currentPage={currentPage} query={query} type={type} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}
