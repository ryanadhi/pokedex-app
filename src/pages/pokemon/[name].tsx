import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface Ability {
  ability: {
    name: string;
  };
}

interface Type {
  type: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  abilities: Ability[];
  types: Type[];
}

interface PokemonDetailProps {
  pokemon: Pokemon;
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getTypeId = (url: string) => {
    const id = url.split('/').filter(Boolean).pop();
    return id ? id : '';
  };

  const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-8 ${inter.className}`}>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">{capitalizeName(pokemon.name)}</h1>
        <Image
          src={pokemonImageUrl}
          alt={pokemon.name}
          width={96}
          height={96}
          className="mx-auto mb-4"
        />
        <div className="text-lg mb-2">
          <p><strong>Height:</strong> {pokemon.height}</p>
          <p><strong>Weight:</strong> {pokemon.weight}</p>
          <p><strong>Types:</strong></p>
          <div className="flex justify-center mb-2">
            {pokemon.types.map((type) => {
              const typeId = getTypeId(type.type.url);
              const typeImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${typeId}.png`;
              return (
                <Image
                  key={type.type.name}
                  src={typeImageUrl}
                  alt={type.type.name}
                  width={96}
                  height={96}
                  className="mx-2"
                />
              );
            })}
          </div>
          <p><strong>Abilities:</strong></p>
          <ul className="list-disc list-inside">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{capitalizeName(ability.ability.name)}</li>
            ))}
          </ul>
        </div>
        <Link href="/">
          <span className="text-blue-500 cursor-pointer underline">
            Back to Pokémon List
          </span>
        </Link>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params!;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();

  return {
    props: {
      pokemon,
    },
  };
};