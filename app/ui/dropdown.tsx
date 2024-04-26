'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Dropdown(
    {
        list,
        placeholder,
    }: {
        list: string[];
        placeholder: string;
    }
) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleSelect = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('type', term);
        } else {
            params.delete('type');
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <form className="max-w-sm w-1/3">
            <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize"
                onChange={(e) => {
                    handleSelect(e.target.value);
                }}
                defaultValue={searchParams.get('type')?.toString() ?? 'all'}
            >
                <option value="all">{placeholder}</option>
                {
                    list.map((name, index) => (
                        <option
                            key={index}
                            value={name}
                        >
                            {name}
                        </option>
                    ))
                }
            </select>
        </form >
    );
}
