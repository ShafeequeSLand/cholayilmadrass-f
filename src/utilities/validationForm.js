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

export const isDateValid = (dob, setState, ref) => {
  const dateRegex =  /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if (!dateRegex.test(dob)) {
    ref.current.innerText = "Date should be in MM/DD/YYYY format";
    ref.current.style.display = "block";
    setState(dob);
    return false;
  }

  // Clear any error message if validation passes
  ref.current.innerText = "";
  ref.current.style.display = "none";
  setState(dob);

  return true;
};



export const isPasswordValid = (password, setState, ref) => {
  // const passwordRegx = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{5,}$/;

  if (password.length < 5) {
    ref.current.innerText = "Password should contain 5 characters";
    ref.current.style.display = "block";
    setState(password);
    return false;
  }

  ref.current.innerText = "";
  ref.current.style.display = "none";
  setState(password);

  return true;
};

export const nameValidate = (name, setState, ref) => {
  const usernameRegx = /^[a-zA-Z]+@[0-9]{3}$/;


  if (!usernameRegx.test(name)) {
    ref.current.innerText = "Invalid username!";
    ref.current.style.display = "block";
    setState(name);
    return false;
  }

  ref.current.innerText = "";
  ref.current.style.display = "none";
  setState(name);

  return true;
};

