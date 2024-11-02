import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface Pokemon {
  name: string;
  url: string;
}

interface HomeProps {
  pokemonList: Pokemon[];
}

export default function Home({ pokemonList }: HomeProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getPokemonId = (url: string) => {
    const id = url.split('/').filter(Boolean).pop();
    return id ? id.padStart(3, '0') : '';
  };

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPokemonList = sortOrder
    ? [...filteredPokemonList].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      })
    : filteredPokemonList;

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <h1 className="text-2xl font-bold">Pokémon List</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <button
          onClick={() => handleSortOrderChange('asc')}
          className={`px-4 py-2 rounded ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Sort Ascending
        </button>
        <button
          onClick={() => handleSortOrderChange('desc')}
          className={`px-4 py-2 rounded ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Sort Descending
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {sortedPokemonList.map((pokemon) => {
          const id = getPokemonId(pokemon.url);
          const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
          return (
            <li key={pokemon.name} className="flex flex-col items-center space-y-2">
              <Link href={`/pokemon/${pokemon.name}`} passHref>
                <Image src={imageUrl} alt={pokemon.name} width={64} height={64} />
              </Link>
              <Link href={`/pokemon/${pokemon.name}`} passHref>
                <span className="text-blue-500 cursor-pointer">{capitalizeName(pokemon.name)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
  const data = await res.json();

  return {
    props: {
      pokemonList: data.results,
    },
  };
};