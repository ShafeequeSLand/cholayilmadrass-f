import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <ToastContainer />

      <Outlet />
    </>
  );
}

export default App;
