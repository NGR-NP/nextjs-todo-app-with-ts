"use client";

import React from "react";
import { useState } from "react";
import {
  AiOutlineAppstore,
  AiOutlineHome,
  AiOutlineLeft,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { HiMenuAlt1 } from "react-icons/hi";
import {
  IoIosAddCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { FcTodoList } from "react-icons/fc";
import Link from "next/link";
const NavBar = ({
  firstName,
  lastName,
  img,
}: {
  firstName: string;
  lastName: string;
  img: string;
}) => {
  const [showSidePannel, setShowSidePannel] = useState(false);

  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);
  const handleSearch = () => {
    setOpenSearchBar(!openSearchBar);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit", searchQuery);
  };
  return (
    <>
      <nav className="sticky top-0 z-40 px-4 py-4 backdrop-blur-sm md:hidden bg-slate-200">
        <div className="flex gap-2 justify-between items-center">
          <div className="flex-[0.5]">
            <HiMenuAlt1
              onClick={() => setShowSidePannel(!showSidePannel)}
              className="w-6 h-6 fill-slate-500"
            />
          </div>

          <div className="flex-[1] flex justify-end gap-3">
            <div className={`${openSearchBar ? "visible" : "hidden"} relative`}>
              <form action={handleSubmit}>
                <input
                  type="search"
                  className="py-3 pr-8 pl-2 h-6 rounded border-none outline-none text-ellipsis"
                  name="search"
                  value={searchQuery}
                  id="search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch
                  type="submit"
                  onClick={handleSearch}
                  className="absolute inset-y-1 right-3 w-4 h-4 text-slate-500"
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
              <IoMdNotificationsOutline className="w-6 h-6 fill-slate-500" />
            </div>
          </div>
        </div>
      </nav>
      <aside
        className={`${
          showSidePannel ? "visible" : "invisible -translate-x-full"
        } fixed  top-0 bottom-0 z-40 w-[70%] bg-[#251263] duration-500 md:hidden`}
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
              <Link href="/home">Home</Link>
            </li>
            <li className="flex gap-5 items-center my-4 text-xl font-paragraph text-slate-100">
              <IoIosAddCircleOutline className="w-5 h-5 text-slate-400" />
              <Link href="/new-todo">New Todo</Link>
            </li>
            <li className="flex gap-5 items-center my-4 text-xl font-paragraph text-slate-100">
              {" "}
              <FcTodoList className="w-5 h-5" /> All Todos
            </li>
            <li className="flex gap-5 items-center my-4 text-xl font-paragraph text-slate-100">
              {" "}
              <AiOutlineAppstore className="w-5 h-5 text-slate-400" />
              Category
            </li>
            <li className="flex gap-5 items-center my-4 text-xl font-paragraph text-slate-100">
              {" "}
              <img
                src={img}
                className="object-cover w-5 h-5 rounded-full ring-2 ring-fuchsia-500"
              />{" "}
              Profile
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
