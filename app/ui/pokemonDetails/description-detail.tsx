import Link from 'next/link';

export default function DescriptionDetail({
    term,
    details,
    url
}: {
    term: string;
    details: string;
    url?: string
}) {

    return (
        <div className="flex flex-col pb-3">
            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{term}</dt>
            <dd className="text-lg font-semibold grow">
                {url ? <Link href={`${url}`}>{details}</Link> : details}
            </dd>
        </div>
    );
}
