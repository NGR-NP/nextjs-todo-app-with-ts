"use client";
import React, { useEffect } from "react";
import { useAllTodoQuery } from "@/redux/api/getAllTodos";
import LoadingCircleSvg from "@/components/svgs/LoadingCircleSvg";
import { Count } from "@/types/count.types";
import { useCountTodoQuery } from "@/redux/api/CountTotalTodoOfAllCatgApiSlice";
import AllTodoList from "./AllTodoList";
import NavBar from "@/components/NavBar";
import { addTodo, selectCurrentTodos } from "@/redux/slice/TodoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const page = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectCurrentTodos);
  const {
    data: allTodos,
    isSuccess: isAllTodoSuccess,
    isFetching: isFetchingTodo,
    isError: isErrorTodo,
    error: errorTodo,
  } = useAllTodoQuery();
  const { data, isFetching, isSuccess } = useCountTodoQuery();
  const totalTask = data?.reduce((acc: number, item: { count: number }) => {
    return acc + item?.count;
  }, 0);
  useEffect(() => {
    if (isAllTodoSuccess) {
      if (allTodos) {
        dispatch(addTodo(allTodos));
      }
    }
  }, [allTodos, isAllTodoSuccess]);
  return (
    <>
      <NavBar />
      <main className="overflow-x-hidden md:pt-8 bg-slate-100">
        <section className="overflow-hidden w-screen">
          <div className="px-8 py-4 font-bold tracking-widest font-title text-slate-400">
            CATEGORIES
          </div>
          <div className="relative">
            <div
              className="absolute top-0 -left-6 z-30 w-12 h-full blur-md"
              style={{
                background:
                  "linear-gradient(90deg, rgba(240,241,241,1) 69%, rgba(240,241,241,1) 100%)",
              }}
            />
            <div className="flex overflow-x-scroll gap-4 pl-8 mb-4 duration-300 last:mr-16 scroll-smooth">
              {isFetching ? (
                <LoadingCircleSvg />
              ) : (
                isSuccess &&
                data?.map((item: Count, idx: number) => {
                  const persentage = (item.count * 100) / totalTask;
                  return (
                    <div key={idx} className="last:mr-8">
                      <div className="px-4 py-5 rounded-xl bg-white/95">
                        <div className="w-48 font-title sm:w-56 text-slate-400">
                          {item.count} tasks
                        </div>
                        <div className="py-1 font-bold capitalize font-title backdrop-blur-0">
                          {item.category}
                        </div>
                        <div className="mt-4 max-w-full h-1 bg-slate-200">
                          <div
                            style={{
                              width: `${persentage.toFixed(2)}%`,
                            }}
                            className={`${
                              item.category === "business"
                                ? "bg-blue-500"
                                : item.category === "personal"
                                ? "bg-fuchsia-500"
                                : item.category === "other"
                                ? "bg-yellow-400"
                                : "bg-gray-400"
                            } w-0 h-1  duration-[800ms]`}
                          />
                        </div>
                        <p className="mt-1 font-title">
                          {persentage.toFixed(2)} %
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div
              className="absolute top-0 -right-6 z-30 w-12 h-full blur-md"
              style={{
                background:
                  "linear-gradient(90deg, rgba(240,241,241,1) 69%, rgba(240,241,241,1) 100%)",
              }}
            />
          </div>
        </section>
        <section className="pb-8">
          <div className="px-8 py-4 font-bold tracking-widest font-title text-slate-400">
           All TASKS
          </div>
          <div>
            <div className="flex flex-col gap-2 justify-center items-center pl-8 mb-4 duration-300 scroll-smooth last:pr-10">
              {isFetchingTodo ? (
                <>
                  <div className="px-1 w-full relativeoverflow-hidden">
                    <div className="overflow-hidden">
                      <div className="flex gap-4 justify-start items-center px-4 py-6 rounded-xl animate-ping bg-white/80"></div>
                    </div>
                  </div>
                  <div className="px-1 w-full relativeoverflow-hidden">
                    <div className="overflow-hidden">
                      <div className="flex gap-4 justify-start items-center px-4 py-6 rounded-xl animate-ping bg-white/80"></div>
                    </div>
                  </div>
                  <div className="px-1 w-full relativeoverflow-hidden">
                    <div className="overflow-hidden">
                      <div className="flex gap-4 justify-start items-center px-4 py-6 rounded-xl animate-ping bg-white/80"></div>
                    </div>
                  </div>
                </>
              ) : todos?.length == 0 ? (
                <div className="px-1 w-full relativeoverflow-hidden">
                  <div className="p-4 text-center break-words rounded-xl font-titile text-slate-800 bg-slate-300">
                  You haven't yet created any todo's. Would you like to{" "}
                    <Link
                        className="px-3 py-1 m-auto bg-blue-600 rounded line-clamp-1 w-fit text-slate-100"
                        href={"/new-task"}
                    >
                      create one 🖋️
                    </Link>
                  </div>
                </div>
              ) : isAllTodoSuccess ? (
                todos?.map((todo: any) => {
                  const { _id, task, date, category, status } = todo;
                  return (
                    <AllTodoList
                      key={_id}
                      id={_id}
                      date={date}
                      catg={category?.name}
                      task={task}
                      status={status}
                    />
                  );
                })
              ) : (
                isErrorTodo && (
                  <div className="px-1 w-full relativeoverflow-hidden">
                    <div className="p-4 text-center bg-red-200 rounded-xl font-titile text-slate-800">
                      {errorTodo?.data ? (
                        <>
                          {errorTodo.data?.message}
                          <Link
                            href={"/login"}
                            className="px-2 py-1 bg-blue-600 rounded text-slate-50"
                          >
                            {" "}
                            please login
                          </Link>
                        </>
                      ) : (
                        "something went wrong!"
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default page;
