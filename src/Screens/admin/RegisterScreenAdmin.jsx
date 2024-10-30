import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminauthSlice";
import { toast } from "react-toastify";
import { nameValidate, userNameValidate, fNameValidate, isDateValid, standardValidate, phoneValidate, addressValidate } from "../../utilities/adminvalidationForm";


function RegisterScreenAdmin() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    fatherName: "",
    dob: "",
    address: "",
    phone: "",
    standard: '',
  });
  console.log({ ...formData })
  const usernameRef = useRef()
  const nameRef = useRef()
  const fatherNameRef = useRef()
  const dobRef = useRef()
  const standardRef = useRef()
  const phoneRef = useRef()
  const addressRef = useRef()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  // Separate handle functions for each input field with validation
  const handleChangeUsername = (e) => {
    const { value } = e.target;
    userNameValidate(value, setFormData, usernameRef)
  };

  const handleChangeName = (e) => {
    const { value } = e.target;
    nameValidate(value, setFormData, nameRef)
  };

  const handleChangeFatherName = (e) => {
    const { value } = e.target;
    fNameValidate(value, setFormData, fatherNameRef)
  };

  const handleChangeDob = (e) => {
  const  value = e.target.value;
    isDateValid(value, setFormData, dobRef)
  };

  const handleChangeAddress = (e) => {
    const value  = e.target.value;
    addressValidate(value, setFormData, addressRef)
  };

  const handleChangePhone = (e) => {
    const { value } = e.target;

    phoneValidate(value, setFormData, phoneRef)

  };

  const handleChangeStandard = (e) => {
    const value = e.target.value
    standardValidate(value, setFormData, standardRef)

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validations = [
      userNameValidate(formData.username, setFormData, usernameRef),
      nameValidate(formData.name, setFormData, nameRef),
      fNameValidate(formData.fatherName, setFormData,fatherNameRef),
      isDateValid(formData.dob, setFormData,dobRef),
      addressValidate(formData.address, setFormData,addressRef),
      phoneValidate(formData.phone, setFormData,phoneRef),
      standardValidate(formData.standard, setFormData,standardRef),
    ];

    if (validations.every((isValid) => isValid)) {

      const id = toast.loading("Please wait...");
    try {

      const res = await register(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.update(id, {
        render: "Registration successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/admin/dashboard");
    } catch (err) {
      toast.update(id, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }
  };

  return (
    <div className="flex justify-center" style={{ background: "#edf2f7" }}>
      <div className="max-w-md w-full mb-10 mt-11 space-y-8 p-10 bg-white rounded-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Register Student</h2>
          <p className="mt-2 text-sm text-gray-600">Please create your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Username and Name */}
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <label htmlFor="username" className="text-sm font-bold text-gray-700 tracking-wide">Username</label>
              <input
                id="username"
                name="username"
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChangeUsername}
              />
              <div className="text-red-700 mt-2">
                <span ref={usernameRef}></span>
              </div>
            </div>
            <div className="relative w-1/2">
              <label htmlFor="name" className="text-sm font-bold text-gray-700 tracking-wide">Name</label>
              <input
                id="name"
                name="name"
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChangeName}
              />
              <div className="text-red-700 mt-2">
                <span ref={nameRef}></span>
              </div>
            </div>
          </div>

          {/* Father's Name */}
          <div className="relative">
            <label htmlFor="fatherName" className="text-sm font-bold text-gray-700 tracking-wide">Father's Name</label>
            <input
              id="fatherName"
              name="fatherName"
              className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Enter Father's Name"
              value={formData.fatherName}
              onChange={handleChangeFatherName}
            />
            <div className="text-red-700 mt-2">
              <span ref={fatherNameRef}></span>
            </div>
          </div>

          {/* Date of Birth and Standard */}
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <label htmlFor="dob" className="text-sm font-bold text-gray-700 tracking-wide">Date of Birth</label>
              <input
                id="dob"
                name="dob"
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="date"
                value={formData.dob}
                onChange={handleChangeDob}
              />
              <div className="text-red-700 mt-2">
                <span ref={dobRef}></span>
              </div>
            </div>
            <div className="relative w-1/2">
              <label htmlFor="standard" className="text-sm font-bold text-gray-700 tracking-wide">Standard</label>
              <select
                id="standard"
                name="standard"
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                value={formData.standard}
                onChange={handleChangeStandard}
              >
                <div className="text-red-700 mt-2">
                  <span ref={standardRef}></span>
                </div>
                <option value="">Select Standard</option>
                {[...Array(12).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="relative">
            <label htmlFor="address" className="text-sm font-bold text-gray-700 tracking-wide">Address</label>
            <textarea
              id="address"
              name="address"
              className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChangeAddress}
            />
            <div className="text-red-700 mt-2">
              <span ref={addressRef}></span>
            </div>
          </div>

          {/* Phone Number */}
          <div className="relative">
            <label htmlFor="phone" className="text-sm font-bold text-gray-700 tracking-wide">Phone Number</label>
            <input
              id="phone"
              name="phone"
              className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="tel"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChangePhone}
            />
            <div className="text-red-700 mt-2">
              <span ref={phoneRef}></span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center mb-4 bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreenAdmin;
