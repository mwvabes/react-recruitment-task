import React from "react";
import { Link } from "react-router-dom";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

const LocationShortcut = ({ location }: { location: Location }) => {
  return (
    <div className="flex flex-col md:flex-row items-center flex-1 m-2 p-3 justify-between rounded-xl border border-sky-700 bg-slate-900 text-slate-200">
      <div className="space-x-2 flex items-center flex-wrap mb-2 mr-1 md:mb-0">
        <span className="text-sm text-slate-500">{`[${location.id}]`}</span>
        <span className="text-lg font-bold">{location.name}</span>
        <span className="text-slate-400 ">Type: {location.type},</span>
        <span className="text-slate-400">Dimension: {location.dimension}</span>
      </div>
      <Link to={`/location/${location.id}`}>
        <button className="bg-sky-900 p-2 px-20 rounded-lg border-2 border-blue-300 font-bold text-sky-200 text-sm hover:opacity-80 transition-opacity ease-in-out duration-185">
          DETAILS
        </button>
      </Link>
    </div>
  );
};

export default LocationShortcut;
