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
    <li className="flex flex-col items-center space-y-2 border rounded-lg w-10/12 cursor-pointer shadow-lg">
      <p className="self-end text-xs text-slate-400 mr-2 pt-2">#{id}</p>
      <Link href={`/pokemon/${name}`} passHref>
        <Image src={imageUrl} alt={name} width={72} height={72} />
      </Link>
      <Link href={`/pokemon/${name}`} passHref className="bg-gray-100 w-full text-center p-2 rounded-t-lg">
        <span className="text-lg">{capitalizeName(name)}</span>
      </Link>
    </li>
  );
};

export default Card;
