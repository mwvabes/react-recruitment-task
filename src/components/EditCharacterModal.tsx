import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  type: string;
  species: string;
  image: string;
}

const defaultMessage = "Use a form to edit Character details.";
const successMessage = "Data saved successfully!";

interface FormData {
  gender: string;
  type: string;
  species: string;
  status: string;
}

const EditCharacterModal = ({
  character,
  show,
  handleShowEditModal,
  handleEditCharacter,
}: {
  character: Character;
  show: boolean;
  handleShowEditModal: Function;
  handleEditCharacter: Function;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    handleEditCharacter({
      ...character,
      ["gender"]: data.gender,
      ["status"]: data.status,
      ["species"]: data.species,
      ["type"]: data.type,
    });

    setStatus("success");
  };

  const [status, setStatus] = useState<string>("default");

  if (!show) return null;

  return (
    <div className="flex flex-col items-center justify-center absolute top-0 bg-slate-800/80 left-0 right-0 bottom-0">
      <div className="max-w-md w-full bg-slate-900 flex flex-col items-center justify-center rounded-lg p-4 border border-slate-700">
        <div className="flex flex-row justify-between w-full">
          <div className="text-xl">Edit Character details</div>
          <div>
            <button
              className="text-2xl hover:text-sky-500 transition ease-in-out duration-150"
              onClick={() => {
                handleShowEditModal(false);
                setStatus("default");
              }}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
        {status === "default" ? (
          <div className="border border-slate-500 w-full p-2 bg-slate-800 text-center rounded-md my-3">
            {defaultMessage}
          </div>
        ) : null}
        {status === "success" ? (
          <div className="border border-lime-500 w-full p-2 bg-lime-900 text-center rounded-md my-3">
            {successMessage}
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full mt-2"
        >
          <div className="flex-col mt-2">
            <p>
              <span className="italic text-slate-400">Gender*</span>
              <span>{errors.gender ? "err" : null}</span>
            </p>
            <div className="flex space-x-3 flex-wrap">
              <label htmlFor="gender-male" className="cursor-pointer">
                <input
                  {...register("gender")}
                  type="radio"
                  value="Male"
                  name="gender"
                  id="gender-male"
                  defaultChecked={character.gender === "Male"}
                />
                <span className="ml-0.5">Male</span>
              </label>
              <label htmlFor="gender-female" className="cursor-pointer">
                <input
                  {...register("gender")}
                  type="radio"
                  value="Female"
                  name="gender"
                  id="gender-female"
                  defaultChecked={character.gender === "Female"}
                />
                <span className="ml-0.5">Female</span>
              </label>
              <label htmlFor="gender-genderless" className="cursor-pointer">
                <input
                  {...register("gender")}
                  type="radio"
                  value="Genderless"
                  name="gender"
                  id="gender-genderless"
                  defaultChecked={character.gender === "Genderless"}
                />
                <span className="ml-0.5">Genderless</span>
              </label>
              <label htmlFor="gender-unknown" className="cursor-pointer">
                <input
                  {...register("gender")}
                  type="radio"
                  value="Unknown"
                  name="gender"
                  id="gender-unknown"
                  defaultChecked={character.gender === "unknown"}
                />
                <span className="ml-0.5">Unknown</span>
              </label>
            </div>
          </div>

          <label htmlFor="status" className="flex flex-col mt-3">
            <p>
              <span className="italic text-slate-400 mr-2">Status*</span>
              <span className="text-red-300 text-sm">
                {errors.status
                  ? "Letters only. Length between 3 and 40 characters."
                  : null}
              </span>
            </p>
            <input
              {...register("status", {
                required: true,
                pattern: /^[A-Za-z]+$/,
                min: 3,
                max: 20,
              })}
              id="status"
              className="bg-slate-800 px-1 py-0.5 border-slate-500 border rounded-md"
              defaultValue={character.status}
            />
          </label>
          <label htmlFor="species" className="flex flex-col mt-3">
            <p>
              <span className="italic text-slate-400 mr-2">Species*</span>
              <span className="text-red-300 text-sm">
                {errors.species
                  ? "Length should be between 3 and 40 characters."
                  : null}
              </span>
            </p>
            <input
              {...register("species", { required: true, min: 3, max: 40 })}
              id="species"
              className="bg-slate-800 px-1 py-0.5 border-slate-500 border rounded-md"
              defaultValue={character.species}
            />
          </label>
          <label htmlFor="type" className="flex flex-col mt-3">
            <p>
              <span className="italic text-slate-400 mr-2">Type</span>
              <span className="text-red-300 text-sm">
                {errors.type ? "Error occured" : null}
              </span>
            </p>
            <input
              {...register("type")}
              defaultValue={character.type}
              id="type"
              className="bg-slate-800 px-1 py-0.5 border-slate-500 border rounded-md"
            />
          </label>

          <input
            type="submit"
            value="Save changes"
            className="bg-slate-400 px-1 py-0.5 border-slate-500 text-slate-700 border rounded-md mt-6 cursor-pointer hover:opacity-70 transition-opacity ease-in-out duration-185"
          />
        </form>

        <div className="w-full border-b border-slate-700"></div>
      </div>
    </div>
  );
};

export default EditCharacterModal;
