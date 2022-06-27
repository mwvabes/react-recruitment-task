import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

interface Character {
  id: number;
  name: string;
  username: string;
  status: string;
  type: string;
  image: string;
}

const CharacterShortcut = ({
  character,
  handleDelete,
}: {
  character: Character;
  handleDelete: Function;
}) => {
  const [isBeingDeleted, setIsBeingDeleted] = useState<boolean>(false);

  const handleIsBeingDeleted = (id: number) => {
    setIsBeingDeleted(true);

    setTimeout(() => {
      handleDelete(id);
    }, 200);
  };

  return (
    <div
      className={`flex flex-col xl:w-1/6 md:w-1/4 w-full m-2 items-center px-3 py-3 justify-between rounded-xl border border-sky-700 bg-slate-900 text-slate-200 transition-opacity ease-in-out duration-200 ${
        isBeingDeleted ? "opacity-0" : null
      }`}
    >
      <img
        src={character.image}
        alt={`${character.name}`}
        className="object-contain w-20 rounded-3xl border-2 border-slate-700 shadow-3xl"
      />
      <div className="mt-2 text-center">
        <span className="text-lg">{character.name}</span>
      </div>
      <div className="mb-2 flex flex-col items-center justify-center">
        <span className="text-slate-400">Status: {character.status}</span>
      </div>
      <div className="flex flex-wrap">
        <Link to={`${character.id}`}>
          <button className="bg-sky-900 p-2 px-3 grow-1 rounded-tl-lg rounded-bl-lg border-2 border-sky-400 font-bold text-sky-200 text-sm hover:opacity-70 transition-opacity ease-in-out duration-150">
            DETAILS
          </button>
        </Link>
        <button
          className="bg-slate-700 p-2 grow-0 rounded-tr-lg rounded-br-lg border border-slate-400 text-xl font-bold text-slate-200 text-sm hover:opacity-80 transition ease-in-out duration-150 hover:text-red-600 hover:bg-slate-50 hover:border-red-600"
          onClick={() => handleIsBeingDeleted(character.id)}
        >
          <BsTrash />
        </button>
      </div>
    </div>
  );
};

export default CharacterShortcut;
