import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Roboto } from "next/font/google";
import Head from "next/head";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

interface Ability {
  ability: { name: string };
}

interface Type {
  type: { name: string; url: string };
}

interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  height: number;
  weight: number;
  abilities: Ability[];
  types: Type[];
  stats: { base_stat: number; stat: { name: string } }[];
}

interface PokemonDetailProps {
  pokemon: Pokemon;
  color: string;
}

const typeColors: { [key: string]: string } = {
  normal: "#A8A77A",
  fighting: "#C22E28",
  flying: "#A98FF3",
  poison: "#A33EA1",
  ground: "#E2BF65",
  rock: "#B6A136",
  bug: "#A6B91A",
  ghost: "#735797",
  steel: "#B7B7CE",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  psychic: "#F95587",
  ice: "#96D9D6",
  dragon: "#6F35FC",
  dark: "#705746",
  fairy: "#D685AD",
  stellar: "#FFD700",
  unknown: "#C0C0C0",
};

export default function PokemonDetail({ pokemon, color }: PokemonDetailProps) {
  const capitalizeName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  const getStatName = (name: string) => {
    switch (name) {
      case "hp":
        return "HP";
      case "attack":
        return "ATK";
      case "defense":
        return "DEF";
      case "special-attack":
        return "SP-ATK";
      case "special-defense":
        return "SP-DEF";
      case "speed":
        return "SPEED";
      default:
        return name;
    }
  };

  const getTypeBadgeStyle = (type: string) => ({
    backgroundColor: typeColors[type] || "#888",
    color: "white",
    borderRadius: "8px",
    padding: "0.25rem 0.5rem",
    textAlign: "center",
    fontWeight: "bold",
  });

  const getMaxStat = (baseStat: number, statName: string) =>
    statName === "hp" ? baseStat * 2 + 204 : (baseStat * 2 + 99) * 1.1;

  const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;

  return (
    <>
      <Head>
        <title>{capitalizeName(pokemon.name)} | Pokédex</title>
        <meta
          name="description"
          content={`Pokédex entry for ${capitalizeName(pokemon.name)}`}
        />
      </Head>
      <main
        className={`h-screen px-4 pt-4 flex flex-col gap-8 ${roboto.className}`}
        style={{
          background: `linear-gradient(to bottom, ${color}, #fff)`,
        }}
      >
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-30 p-4 md:max-w-4xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-wider">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </Link>
            <h1 className="text-2xl font-semibold text-center">
              {capitalizeName(pokemon.name)}
            </h1>
            <p className="text-xl text-slate-400">
              #{pokemon.id.toString().padStart(3, "0")}
            </p>
          </div>
        </div>

        <div className="mt-20 h-full overflow-auto">
          <Image
            src={pokemonImageUrl}
            alt={pokemon.name}
            width={240}
            height={240}
            className="mx-auto"
          />

          <div className="bg-white pt-20 pb-8 rounded-t-lg shadow-md -mt-14  z-10 flex flex-col gap-6 md:max-w-4xl md:mx-auto">
            <div className="flex justify-center gap-2">
              {pokemon.types.map((type) => (
                <div
                  key={type.type.name}
                  style={
                    getTypeBadgeStyle(type.type.name) as React.CSSProperties
                  }
                >
                  {capitalizeName(type.type.name)}
                </div>
              ))}
            </div>

            <div className="w-full md:w-1/2 md:mx-auto">
              <h2 className="text-center font-bold text-xl mb-4">About</h2>
              <div className="flex justify-around items-center ">
                <div className="text-center flex gap-2 ">
                  <Image
                    src="/assets/straighten.svg"
                    alt="Height Icon"
                    width={36}
                    height={36}
                    className="mx-auto mb-1"
                  />
                  <div>
                    <p className="text-xl font-bold">
                      {(pokemon.height / 10).toFixed(1)} m
                    </p>
                    <p className="text-sm text-gray-500">Height</p>
                  </div>
                </div>
                <div className="border-l border-gray-300 h-6"></div>
                <div className="text-center flex gap-2">
                  <Image
                    src="/assets/weight.svg"
                    alt="Weight Icon"
                    width={36}
                    height={36}
                    className="mx-auto mb-1"
                  />
                  <div>
                    <p className="text-xl font-bold">
                      {(pokemon.weight / 10).toFixed(1)} kg
                    </p>
                    <p className="text-sm text-gray-500">Weight</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 md:mx-auto">
              <h2 className="text-center font-bold text-xl mb-4">Base Stats</h2>
              <div className="flex flex-col gap-4">
                {pokemon.stats.map((stat) => (
                  <div
                    key={stat.stat.name}
                    className="flex justify-between px-4 items-center gap-4"
                  >
                    <p className="text-sm w-2/12 text-end">
                      {getStatName(stat.stat.name)}
                    </p>
                    <p className="w-1/12 font-semibold">{stat.base_stat}</p>
                    <div className="w-9/12 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: `${
                            (stat.base_stat /
                              getMaxStat(stat.base_stat, stat.stat.name)) *
                            100
                          }%`,
                          backgroundColor: color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params!;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();

  const speciesRes = await fetch(pokemon.species.url);
  const species = await speciesRes.json();
  const color = species.color?.name || "white";

  return { props: { pokemon, color } };
};
