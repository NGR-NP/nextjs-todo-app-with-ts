"use client";
import React, { useEffect, useState } from "react";
import { BsFlag } from "react-icons/bs";
import { BiCategoryAlt, BiMoon } from "react-icons/bi";
import { todayDate } from "@/functions/formattedTodayDate";
import { useLazyGetAllCatgQuery } from "@/redux/api/getAllCatgApiSlice";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentToken } from "@/redux/slice/AuthSlice";
import { useNewTaskMutation } from "@/redux/api/postNewTaskApiSlice";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import LoadingCircleSvg from "@/components/svgs/LoadingCircleSvg";

const page = () => {
  const router = useRouter();
  const token = useAppSelector(selectCurrentToken);
  const [catg, setCatg] = useState("");
  const [task, setTask] = useState("");
  const [getAllCatg, { data, isFetching, isError, isSuccess, error }] =
    useLazyGetAllCatgQuery();

  const [date, setDate] = useState(todayDate);
  const [today, setToday] = useState(todayDate);
  const [
    newTodo,
    {
      isLoading,
      isSuccess: successPost,
      isError: isSubmitError,
      error: submitError,
    },
  ] = useNewTaskMutation();
  const handleTodoDate = () => {
    setDate(today);
  };
  type Catg = {
    _id: string;
    name: string;
  };
  const handleNewTask = async (e: any) => {
    e.preventDefault();
    try {
      const result = await newTodo({
        task,
        category: catg,
        date,
      }).unwrap();
      if (result) {
        router.push("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const showOption = () => {
    getAllCatg();
  };
  console.log(error);
useEffect(()=>{
  if(!token){
    router.push("/login");
  }

},[])
  return (
    <>
      <NavBar />
      {isError ||
        (isSubmitError && (
          <div className="absolute right-4">
            <div className="px-4 py-2 bg-red-300">
              <p className="text-slate-100">
                {error?.data?.message ||
                  submitError?.data?.message ||
                  "something went wrong"}
              </p>
            </div>
          </div>
        ))}
      <main className="px-8 py-4 h-[94vh]  bg-slate-200/80">
        <section className="flex flex-col justify-center py-4 h-full placeholder:px-4">
          <div className="mx-auto my-20 text-2xl text-slate-700 font-title">
            Add New Task
          </div>
          <form onSubmit={(e) => handleNewTask(e)}>
            <div className="flex flex-col gap-8 justify-center items-center py-8">
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="px-4 py-3 w-full bg-transparent rounded-lg border outline-none focus:outline-blue-200 border-slate-300"
                  placeholder="Enter new task *"
                />
              </div>
              <div className="flex justify-center items-center">
                <select
                  id="catg"
                  value={catg}
                  onChange={(e) => setCatg(e.target.value)}
                  onFocus={showOption}
                  className="px-4 py-2 rounded outline-none focus:outline-blue-200"
                >
                  <option>Choose Category *</option>
                  {isFetching ? (
                    <option>Loading...</option>
                  ) : isSuccess ? (
                    data?.map((catg: Catg) => {
                      return (
                        <option key={catg._id} value={catg._id}>
                          {catg.name}
                        </option>
                      );
                    })
                  ) : (
                    isError && (
                      <>
                        <option>
                          Error: {error && error?.data?.message}
                          {error && error?.data?.status === 403 && (
                            <Link className="px-3 py-2 mx-1 bg-blue-600" href={"/login"}>Login</Link>
                          )}
                        </option>
                      </>
                    )
                  )}
                </select>
              </div>
              <div className="flex flex-wrap gap-5 justify-evenly items-center">
                <div className="flex gap-4 justify-center items-center px-4 py-2 tracking-wider rounded-full ring-2 text-slate-500 font-title ring-slate-300/50">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="px-4 py-2 leading-tight rounded-full border border-none appearance-none outline-none bg-slate-100 focus:outline-blue-200 focus:border-blue-500"
                  />
                </div>
                <div
                  title="Today"
                  onClick={handleTodoDate}
                  className="flex justify-center items-center w-10 h-10 rounded-full ring-2 ring-slate-300/50"
                >
                  <div
                    className={`flex justify-center items-center w-4 h-4 rounded-full ring-2 ${
                      date === today ? "ring-blue-500" : "ring-gray-400"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 ${
                        date === today ? "bg-blue-500" : "bg-gray-400"
                      } rounded-full`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-16">
              <div className="flex justify-evenly px-8">
                <Link href="/new-task#catg">
                  <BiCategoryAlt />
                </Link>
                <Link href="/new-task#date">
                  <BsFlag />
                </Link>
                <div>
                  <BiMoon />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-16 pb-4">
              <button
                type="submit"
                className="px-8 py-4 font-bold tracking-wider rounded-full outline-2 outline-blue-500 bg-blue-600/95 font-raleway text-slate-100"
              >
                {" "}
                {isLoading && <LoadingCircleSvg />}
                {!token ? <Link href={"/login"}>Login first</Link> : "New task"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default page;
