// Email validation
export const isEmailValid = (email, setState, ref) => {
  const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegx.test(email)) {
    ref.current.innerText = "Invalid email address! Please check your email";
    setState(email);
    return false;
  }

  ref.current.innerText = "";
  setState(email);
  return true;
};

// Date of Birth validation
export const isDateValid = (dob, setState, ref) => {
  const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if (!dateRegex.test(dob)) {
    ref.current.innerText = "Date should be in MM/DD/YYYY format";
    ref.current.style.display = "block";
    setState((prevData) => ({ ...prevData, dob }));
    return false;
  }

  ref.current.innerText = "";
  ref.current.style.display = "none";
  setState((prevData) => ({ ...prevData, dob }));
  return true;
};

// Password validation
export const isPasswordValid = (password, setState, ref) => {
  if (password.length < 5) {
    ref.current.innerText = "Password should contain at least 5 characters";
    ref.current.style.display = "block";
    setState(password);
    return false;
  }

  ref.current.innerText = "";
  ref.current.style.display = "none";
  setState(password);
  return true;
};

// Username validation
export const userNameValidate = (name, setState, ref) => {
  const usernameRegx = /^[a-zA-Z]+@[0-9]{3}$/;

  if (!usernameRegx.test(name)) {
    ref.current.innerText = "Invalid username!";
    ref.current.style.display = "block";
    setState((prevData) => ({ ...prevData, username: name }));
    return false;
  }

  ref.current.innerText = "";
  ref.current.style.display = "none";
  setState((prevData) => ({ ...prevData, username: name }));
  return true;
};

// Name validation
export const nameValidate = (name, setState, ref) => {
  const nameRegx = /^[a-zA-Z\s]+$/;

  if (!nameRegx.test(name)) {
    ref.current.innerText = "Invalid name!";
    ref.current.style.display = "block";
    setState((prevData) => ({ ...prevData, name }));
    return false;
  }

  ref.current.innerText = "";
  ref.current.style.display = "none";
  setState((prevData) => ({ ...prevData, name }));
  return true;
};

// Father's Name validation
export const fNameValidate = (name, setState, ref) => {
  const nameRegx = /^[a-zA-Z\s]+$/;

  if (!nameRegx.test(name)) {
    ref.current.innerText = "Invalid Father's name!";
    ref.current.style.display = "block";
    setState((prevData) => ({ ...prevData, fatherName: name }));
    return false;
  }

  ref.current.innerText = "";
  ref.current.style.display = "none";
  setState((prevData) => ({ ...prevData, fatherName: name }));
  return true;
};

// Standard (Class) validation
export const standardValidate = (standard, setState, ref) => {
  const standardRegx = /^[0-9]{1,2}$/;

  if (!standardRegx.test(standard)) {
    ref.current.innerText = "Please select a valid class!";
    ref.current.style.display = "block";
    setState((prevData) => ({ ...prevData, standard:standard }));
    return false;
  }

  ref.current.innerText = "";
  ref.current.style.display = "none";
  setState((prevData) => ({ ...prevData, standard:standard }));
  return true;
};

// Phone number validation
export const phoneValidate = (phone, setState, ref) => {
  const phoneRegx = /^\d{10}$/;

  if (!phoneRegx.test(phone)) {
    ref.current.innerText = "Invalid phone number!";
    ref.current.style.display = "block";
    setState((prevData) => ({ ...prevData, phone }));
    return false;
  }

  ref.current.innerText = "";
  ref.current.style.display = "none";
  setState((prevData) => ({ ...prevData, phone }));
  return true;
};

// Address validation
export const addressValidate = (address, setState, ref) => {
  const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

  if (!addressRegex.test(address)) {
    ref.current.innerText = "Invalid address!";
    ref.current.style.display = "block";
    setState((prevData) => ({ ...prevData, address }));
    return false;
  }

  ref.current.innerText = "";
  ref.current.style.display = "none";
  setState((prevData) => ({ ...prevData, address }));
  return true;
};
