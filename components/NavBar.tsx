"use client";

import React from "react";
import { useState } from "react";
import {
  AiOutlineAppstore,
  AiOutlineHome,
  AiOutlineLeft,
} from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoIosAddCircleOutline, IoMdLogOut } from "react-icons/io";
import { FcTodoList } from "react-icons/fc";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  logout,
  selectCurrentFirstName,
  selectCurrentLastName,
} from "@/redux/slice/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { emptyTodo } from "@/redux/slice/TodoSlice";
import { useRouter } from "next/navigation";
import { emptyTodayTask } from "@/redux/slice/TodayTaskSlice";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const img =
    "https://tejbahadurkarki.com.np/static/media/tej1.7974611c688e1b32cc4b.jpg";
  const pathname = usePathname();

  const isActive = (link: string) => pathname === link;
  const router = useRouter();

  const firstName = useAppSelector(selectCurrentFirstName);
  const lastName = useAppSelector(selectCurrentLastName);
  const [showSidePannel, setShowSidePannel] = useState(false);

  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    setOpenSearchBar(!openSearchBar);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit", searchQuery);
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(emptyTodo());
    dispatch(emptyTodayTask());
    router.push("/login");
  };
  return (
    <>
      <nav className="sticky top-0 z-40 px-4 py-4 backdrop-blur-sm bg-slate-300/70">
        <div className="flex gap-2 justify-between items-center">
          <div className=" flex-[0.5]">
            <div className="text-lg font-bold tracking-widest max-md:hidden text-slate-600 font-raleway">
              NGR
            </div>

            <HiMenuAlt1
              onClick={() => setShowSidePannel(!showSidePannel)}
              className="w-6 h-6 md:hidden fill-slate-500"
            />
          </div>
          <div className="flex-1 max-md:hidden">
            <ul className="flex gap-3">
              <li
                className={`px-2 py-1 rounded font-bitter text-slate-800 bg-slate-50 ${
                  isActive("/home") && "bg-blue-600/90 text-slate-50"
                }`}
              >
                <Link href="/home">Home</Link>
              </li>
              <li
                className={`px-2 py-1 rounded font-bitter text-slate-800 bg-slate-50 ${
                  isActive("/new-task") && "bg-blue-600/90 text-slate-50"
                }`}
              >
                <Link href="/new-task">New Task</Link>
              </li>
              <li
                className={`px-2 py-1 rounded font-bitter text-slate-800 bg-slate-50 ${
                  isActive("/all-task") && "bg-blue-600/90 text-slate-50"
                }`}
              >
                <Link href="/all-task">All Task</Link>
              </li>
              <li
                className={`px-2 py-1 rounded font-bitter text-slate-800 bg-slate-50 ${
                  isActive("/profile") && "bg-blue-600/90 text-slate-50"
                }`}
              >
                <Link href="/profile">Profile</Link>
              </li>
            </ul>
          </div>

          <div className="flex[0.5] flex gap-3 justify-end">
            <div
              className={`${openSearchBar ? "visible" : "invisible"} relative`}
            >
              <form
                className="absolute right-0 -top-1 py-1 pr-10 pl-1 rounded shadow-xl bg-slate-100"
                action={handleSubmit}
              >
                <input
                  type="search"
                  className="py-3 pr-8 pl-4 w-44 h-6 rounded border-none outline-none sm:w-[70vmin] lg:w-60 text-ellipsis"
                  name="search"
                  autoFocus
                  placeholder="search...."
                  value={searchQuery}
                  id="search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch
                  type="submit"
                  onClick={handleSearch}
                  className="absolute inset-y-2 right-3 w-4 h-4 text-slate-500"
                />
              </form>
            </div>
            <div className="flex gap-4 items-cente">
              <FiSearch
                onClick={() => setOpenSearchBar(!openSearchBar)}
                className={`${
                  !openSearchBar ? "visible" : "hidden"
                } w-6 h-6 text-slate-500`}
              />
              <IoMdLogOut
                onClick={handleLogout}
                className="w-6 h-6 fill-slate-500"
              />
            </div>
          </div>
        </div>
      </nav>
      <aside
        className={`${
          showSidePannel ? "visible" : "invisible -translate-x-full"
        } fixed overflow-x-scroll flex flex-col justify-between  top-0 bottom-0 z-40 w-[70%] sm:w-[40%] bg-[#251263] duration-500 md:hidden`}
      >
        <div className="pt-8 pb-4">
          <div className="flex justify-end px-4">
            <div className="px-1 py-1 rounded-full ring-2 ring-slate-500 bg-[#1f0f53]">
              <AiOutlineLeft
                onClick={() => setShowSidePannel(!showSidePannel)}
                className={`${
                  !showSidePannel && "rotate-180"
                } w-6 h-6 text-slate-300`}
              />
            </div>
          </div>
          <nav className="pt-8">
            <ul className="px-8">
              <li className="flex relative justify-center items-center">
                <div className="absolute z-50 w-[6.3rem] h-[6.3rem] rounded-full border-[3px]  border-r-fuchsia-600  border-slate-600" />
                <div className="flex justify-center items-center rounded-full ring-1">
                  <img
                    className="object-cover w-20 h-20 rounded-full"
                    src={img}
                    alt="profile picture"
                  />
                </div>
              </li>
              <li className="mt-8 mb-2 text-7xl font-bold font-paragraph text-slate-100">
                {firstName}
              </li>
              <li className="mt-2 mb-8 text-7xl font-bold font-paragraph text-slate-100">
                {lastName}
              </li>
              <li className="flex gap-5 items-center my-4 text-xl font-paragraph text-slate-100">
                <AiOutlineHome className="w-5 h-5 text-slate-400" />
                <Link
                  className={` ${
                    isActive("/") || isActive("/home")
                      ? "bg-blue-600/90 text-slate-50 px-2"
                      : ""
                  }`}
                  href="/home"
                >
                  Home
                </Link>
              </li>
              <li className="flex gap-5 items-center my-4 text-xl font-paragraph text-slate-100">
                <IoIosAddCircleOutline className="w-5 h-5 text-slate-400" />
                <Link
                  className={`${
                    isActive("/new-task") && "px-2 bg-blue-600/90 text-slate-50"
                  }`}
                  href="/new-task"
                >
                  New Task
                </Link>
              </li>
              <li className="flex gap-5 items-center my-4 text-xl font-paragraph text-slate-100">
                {" "}
                <FcTodoList className="w-5 h-5" />
                <Link
                  className={` ${
                    isActive("/all-task") && "px-2 bg-blue-600/90 text-slate-50"
                  }`}
                  href={"/all-task"}
                >
                  All Tasks
                </Link>
              </li>
              <li className="flex gap-5 items-center my-4 text-xl font-paragraph text-slate-100">
                {" "}
                <AiOutlineAppstore className="w-5 h-5 text-slate-400" />
                <Link
                  className={` ${
                    isActive("/category") && "px-2 bg-blue-600/90 text-slate-50"
                  }`}
                  href={"/category"}
                >
                  Category
                </Link>
              </li>
              <li className="flex gap-5 items-center my-4 text-xl font-paragraph text-slate-100">
                {" "}
                <img
                  src={img}
                  className="object-cover w-5 h-5 rounded-full ring-2 ring-fuchsia-500"
                />
                <Link
                  className={`  ${
                    isActive("/profile") && "bg-blue-600/90 text-slate-50 px-2"
                  }`}
                  href="/profile"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div onClick={handleLogout} className="flex gap-3 justify-center items-center py-2 text-center bg-slate-300">
          Logout <IoMdLogOut/>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
