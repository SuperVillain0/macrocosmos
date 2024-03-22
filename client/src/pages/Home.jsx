import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { NavbarHome } from ".";
// import { Link } from "react-router-dom";
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
        "http://localhost:8080",
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
        "http://localhost:8080/getlist",
        {},
        { withCredentials: true }
      );

      const users = data.users;
      users.forEach(user => {
        const { userId, firstname, lastname, email, username, createdAt } =
          user;

        table.innerHTML += `
          <tr id="-${users.indexOf(user)}">${userId}</tr>
          <tr id="-${userId}">${firstname} ${lastname}</tr>
        `;
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // const generateHTML = () => {
  //   document.getElementById("username").innerHTML = `${username}!`;
  // };

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
          <div className="list-content" id="content">
            {/* <table>
              <tr>
                <th>S No.</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Date of Creation</th>
              </tr>
              <tr>
                <td>1.</td>
                <td>bitch ass cunt</td>
                <td>bitchass</td>
                <td>asdkjsa@gmail.com</td>
                <td>March 2024</td>
              </tr>
              <tr>
                <td>2.</td>
                <td>bitch ass cunt</td>
                <td>bitchass</td>
                <td>asdkjsa@gmail.com</td>
                <td>March 2024</td>
              </tr>
              <tr>
                <td>3.</td>
                <td>bitch ass cunt</td>
                <td>bitchass</td>
                <td>asdkjsa@gmail.com</td>
                <td>March 2024</td>
              </tr>
              <tr>
                <td>4.</td>
                <td>bitch ass cunt</td>
                <td>bitchass</td>
                <td>asdkjsa@gmail.com</td>
                <td>March 2024</td>
              </tr>
            </table> */}
          </div>
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
