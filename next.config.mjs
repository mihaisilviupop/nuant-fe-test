/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/PokeAPI/sprites/**',
            },
        ],
    },
    async redirects() {
        return [
            // Basic redirect
            {
                source: '/',
                destination: '/pokedex/pokemons',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
