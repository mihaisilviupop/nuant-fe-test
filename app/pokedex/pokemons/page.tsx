import { fetchPokemonList } from '@/app/lib/data'

export default async function Page() {
    const pokemonList = await fetchPokemonList();

    return (
        <table className="min-w-full md:table dark:text-white light:text-gray-900">
            <thead className="rounded-lg text-left text-sm font-normal  ">
                <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Name
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white text-gray-900">
                {
                    pokemonList.map((pokemon, index) => (
                        <tr
                            key={index}
                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <div className="flex items-center gap-3">
                                    <p>{pokemon}</p>
                                </div>
                            </td>
                        </tr>
                    )
                    )
                }
            </tbody>
        </table>
    )
}
