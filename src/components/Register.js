import React, { createContext, Component, useRef, useContext } from "react";
import Register from "../services/Register"
import { navigate } from "@reach/router";

const ARegister = () => {
  let email, password;
  const [user, setUser] = useContext(([{}, () => {}]));

  function ARegister(e) {
    async function fetchData() {
        Register.register(email, password)
        .then((response) => {
          if (response.data.accessToken) {
            setUser(response.data);
          }
          return response.data;
        });
    }
    fetchData();
  }

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        ARegister(e);
      }}>
        <label>Username</label>
        <input type="text" value={username} onChange={username = e.target.value}></input>
        <label>Password</label>
        <input type="password" value={password} onChange={password = e.target.value} ></input>

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
