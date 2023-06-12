"use client";
import LoadingCircleSvg from "@/components/svgs/LoadingCircleSvg";
import { useRegisterMutation } from "@/redux/api/RegisterApiSlice";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
type User = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  img: string;
};
const page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const [formError, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firstName) return setError("First Name is required!!");
    if (!lastName) return setError("Last Name is required!!");

    if (!email) return setError("email is required!!");

    if (password.length <= 7)
      return setError("Passwords must be at least 8 characters long!!");

    if (!/[A-Z]/.test(password))
      return setError("Password should contain Uppsercase letters!!");

    if (!/[a-z]/.test(password))
      return setError("Password should contain Lowercase letters!!");

    if (!/[0-9]/.test(password))
      return setError("Password should contain numbers!!");

    if (!/[!@#$%^&*]/.test(password))
      return setError("Password should contain seecial charaters (!@#$%^&*)!!");

    try {
      const result = await register({
        email,
        firstName,
        lastName,
        password,
        img,
      }).unwrap();
      console.log("register success---", result);

      setSuccess(result?.message);
      setEmail("");
      setFirstName("");
      setLastName("");
      setImg("");
      setPassword("");
    } catch (err) {
      console.log("resiter error---", err);
      setError("somthing went wrong!!");
    }
  };
  return (
    <section className="bg-slate-100">
      <div className="flex flex-col justify-center items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <div className="text-center">NGR</div>
        </Link>
        <div className="mt-0 w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold tracking-tight leading-tight text-center text-gray-900 md:text-2xl">
              Register for a free account
            </h1>
            <div className="text-center">
              <p className="text-green-600">{success}</p>
              <p className="text-red-400">{formError}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="First Name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="First Name"
                  id="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 -700 -600 -400  -blue-500 -blue-500"
                  placeholder="tej"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="Last Name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="Last Name"
                  id="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 -700 -600 -400  -blue-500 -blue-500"
                  placeholder="karki"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  p
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 -700 -600 -400  -blue-500 -blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone number"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your profile image link
                </label>
                <input
                  type="url"
                  name="img"
                  id="img"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 -700 -600 -400  -blue-500 -blue-500"
                  placeholder="img link"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
              <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                {isLoading && <LoadingCircleSvg />} Register
              </button>
              <p className="text-sm font-light text-gray-500 -400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:underline -500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
