"use client";
import React from "react";
import { useState } from "react";
import { BsCircle } from "react-icons/bs";
import { FiCheckCircle, FiEdit } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
const Lists = ({
  task,
  idx,
  date,
  catg,
}: {
  task: string;
  idx: number;
  date: string;
  catg: string;
}) => {
  const [showTodo, setShowTodo] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <div key={idx} className="overflow-hidden px-1 w-full">
      <div className="flex gap-4 justify-start items-center px-4 py-6 rounded-xl bg-white/80">
        {checked ? (
          <FiCheckCircle
            onClick={() => {
              setChecked(!checked), setShowTodo(false);
            }}
            className={`${
              catg === "business"
                ? "text-blue-500"
                : catg === "personal"
                ? "text-fuchsia-500"
                : catg === "other"
                ? "text-yellow-400"
                : "text-gray-400"
            } h-6 w-6 duration-500 `}
          />
        ) : (
          <BsCircle
            onClick={() => {
              setChecked(!checked), setShowTodo(false);
            }}
            className={`${
              catg === "business"
                ? "fill-blue-500"
                : catg === "personal"
                ? "fill-fuchsia-500"
                : catg === "other"
                ? "fill-yellow-400"
                : "fill-gray-400"
            } h-6 duration-500 w-6`}
          />
        )}
        <div
          onClick={() => setShowTodo(!showTodo)}
          className={`${
            checked && "line-through"
          } font-semibold flex-1  line-clamp-1 text-stone-600 font-paragraph`}
        >
          {task}
        </div>
        <div>
          <FiEdit />
        </div>
      </div>
      <div
        className={`${
          showTodo ? "visible" : "invisible scale-0 translate-y-full"
        } duration-500 fixed rounded overflow-hidden bg-slate-200 px-4  py-4 top-2/4  -translate-y-1/2 translate-x-1/2 right-[50%]  `}
      >
        <div className="w-[80vmin]">
          <div className="flex justify-end">
            <AiOutlineCloseCircle
              onClick={() => setShowTodo(!showTodo)}
              className="w-5 h-5"
            />
          </div>
          <div className="flex gap-2 font-inter">
            <b>Task:</b>
            <p className="font-paragraph">{task}</p>
          </div>
          <div className="flex gap-2 my-4">
            <b>Due:</b>
            <p className="font-title">{date}</p>
          </div>
        </div>
        <div className="flex justify-end px-8 my-4">
          <p
            className={`${
              catg === "business"
                ? "bg-blue-500"
                : catg === "personal"
                ? "bg-fuchsia-500"
                : catg === "other"
                ? "bg-yellow-400"
                : "bg-gray-400"
            } font-title px-3 uppercase tracking-widest text-white rounded py-1`}
          >
            {catg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lists;
