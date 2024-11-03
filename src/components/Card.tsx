import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string;
  name: string;
  imageUrl: string;
}

const Card = (props: CardProps) => {
  const { id, name, imageUrl } = props;
  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  return (
    <li >
      <Link href={`/pokemon/${name}`} passHref className="flex flex-col items-center space-y-2 border rounded-xl md:w-full cursor-pointer shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out bg-white overflow-hidden">
        <p className="self-end text-xs text-gray-400 mr-2 pt-2">#{id}</p>

        <Image
          src={imageUrl}
          alt={name}
          width={96}
          height={96}
          className="transition-transform duration-200 hover:scale-110"
        />

        <div className="bg-gray-100 w-full text-center py-2 rounded-b-xl rounded-t-lg">
          <span className="text-lg font-semibold text-gray-700">
            {capitalizeName(name)}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default Card;
