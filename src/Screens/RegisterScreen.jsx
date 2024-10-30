import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import initial from "../assets/dummyImage.png";
import {
  isEmailValid,
  isPasswordValid,
  nameValidate,
} from "../utilities/validationForm";

function RegisterScreen() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(initial);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  const handleChangeName = (e) => {
    const NameValue = e.target.value;
    nameValidate(NameValue, setUsername, usernameRef);
  };
  const handleChangeEmail = (e) => {
    const emailValue = e.target.value;
    isEmailValid(emailValue, setEmail, emailRef);
  };
  const handleChangePassword = (e) => {
    const passwordValue = e.target.value;
    isPasswordValid(passwordValue, setPassword, passwordRef);
  };
  const handleChangeCPassword = (e) => {
    const passwordValue = e.target.value;
    isPasswordValid(passwordValue, setConfirmPassword, cpasswordRef);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      setImageFile(file); // Store the selected image file in state
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not Match");
    } else {
      if (
        isEmailValid(email, setEmail, emailRef) &&
        nameValidate(name, setUsername, usernameRef) &&
        isPasswordValid(password, setPassword, passwordRef) &&
        isPasswordValid(confirmPassword, setConfirmPassword, cpasswordRef)
      ) {
        const id = toast.loading("Please wait...");
        try {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("image", imageFile);
          const res = await register(formData).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.update(id, {
            render: "Registration Succefully",
            type: "success",
            isLoading: false,
            autoClose: 3000, // Close the toast after 3 seconds
          });
      
          navigate("/");
        } catch (err) {
          if (
            err?.data?.message ===
            "Cannot read properties of undefined (reading 'path')"
          ) {
            toast.update(id, {
              render: "Please add an image",
              type: "warning",
              isLoading: false,
              autoClose: 3000, // Close the toast after 5 seconds
            });
        
          } else {
            console.log(err?.data?.message || err.error,);
            
            toast.update(id, {
              render: err?.data?.message || err.error,
              type: "error",
              isLoading: false,
              autoClose: 2000, // Close the toast after 5 seconds
            });
           
          }
        }
      }
    }
  };
  return (
    <>
      <div className="  flex  justify-center" style={{ background: "#edf2f7" }}>
        <div className="max-w-md w-full mt-10 mb-10 space-y-8 p-10 bg-white rounded-xl">
          <div className="text-center">
            <h2 className=" text-3xl font-bold text-gray-900">Register User</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please create your account
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="mx-auto w-32 h-32 relative -mt-4 border-4 border-white rounded-full overflow-hidden">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChange}
                id="fileInput"
              />
              <label htmlFor="fileInput">
                <img
                  className="object-cover object-center h-32 cursor-pointer"
                  src={imageUrl}
                  alt="Woman looking front"
                />
              </label>
            </div>
            <div className="relative">
              <label
                htmlFor="email"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Username
              </label>
              <input
                id="username"
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={handleChangeName}
              />
              <div className="text-red-700 mt-2">
                <span ref={usernameRef}></span>
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="email"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Email
              </label>
              <input
                id="email"
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="email"
                placeholder="mail@gmail.com"
                value={email}
                onChange={handleChangeEmail}
              />
              <div className="text-red-700 mt-2">
                <span ref={emailRef}></span>
              </div>
            </div>
            <div className="mt-8 mb-3 content-center">
              <label
                htmlFor="password"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Password
              </label>
              <input
                id="password"
                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChangePassword}
              />
              <div className="text-red-700 mt-2">
                <span ref={passwordRef}></span>
              </div>
            </div>
            <div className="mt-8 mb-3 content-center">
              <label
                htmlFor="password"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Confirm Password
              </label>
              <input
                id="password"
                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Re Enter password"
                value={confirmPassword}
                onChange={handleChangeCPassword}
              />
              <div className="text-red-700 mt-2">
                <span ref={cpasswordRef}></span>
              </div>
            </div>

            <div>
              {isLoading&&<Loader/>}
              <button
                type="submit"
                className="w-full flex justify-center mb-4 bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <Link to="/login">
              <span>Don't have an account?</span>
              <a className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">
                Login
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterScreen;
