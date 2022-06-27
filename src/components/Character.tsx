import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_CHARACTER } from "../GraphQL/Queries";
import Header from "./Header";
import { BsFillPencilFill } from "react-icons/bs";
import EditCharacterModal from "./EditCharacterModal";
import ContentLoader from "react-content-loader";

interface CharacterType {
  id: number;
  name: string;
  image: string;
  status: string;
  type: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}

const CharacterLoader = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="max-w-5xl w-full">
        <Header text={"..."} goBack={true} />

        <div className="border border-sky-500 rounded-2xl p-4 flex flex-col items-center justify-center">
          <div className="flex space-x-4">
            <ContentLoader
              speed={2}
              width={600}
              height={210}
              viewBox="0 0 600 210"
              backgroundColor="#595e73"
              foregroundColor="#5f697c"
            >
              <circle cx="105" cy="105" r="95" />
              <rect x="230" y="14" rx="3" ry="3" width="300" height="14" />
              <rect x="230" y="46" rx="3" ry="3" width="220" height="7" />
              <rect x="230" y="66" rx="3" ry="3" width="150" height="7" />
              <rect x="230" y="86" rx="3" ry="3" width="180" height="7" />
              <rect x="230" y="106" rx="3" ry="3" width="160" height="7" />
              <rect x="230" y="126" rx="3" ry="3" width="180" height="7" />
              <rect x="230" y="146" rx="3" ry="3" width="200" height="7" />
            </ContentLoader>
          </div>
        </div>

        <div className="flex items-center justify-center m-4">
          <ContentLoader
            speed={2}
            width={200}
            height={40}
            viewBox="0 0 200 40"
            backgroundColor="#595e73"
            foregroundColor="#5f697c"
          >
            <rect x="0" y="0" rx="3" ry="3" width="200" height="40" />
          </ContentLoader>
        </div>
      </div>
    </div>
  );
};

const CustomLabel = ({ detail, type }: { detail: string; type: string }) => {
  return (
    <div className="flex items-end text-slate-300">
      <span className="text-sm italic text-slate-400 mr-2">{type}:</span>
      {detail ? detail : "unknown"}
    </div>
  );
};

const Character = () => {
  const { characterId } = useParams();

  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const { error, loading, data } = useQuery(GET_CHARACTER, {
    variables: { id: characterId },
  });

  const handleShowEditModal = (value: boolean) => {
    setShowEditModal(value);
  };

  const handleEditCharacter = (c: CharacterType) => {
    if (character === null || c === null) return;
    if (c.id !== character.id) return;

    setCharacter({
      ...character,
      ["gender"]: c.gender,
      ["status"]: c.status,
      ["species"]: c.species,
      ["type"]: c.type,
    });
  };

  useEffect(() => {
    if (!error && !loading) {
      setCharacter(data.character);
    }
  }, [data]);

  if (loading || character == null)
    return (
      <>
        <CharacterLoader />
      </>
    );

  if (!loading && character == null) return <>Not found</>;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-5xl w-full ">
        <Header text={character.name ? character.name : "..."} goBack={true} />

        <div className="border border-sky-500 rounded-2xl p-4 flex flex-col items-center justify-center">
          <div className="flex space-x-4">
            <img
              src={character.image}
              alt={`${character.name} image`}
              className="object-contain md:w-52 md:h-52 w-24 h-24 rounded-3xl border-2 border-slate-700 shadow-3xl"
            />
            <div className="flex flex-col">
              <p className="text-2xl text-slate-50">
                {character.name ? character.name : "unknown name"}
              </p>
              <CustomLabel detail={character.gender} type="gender" />
              <CustomLabel detail={character.status} type="status" />
              <CustomLabel detail={character.species} type="species" />
              <CustomLabel detail={character.type} type="type" />
              <CustomLabel detail={character.origin.name} type="origin" />
              <CustomLabel detail={character.location.name} type="location" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 m-2 p-3 justify-center text-slate-300">
          <button
            className="flex flex-row items-center p-2 border border-sky-700 bg-sky-900 rounded-lg"
            onClick={() => handleShowEditModal(true)}
          >
            <BsFillPencilFill />
            <span className="ml-2">Edit Character details</span>
          </button>
        </div>

        <EditCharacterModal
          character={character}
          show={showEditModal}
          handleShowEditModal={handleShowEditModal}
          handleEditCharacter={handleEditCharacter}
        />
      </div>
    </div>
  );
};

export default Character;
