import PokemonsTable from '@/app/ui/pokemonList/table'

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        page?: string;
    };
}) {
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <PokemonsTable currentPage={currentPage} />
    )
}
