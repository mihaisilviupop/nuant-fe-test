import Link from 'next/link';

export default function DescriptionDetailList({
    term,
    details
}: {
    term: string;
    details: {
        name: string;
        url?: string;
    }[];
}) {

    return (
        <div className="flex flex-col pb-3">
            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{term}</dt>
            <dd className="text-lg font-semibold grow">
                {details.map(({ name, url }, index) => (
                    <span
                        key={index}
                        className='bg-blue-100 text-blue-800 text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'
                    >
                        {url ? <Link href={url}>{name}</Link> : name}
                    </span>
                ))}
            </dd>
        </div>
    );
}
