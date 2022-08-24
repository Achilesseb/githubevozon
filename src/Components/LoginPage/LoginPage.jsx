import React, { useEffect } from "react";
import logo from "./GitHub-Mark-32px.png";
import useLoginHook from "../../customHooks/customLoginHook";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDataByUserId } from "../../utils";

const LoginPage = () => {
  const { login } = useLoginHook();
  const dispatch = useDispatch();
  const data = useSelector((data) => data);
  useEffect(() => {
    if (data.user.id) getDataByUserId(dispatch, data.user.id);
  }, [data.user.id]);
  return (
    <div
      className="relative flex justify-center mt-8 bg-no-repeat bg-cover"
      //   style="background-image: url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80);"
    >
      <div className="absolute inset-0 z-0 opacity-75 " />
      <div className="flex justify-center mx-0 align-middle sm:flex sm:flex-row">
        <div className="z-0 flex justify-center a">
          <div className="p-6 mx-auto bg-white rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">Sign In </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium tracking-wide text-gray-700">
                  Email
                </label>
                <input
                  className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="email"
                  placeholder="mail@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium tracking-wide text-gray-700">
                  Password
                </label>
                <input
                  className="content-center w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="w-4 h-4 bg-blue-500 border-gray-300 rounded focus:ring-blue-400"
                  />
                  <label
                    // for="remember_me"
                    className="block ml-2 text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-green-400 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full p-3 font-semibold tracking-wide text-gray-100 transition duration-500 ease-in bg-green-400 rounded-full shadow-lg cursor-pointer hover:bg-green-500"
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className="pt-5 text-xs text-center text-gray-400">
              <span>
                Copyright © 2021-2022
                <a
                  href="https://codepen.io/uidesignhub"
                  rel=""
                  target="_blank"
                  title="Ajimon"
                  className="text-green hover:text-green-500 "
                >
                  AJI
                </a>
              </span>
            </div>
            <div className="flex justify-center w-full p-3 font-semibold text-gray-400">
              Or continue with
            </div>
            <button
              onClick={login}
              className="flex justify-center w-full p-5 mt-2 font-semibold tracking-wide transition duration-500 ease-in border-2 shadow-2xl cursor-pointer rounded-xl "
            >
              <img className="flex justify-center" src={logo} />
            </button>
          </div>
        </div>
      </div>
      {data.user.user && !data.user.user?.message && (
        <Navigate to={`/${data.user.user?.login}`} replace={true} />
      )}
    </div>
  );
};
export default LoginPage;
