import { ReactNode } from 'react';

export default function Description({ children }: { children: ReactNode; }) {
    return (
        <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 grow">
            {children}
        </dl>
    );
}
