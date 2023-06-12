"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Lists from "./Lists";
import { selectCurrentFirstName } from "@/redux/slice/AuthSlice";

import { Count } from "@/types/count.types";
import { useCountTodoQuery } from "@/redux/api/CountTotalTodoOfAllCatgApiSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTodayTaskQuery } from "@/redux/api/getTodayTodo";
import Link from "next/link";
import {
  addTodayTask,
  selectCurrentTodayTask,
} from "@/redux/slice/TodayTaskSlice";
import NavBar from "@/components/NavBar";
import LoadingCircleSvg from "@/components/svgs/LoadingCircleSvg";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const firstName = useAppSelector(selectCurrentFirstName);
  const todayTask = useAppSelector(selectCurrentTodayTask);
  const { data, isFetching, isSuccess } = useCountTodoQuery();
  const {
    data: today,
    isFetching: isFetchingTodayTodo,
    isLoading: isLoadingTodayTodo,
    isSuccess: isSuccessTodoayTodo,
    isError: isErrorTodayTodo,
    error: errorTodayTodo,
  } = useTodayTaskQuery();

  const totalTask = data?.reduce((acc: number, item: { count: number }) => {
    return acc + item?.count;
  }, 0);
  useEffect(() => {
    if (!firstName) {
      router.push("/login");
    }
  }, []);
  useEffect(() => {
    if (isSuccessTodoayTodo) {
      if (today) {
        dispatch(addTodayTask(today));
      }
    }
  }, [today, isSuccessTodoayTodo]);
  return (
    <>
      <NavBar />
      <main className="overflow-x-hidden md:pt-8 bg-slate-100">
        <div className="">
          <section className="px-8 pt-8 pb-4">
            <h1 className="text-3xl font-bold font-raleway text-slate-700">
              What's up, <span className="capitalize">{firstName}</span>!
            </h1>
          </section>
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
              TODAY'S TASKS
            </div>
            <div>
              <div className="flex flex-col gap-2 justify-center items-center pl-8 mb-4 duration-300 scroll-smooth last:pr-10">
                {isFetchingTodayTodo || isLoadingTodayTodo ? (
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
                ) : todayTask?.length == 0 ? (
                  <div className="px-1 w-full relativeoverflow-hidden">
                    <div className="p-4 text-center rounded-xl font-titile text-slate-800 bg-slate-300">
                      There isn't any task for today, would you like to{" "}
                      <Link
                        className="px-3 py-1 m-auto bg-blue-600 rounded line-clamp-1 w-fit text-slate-100"
                        href={"/new-task"}
                      >
                        Add now 🖋️
                      </Link>
                    </div>
                  </div>
                ) : isSuccessTodoayTodo ? (
                  todayTask?.map((todo: any) => {
                    const { _id, task, date, category, status } = todo;
                    return (
                      <Lists
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
                  isErrorTodayTodo && (
                    <div className="px-1 w-full relativeoverflow-hidden">
                      <div className="p-4 text-center bg-red-200 rounded-xl font-titile text-slate-800">
                        {errorTodayTodo?.data ? (
                          <>
                            {errorTodayTodo.data?.message}
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
        </div>
      </main>
    </>
  );
};

export default HomePage;
