export default function DescriptionDetail({
    term,
    details,
}: {
    term: string;
    details: string;
}) {

    return (
        <div className="flex flex-col pb-3">
            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{term}</dt>
            <dd className="text-lg font-semibold">{details}</dd>
        </div>
    );
}
