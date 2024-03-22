import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from ".";
import axios from "axios";
import { toast } from "react-toastify";
import { BiUser, BiUserCircle, BiEnvelope, BiLockAlt } from "react-icons/bi";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    firstname: "",
    lastname: "",
    username: "",
    dob: "",
    email: "",
    password: ""
  });

  const { firstname, lastname, username, dob, email, password } = inputValue;

  const handleOnChange = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  const handleError = err => {
    toast.error(err, {
      pauseOnHover: false
    });
  };
  const handleSuccess = msg => {
    toast.success(msg, {
      pauseOnHover: false
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/signup",
        {
          ...inputValue
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1700);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }

    setInputValue({
      ...inputValue,
      firstname: "",
      lastname: "",
      username: "",
      dob: "",
      email: "",
      password: ""
    });
  };

  return (
    <div className="wrapper">
      <Navbar />

      <div className="form-box">
        <form
          className="register-container"
          id="register"
          onSubmit={handleSubmit}
        >
          <div className="top">
            <span>
              Have an account? <Link to={"/login"}>Login</Link>
            </span>
            <header>Sign Up</header>
          </div>
          <div className="two-forms">
            <div className="input-box">
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={firstname}
                onChange={handleOnChange}
                required
                className="input-field"
                placeholder="Firstname"
              />
              <span>
                <BiUser />
              </span>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={lastname}
                onChange={handleOnChange}
                required
                className="input-field"
                placeholder="Lastname"
              />
              <span>
                <BiUser />
              </span>
            </div>
          </div>
          <div className="two-forms two-forms-2">
            <div className="input-box">
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={handleOnChange}
                required
                className="input-field"
                placeholder="Username"
              />
              <span>
                <BiUserCircle />
              </span>
            </div>
            <div className="input-box">
              <input
                type="date"
                name="dob"
                id="dob"
                value={dob}
                onChange={handleOnChange}
                required
                className="input-field"
                placeholder="Date of Birth"
              />
            </div>
          </div>
          <div className="input-box">
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleOnChange}
              required
              className="input-field"
              placeholder="Email"
            />
            <span>
              <BiEnvelope />
            </span>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleOnChange}
              required
              className="input-field"
              placeholder="Password"
            />
            <span>
              <BiLockAlt />
            </span>
          </div>
          <div className="input-box">
            <button type="submit" className="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
