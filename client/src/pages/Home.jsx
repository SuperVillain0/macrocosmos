import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { NavbarHome } from ".";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }

      const { data } = await axios.post(
        `https://macrocosmos.onrender.com/login`,
        {},
        { withCredentials: true }
      );

      const { status, user } = data;
      setUsername(user);
      // return status
      //   ? console.log("success")
      //   : (removeCookie("token"), navigate("/login"));
      if (status) {
        return;
      } else {
        return removeCookie("token"), navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  const getList = async () => {
    const table = document.getElementById("content");
    table.style.display = "block";

    try {
      const { data } = await axios.get(
        `https://macrocosmos.onrender.com/getlist`,
        {},
        { withCredentials: true }
      );

      const users = data.users;
      const tableContainer = document.getElementById("content");

      tableContainer.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            ${users
              .map(
                user => `
              <tr>
                <td>${user.firstname} ${user.lastname}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper">
      <NavbarHome />
      <div className="home-page">
        <div className="left">
          <header>
            Welcome <span>{username}</span>
            <br></br>
            <button className="btn btn-list white-btn" onClick={Logout}>
              Logout
            </button>
          </header>
        </div>
        <div className="right">
          <header>
            List of Saved Entries<br></br>
            <button className="btn btn-list white-btn" onClick={getList}>
              List
            </button>
          </header>
          <div className="list-content" id="content"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* <h4>
      {" "}
      Welcome <span>{username} </span>
    </h4>
    <button className="btn" onClick={Logout}>
      Logout
    </button> */
}
