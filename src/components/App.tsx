import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_LOCATIONS } from "../GraphQL/Queries";
import LocationShortcut from "./LocationShortcut";
import "../styles/index.css";
import Header from "./Header";
import ContentLoader from "react-content-loader";

interface LocationType {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: [];
}

interface PaginationType {
  page: number;
  pages: number | null;
  next: number | null;
  prev: number | null;
}

const LocationLoader = () => {
  return (
    <div className="m-2 rounded-xl border border-sky-700 bg-slate-900 text-slate-200 hidden lg:block">
      <ContentLoader
        speed={2}
        width={1010}
        height={66}
        viewBox="0 0 1010 66"
        backgroundColor="#595e73"
        foregroundColor="#5f697c"
      >
        <rect x="15" y="18" rx="3" ry="3" width="400" height="7" />
        <rect x="15" y="40" rx="3" ry="3" width="230" height="7" />
        <rect x="778" y="18" rx="3" ry="3" width="210" height="30" />
      </ContentLoader>
    </div>
  );
};

const Pagination = ({
  page,
  pages,
  next,
  prev,
  handlePagination,
}: {
  page: number;
  pages: number | null;
  next: number | null;
  prev: number | null;
  handlePagination: Function;
}) => {
  return (
    <div
      className={`flex self-end mx-3 my-2 ${
        pages == null ? "invisible" : null
      } `}
    >
      <button
        className="flex border border-slate-500 px-2 rounded-tl-md rounded-bl-md bg-sky-900 hover:opacity-80 transition-opacity ease-in-out duration-185"
        onClick={() => handlePagination("prev")}
      >
        Prev
      </button>
      <span className="px-2 border border-slate-500 bg-slate-800">
        {" "}
        Page {page}/{pages}
      </span>
      <button
        className="flex border border-slate-500 px-2 rounded-tr-md rounded-br-md bg-sky-900 hover:opacity-80 transition-opacity ease-in-out duration-185"
        onClick={() => handlePagination("next")}
      >
        Next
      </button>
    </div>
  );
};

const App = () => {
  const [locations, setLocations] = useState<LocationType[]>([]);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  const { error, loading, data } = useQuery(GET_LOCATIONS, {
    variables: { page: page },
  });

  const handlePagination = (type: string) => {
    if (type == "prev" && prev != null) setPage(prev);
    if (type == "next" && next != null) setPage(next);
  };

  useEffect(() => {
    if (!error && !loading) {
      setLocations(data.locations.results);
      setPages(data.locations.info.pages);
      setNext(data.locations.info.next);
      setPrev(data.locations.info.prev);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-5xl w-full mb-5 pb-10 border-b border-slate-700">
        <Header text={"Locations"} goBack={false} />
        <div className="flex flex-col">
          <Pagination
            page={page}
            pages={pages}
            next={next}
            prev={prev}
            handlePagination={handlePagination}
          />

          {loading
            ? Array.apply(null, Array(15)).map(() => <LocationLoader />)
            : null}

          {locations.map((location) => (
            <LocationShortcut location={location} key={location.id} />
          ))}

          <Pagination
            page={page}
            pages={pages}
            next={next}
            prev={prev}
            handlePagination={handlePagination}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
