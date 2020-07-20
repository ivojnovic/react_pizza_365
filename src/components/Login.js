import React, { createContext, Component, useRef, useContext } from "react";
import Auth from "../services/Auth";
import { navigate } from "@reach/router";

const Login = () => {
  let email, password;
  const [user, setUser] = useContext(([{}, () => {}]));


  function Login(e) {

    async function fetchData() {
        Auth.login(email, password)
    }
    fetchData();
  }

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        Login(e);
      }}>
        <label>Username</label>
        <input type="text" value={username} onChange={username = e.target.value}></input>
        <label>Password</label>
        <input type="password" value={password} onChange={password = e.target.value} ></input>

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
