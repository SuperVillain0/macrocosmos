import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from ".";
import axios from "axios";
import { toast } from "react-toastify";
import { BiUser, BiLockAlt } from "react-icons/bi";
require("dotenv").config();

const base_url = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputValue;

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
        `${base_url}/login`,
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
        }, 2500);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: ""
    });
  };

  return (
    <div className="wrapper">
      <Navbar />

      <div className="form-box">
        <form className="login-container" id="login" onSubmit={handleSubmit}>
          <div className="top">
            <span>
              Don't have an account? <Link to={"/signup"}>Sign Up</Link>
            </span>
            <header>Login</header>
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
              <BiUser />
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
