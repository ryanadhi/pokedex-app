import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Roboto } from "next/font/google";
import Card from "@/components/Card";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

interface Pokemon {
  name: string;
  url: string;
}

interface HomeProps {
  pokemonList: Pokemon[];
}

export default function Home({ pokemonList }: HomeProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getPokemonId = (url: string) => {
    const id = url.split("/").filter(Boolean).pop();
    return id ? id.padStart(3, "0") : "";
  };

  const handleSortOrderChange = (order: "asc" | "desc") => {
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
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      })
    : filteredPokemonList;

  return (
    <main className={`w-screen h-screen bg-red-500 ${roboto.className}`}>
      <div className="h-36 py-4 px-4 md:px-0 flex flex-col gap-4 md:max-w-4xl md:mx-auto">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/pokeball.svg"
            alt="Pokemon Logo"
            width={24}
            height={24}
          />
          <h1 className="text-2xl font-bold text-slate-50">Pokédex</h1>
        </div>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-xl w-4/5 md:w-11/12"
          />
          <button
            onClick={() =>
              handleSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
            }
            className="px-4 py-2 rounded-xl flex items-center space-x-2 bg-gray-200 w-1/5 md:w-1/12"
          >
            <div className="flex flex-col">
              <span>A</span>
              <span>Z</span>
            </div>
            <div className="h-full flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`h-6 w-6 ${
                  sortOrder === "desc" ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div className="min-h-[calc(100vh-9rem)] max-h-[calc(100vh-9rem)] overflow-auto bg-white px-4 py-8 rounded-t-xl md:max-w-4xl md:mx-auto">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {sortedPokemonList.map((pokemon) => {
        const id = getPokemonId(pokemon.url);
        const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
        return (
          <Card
            key={pokemon.name}
            id={id}
            name={pokemon.name}
            imageUrl={imageUrl}
          />
        );
          })}
        </ul>
      </div>
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
