import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_LOCATIONS } from "../GraphQL/Queries";
import LocationShortcut from "./LocationShortcut";
import "../styles/index.css";
import Header from "./Header";
import ContentLoader from "react-content-loader";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

interface LocationType {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: [];
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
      className={`flex self-end mx-3 my-2 text-slate-200 ${
        pages == null ? "invisible" : null
      } `}
    >
      <button
        className={`flex border border-slate-400 justify-center rounded-tl-md rounded-bl-md bg-sky-800 ${
          prev == null ? "opacity-60" : "hover:opacity-80"
        } transition-opacity ease-in-out duration-185`}
        onClick={() => handlePagination("start")}
        disabled={prev == null}
      >
        <span className="text-2xl">
          <BiFirstPage />
        </span>
      </button>
      <button
        className={`flex border border-slate-400 pr-2 justify-center bg-sky-700 ${
          prev == null ? "opacity-60" : "hover:opacity-80"
        } transition-opacity ease-in-out duration-185`}
        onClick={() => handlePagination("prev")}
        disabled={prev == null}
      >
        <span className="text-2xl">
          <MdNavigateBefore />
        </span>{" "}
        <span>Prev</span>
      </button>
      <span className="px-2 border border-slate-400 bg-slate-800">
        {" "}
        Page {page}/{pages}
      </span>
      <button
        className={`flex border border-slate-400 pl-2 justify-center bg-sky-700 ${
          next == null ? "opacity-60" : "hover:opacity-80"
        } transition-opacity ease-in-out duration-185`}
        onClick={() => handlePagination("next")}
        disabled={next == null}
      >
        <span>Next</span>{" "}
        <span className="text-2xl">
          <MdNavigateNext />
        </span>
      </button>
      <button
        className={`flex border border-slate-400 justify-center rounded-tr-md rounded-br-md bg-sky-800 ${
          next == null ? "opacity-60" : "hover:opacity-80"
        } transition-opacity ease-in-out duration-185`}
        onClick={() => handlePagination("end")}
        disabled={next == null}
      >
        <span className="text-2xl">
          <BiLastPage />
        </span>
      </button>
    </div>
  );
};

const App = () => {
  const [locations, setLocations] = useState<LocationType[]>([]);

  const [page, setPage] = useState(Number(sessionStorage.getItem("page")) || 1);
  const [pages, setPages] = useState(null);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  const { error, loading, data } = useQuery(GET_LOCATIONS, {
    variables: { page: page },
  });

  const handlePagination = (type: string) => {
    if (type === "start") {
      sessionStorage.setItem("page", "1");
      setPage(1);
    }
    if (type === "end") {
      sessionStorage.setItem("page", pages ? pages : "1");
      setPage(pages ? pages : 1);
    }
    if (type === "prev" && prev != null) {
      sessionStorage.setItem("page", prev);
      setPage(prev);
    }
    if (type === "next" && next != null) {
      sessionStorage.setItem("page", next);
      setPage(next);
    }
  };

  useEffect(() => {
    if (!error && !loading) {
      setLocations(data.locations.results);
      setPages(data.locations.info.pages);
      setNext(data.locations.info.next);
      setPrev(data.locations.info.prev);
    }
  }, [data]);

  if (locations === null)
    return (
      <div className="flex flex-col items-center">
        <div className="max-w-5xl w-full">
          <Header text={""} goBack={false} />
          <p className="m-2 text-center">Locations not found.</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center">
        <div className="max-w-5xl w-full">
          <Header text={""} goBack={false} />
          <p className="m-2 text-center">An error occured</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-5xl w-full mb-5 pb-10 border-b border-slate-700">
        <Header text={"Locations"} goBack={false} />
        <div className="flex flex-col">
          <Pagination
            page={+page}
            pages={pages}
            next={next}
            prev={prev}
            handlePagination={handlePagination}
          />

          {loading
            ? Array.apply(null, Array(15)).map((e, i) => (
                <LocationLoader key={i} />
              ))
            : null}

          {locations.map((location) => (
            <LocationShortcut location={location} key={location.id} />
          ))}

          <Pagination
            page={+page}
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
