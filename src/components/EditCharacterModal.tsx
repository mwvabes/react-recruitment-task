import React from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Character {
  id: number;
  name: string;
  status: string;
  type: string;
  image: string;
}

const defaultMessage = "Use a form to edit Character details.";
const successMessage = "Data saved successfully!";

const EditCharacterModal = ({
  character,
  show,
  handleShowEditModal,
}: {
  character: Character;
  show: boolean;
  handleShowEditModal: Function;
}) => {
  if (!show) return null;

  return (
    <div className="flex flex-col items-center justify-center absolute top-0 bg-slate-800/80 left-0 right-0 bottom-0">
      <div className="max-w-xl w-full bg-slate-900 flex flex-col items-center justify-center rounded-lg p-4 border border-slate-700">
        <div className="flex flex-row justify-between w-full">
          <div className="text-xl">Edit Character details</div>
          <div>
            <button
              className="text-2xl hover:text-sky-500 transition ease-in-out duration-150"
              onClick={() => handleShowEditModal(false)}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
        {/* <div className="border border-slate-500 w-full p-2 bg-slate-800 text-center rounded-md my-3">
          {defaultMessage}
        </div> */}
        {/* <div className="border border-lime-500 w-full p-2 bg-lime-900 text-center rounded-md my-3">
          {successMessage}
        </div> */}

        <div className="w-full border-b border-slate-700"></div>
      </div>
    </div>
  );
};

export default EditCharacterModal;
