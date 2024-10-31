import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { nameValidate, isDateValid } from "../utilities/validationForm";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [dateofBirth, setDateofBirth] = useState("");
console.log(dateofBirth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const dateofBirthRef = useRef(null);
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      toast.success("Login successfully");
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleChangeUsername = (e) => {
    const usernameValue = e.target.value;
    nameValidate(usernameValue, setUsername, usernameRef);
  };
  const handleChangeDob = (e) => {
    const dateValue = e.target.value;
    console.log(dateValue);
    isDateValid(dateValue, setDateofBirth, dateofBirthRef);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();


    let id = null
    try {
      // Validate username and dateofbirth before proceeding
      if (
        nameValidate(username, setUsername, usernameRef) &&
        isDateValid(dateofBirth, setDateofBirth, dateofBirthRef)
      ) {
        // Attempt to log in
        // Display a loading toast notification
        id = toast.loading("Please wait...");
        const res = await login({ username, dateofBirth }).unwrap();

        // Dispatch the credentials to the store on successful login
        dispatch(setCredentials({ ...res }));

        // Update the toast notification on success
        toast.update(id, {
          render: "Login successful!",
          type: "success",
          isLoading: false,
          autoClose: 3000, // Close the toast after 3 seconds
        });

        // Navigate to the home page
        navigate("/");
      }
    } catch (err) {
      // Update the toast notification on error
      toast.update(id, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 3000, // Close the toast after 5 seconds
      });

      // Optionally, you can log the error to the console
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "#edf2f7" }}
      >
        <div className="max-w-md w-full space-y-8 mt-10 mb-10 p-10 bg-white rounded-xl">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Student Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label
                htmlFor="username"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Username
              </label>
              <input
                id="username"
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="name"
                placeholder="user@071"
                value={username}
                onChange={handleChangeUsername}
              />
              <div className="text-red-700 mt-2">
                <span ref={usernameRef}></span>
              </div>
            </div>
            <div className="mt-8 mb-3 content-center">
              <label
                htmlFor="date"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Date of Birth
              </label>
              <input
                id="dateofbirth"
                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="date"
                placeholder="Enter your date of birth"
                value={dateofBirth}
                onChange={handleChangeDob}
              />
              <div className="text-red-700 mt-2">
                <span ref={dateofBirthRef}></span>
              </div>
            </div>
            <div>
              {isLoading && <Loader />}
              <button
                type="submit"
                className="w-full flex justify-center mb-4 bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Login in
              </button>
            </div>
          </form>
          {/* <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <Link to="/signup">
              <span>Don't have an account?</span>
              <a className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">
                Sign up
              </a>
            </Link>
          </p> */}
        </div>
      </div>
    </>
  );
}

export default LoginScreen;
