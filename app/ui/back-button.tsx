'use client';

import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();

    return (
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-12" onClick={() => router.back()}>
            <ArrowLeftIcon className="w-4" />
            <span className="sr-only">Return to previous page</span>
        </button>
    )
}
