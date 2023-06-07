import React from "react";
import { AiOutlineCalendar, AiOutlineFolderAdd } from "react-icons/ai";
import { BsFlag } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { BiMoon } from "react-icons/bi";
const page = () => {
  return (
    <main className="bg-slate-200/80">
      <section className="px-4 py-4 mb-24">
        <div className="flex justify-end">
          <div className="flex justify-center items-center w-10 h-10 rounded-full ring-2 ring-slate-400/50">
            <IoMdClose className="w-8 h-8 text-slate-500" />
          </div>
        </div>
      </section>
      <section className="my-20">
        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="flex justify-center items-center">
            <input
              type="text"
              className="px-4 py-3 w-full bg-transparent rounded-lg border outline-none border-slate-300"
              placeholder="Enter new task"
            />
          </div>
          <div className="flex gap-5 items-center px-8">
            <div className="flex gap-4 justify-center items-center px-4 py-2 tracking-wider rounded-full ring-2 text-slate-500 font-title ring-slate-300/50">
              <AiOutlineCalendar /> Today
            </div>
            <div className="flex justify-center items-center w-10 h-10 rounded-full ring-2 ring-slate-300/50">
              <div className="flex justify-center items-center w-4 h-4 rounded-full ring-2 ring-blue-500">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-20">
          <div className="flex justify-evenly px-8">
            <div>
              <AiOutlineFolderAdd />
            </div>
            <div>
              <BsFlag />
            </div>
            <div>
              <BiMoon />
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-36 bg-slate-200/80">
        <div className="absolute right-12 bottom-14">
          <button className="px-8 py-4 font-bold tracking-wider rounded-full bg-blue-600/95 font-raleway text-slate-100">
            New task
          </button>
        </div>
      </section>
    </main>
  );
};

export default page;
