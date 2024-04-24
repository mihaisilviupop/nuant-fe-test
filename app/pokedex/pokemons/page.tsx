import { fetchPokemonList } from '@/app/lib/data'
import PokemonsTable from '@/app/ui/pokemonList/table'

export default async function Page() {

    return (
        <PokemonsTable />
    )
}
