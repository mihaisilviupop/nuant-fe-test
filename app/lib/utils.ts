import type { NamedAPIResource, Pokemon } from 'pokenode-ts';

export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};

export function filterListByName(results: NamedAPIResource[], query: string) {
    return results.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));
}

export function filterListByType(results: Pokemon[], type: string) {
    return results.filter(item => item.types.some((pokemonType) => pokemonType.type.name === type));
}

export function convertHgToKg(weight: number) {
    return weight * 0.1;
}

export function convertDmToMeters(height: number) {
    return height * 0.1;
}
