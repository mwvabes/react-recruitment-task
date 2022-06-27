import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { useParams } from "react-router-dom";
import { GET_LOCATION } from "../GraphQL/Queries";
import CharacterShortcut from "./CharacterShortcut";
import Header from "./Header";

interface LocationType {
  id: number;
  name: string;
  dimension: string;
  type: string;
  residents: {
    id: number;
  }[];
}

const CharacterLoader = () => {
  return (
    <div className="m-2 rounded-xl border border-sky-700 bg-slate-900 text-slate-200 hidden lg:block">
      <ContentLoader
        speed={2}
        width={170}
        height={242}
        viewBox="0 0 170 242"
        backgroundColor="#595e73"
        foregroundColor="#5f697c"
      >
        <circle cx="85" cy="55" r="37" />
        <rect x="35" y="120" rx="3" ry="3" width="100" height="12" />
        <rect x="25" y="160" rx="3" ry="3" width="120" height="7" />
        <rect x="10" y="195" rx="3" ry="3" width="150" height="30" />
      </ContentLoader>
    </div>
  );
};

const Location = () => {
  const { locationId } = useParams();

  const [location, setLocation] = useState<LocationType | null>(null);

  const { error, loading, data } = useQuery(GET_LOCATION, {
    variables: { id: locationId },
  });

  const handleDelete = (id: number) => {
    if (location === null) return;

    const loc = {
      ...location,
      ["residents"]: location.residents.filter(
        (resident) => resident.id !== id
      ),
    };

    setLocation(loc);
  };

  useEffect(() => {
    if (!error && !loading) {
      setLocation(data.location);
    }
  }, [data]);

  if (loading)
    return (
      <div className="flex flex-col items-center">
        <div className="max-w-5xl w-full">
          <Header text={"..."} goBack={true} />

          <div className="flex items-center justify-center">
            <ContentLoader
              speed={2}
              width={210}
              height={100}
              viewBox="0 0 210 100"
              backgroundColor="#595e73"
              foregroundColor="#5f697c"
            >
              <rect x="0" y="10" rx="3" ry="3" width="210" height="12" />
              <rect x="20" y="40" rx="3" ry="3" width="170" height="7" />
              <rect x="5" y="60" rx="3" ry="3" width="200" height="7" />
              <rect x="778" y="18" rx="3" ry="3" width="210" height="30" />
            </ContentLoader>
          </div>

          <h1 className="text-center text-2xl py-2 border-t border-slate-700">
            -
          </h1>
          <div className="flex flex-row flex-wrap justify-between">
            {Array.apply(null, Array(25)).map((e, i) => (
              <CharacterLoader key={i} />
            ))}
          </div>
        </div>
      </div>
    );

  if (location === null)
    return (
      <div className="flex flex-col items-center">
        <div className="max-w-5xl w-full">
          <Header text={""} goBack={true} />
          <p className="m-2 text-center">Location not found.</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center">
        <div className="max-w-5xl w-full">
          <Header text={""} goBack={true} />
          <p className="m-2 text-center">An error occured</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <Header text={location.name ? location.name : "..."} goBack={true} />
        <div className="flex flex-col items-center flex-1 m-2 mt-0 p-3 pt-1 justify-center text-slate-300">
          <p className="text-lg">- Details of location -</p>
          <p className="">Type: {location.type}</p>
          <p className="">Dimension: {location.dimension}</p>
        </div>

        <h1 className="text-center text-2xl py-2 border-t border-slate-700">
          - Residents -
        </h1>

        {location.residents.length === 0 ? (
          <p className="self-center text-center my-10">No residents found.</p>
        ) : null}

        <div className="flex flex-row flex-wrap justify-center">
          {location.residents.map((resident: any) => (
            <CharacterShortcut
              character={resident}
              key={resident.id}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Location;
