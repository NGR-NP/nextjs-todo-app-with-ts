"use client";

import { useLoginMutation } from "@/redux/api/AuthApiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentToken, setCredentials } from "@/redux/slice/AuthSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingCircleSvg from "@/components/svgs/LoadingCircleSvg";
import Link from "next/link";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector(selectCurrentToken);
  useEffect(() => {
    if (token) {
      router.push("/home");
    }
  }, []);
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      const result = await login({ email, password }).unwrap();
      const { firstName, lastName, img, id, accessToken } = result;
      if (isSuccess) {
        router.push("/home");
        dispatch(
          setCredentials({
            firstName,
            lastName,
            img,
            id,
            token: accessToken,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="top-0 h-screen">
      <section className="bg-gray-50">
        <div className="flex flex-col justify-center items-center px-6 py-8 mx-auto h-screen lg:py-0">
          <Link
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <div className="px-4 py-1 text-center bg-green-400 rounded text-slate-50">
               NGR 
            </div>
          </Link>
          <div className="mt-0 w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold tracking-tight leading-tight text-center text-gray-900 md:text-2xl">
                Login to your account
              </h1>
              <p className="text-red-400">{isError && error?.data?.message}</p>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 -700 -600 -400  -blue-500 -blue-500"
                    placeholder="name@email.com"
                    required
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
                    autoComplete="ture"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="•••••••••••••"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 -700 -600 -400  -blue-500 -blue-500"
                    required
                  />
                </div>
                <button
                  disabled={isLoading}
                  className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center -600 -blue-700 -blue-800"
                >
                  {isLoading && <LoadingCircleSvg />} Login
                </button>
                <p className="text-sm font-light text-gray-500 -400">
                  Don't have account yet?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-blue-600 hover:underline -500"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
