import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
        "http://localhost:8080/login",
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
    <div className="form_container">
      <h2>Login Account</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Do not have an account? <Link to={"/signup"}>Sign Up</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
