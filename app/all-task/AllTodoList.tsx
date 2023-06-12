"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsCircle } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { FiCheckCircle, FiEdit } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";

import { useTodoQuery } from "@/redux/api/getTodoByIdApiSlice";
import { useUpdateTodoMutation } from "@/redux/api/updateTodo";
import { useDeleteTodoMutation } from "@/redux/api/deleteTodoApiSlice";
import LoadingCircleSvg from "@/components/svgs/LoadingCircleSvg";
import { useAppDispatch } from "@/redux/hooks";
import { removeTodo, updateTodoWithId } from "@/redux/slice/TodoSlice";
const AllTodoList = ({
  task,
  catg,
  id,
  status,
}: {
  id: string;
  task: string;
  date: string;
  catg: string;
  status: string;
}) => {
  const convertStatus = status === "completed" ? true : false;
  const dispatch = useAppDispatch();

  const [showTodo, setShowTodo] = useState(false);
  const [checked, setChecked] = useState(convertStatus);
  const { data } = useTodoQuery({ id });
  const [updateTodo] = useUpdateTodoMutation();
  const handleUpdate = async () => {
    try {
      const status = checked ? "completed" : "not completed";
      const result = await updateTodo({ id, status }).unwrap();
      if (result) {
        const updatedStatus =
          result?.status === "completed"
            ? true
            : result?.status === "not completed" && false;
        setChecked(updatedStatus);
      }
      console.log(result);
      dispatch(updateTodoWithId(result));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleUpdate();
  }, [checked]);
  const [deleteTodo, { isLoading, isSuccess, isError, error }] =
    useDeleteTodoMutation();
  const handleDelete = async () => {
    console.log(id);
    if (isLoading) return;

    try {
      console.log("id", id);
      const result = await deleteTodo({ id }).unwrap();
      console.log("restlt", result);
      dispatch(removeTodo(result));
    } catch (err) {
      console.log(error);
    }
  };
  return (
    <div className="px-1 w-full relativeoverflow-hidden">
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
        <div className="group">
          <SlOptionsVertical aria-label="Options" />
          <div className="absolute right-16 invisible duration-200 hover:visible group-hover:visible group-focus:visible group-active:visible">
            <div className="p-2 rounded bg-slate-100">
              <ul className="flex flex-col px-1 py-4 space-y-2 bg-slate-200">
                {/* <li className="px-4 py-1 m-auto w-12 h-8 bg-slate-50">
                  <FiEdit className="w-5 h-5" aria-label="Edit" />
                </li> */}
                <li className="px-4 py-1 w-12 h-8 text-red-400 hover:text-red-500 bg-slate-50">
                  {isLoading ? (
                    <LoadingCircleSvg />
                  ) : (
                    <MdDeleteSweep
                      onClick={handleDelete}
                      className="w-5 h-5"
                      aria-label="Delete"
                    />
                  )}
                </li>
              </ul>
            </div>
          </div>
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
            <p className="font-paragraph">{data?.task}</p>
          </div>
          <div className="flex gap-2 my-4">
            <b>Due:</b>
            <p className="font-title">{data?.date}</p>
          </div>
        </div>
        <div className="flex justify-end px-8 my-4">
          <p
            className={`${
              data?.category?.name === "business"
                ? "bg-blue-500"
                : data?.category?.name === "personal"
                ? "bg-fuchsia-500"
                : data?.category?.name === "other"
                ? "bg-yellow-400"
                : "bg-gray-400"
            } font-title px-3 uppercase tracking-widest text-white rounded py-1`}
          >
            {data?.category?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllTodoList;
