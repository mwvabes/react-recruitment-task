import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const Header = ({ text, goBack }: { text: string; goBack: boolean }) => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-row justify-between items-center mt-4 px-2 text-3xl mb-4 border-b border-slate-700 pb-4">
      {goBack ? (
        <div className="flex-1 flex justify-start">
          <div className="text-sky-500 flex items-center justify-center">
            <button
              onClick={() => navigate(-1)}
              className="text-sky-500 text-xl flex items-center justify-center hover:text-sky-300 transition ease-in-out duration-150"
            >
              <span className="text-3xl mt-1">{<IoIosArrowRoundBack />}</span>
              Go back
            </button>
          </div>
        </div>
      ) : null}
      <div className="flex-1 flex justify-center text-center">{text}</div>
      <div className="flex-1 flex justify-end hidden md:flex"></div>
    </header>
  );
};

export default Header;
