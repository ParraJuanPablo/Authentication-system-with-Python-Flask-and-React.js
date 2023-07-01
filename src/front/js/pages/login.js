import React, { useState, useContext, useEffect } from "react";
import "../../styles/pages/signup.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const token = sessionStorage.getItem("token");
  // console.log("This is your token, token");

  const sendData = async (event) => {
    event.preventDefault();
    const response = await actions.login(email, password);
    if (response) {
      navigate("/success");
    } else {
      alert("invalid credentials");
    }
  };

  useEffect(() => {
    if (store.token && store.token != null) navigate("/");
  }, [store.token]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 register">
          <h1>Log In</h1>
          <form onSubmit={sendData}>
            <div className="form-group p-3">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group p-3">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter password"
              />
            </div>

            <div className="form-group p-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary m-3">
              Log In
            </button>

            <div className="d-flex justify-content-between m-2">
              <p className="cancel text-left">
                <a href="/signup">Create Account</a>
              </p>

              <p className="forgot-password text-right">
                Forgot <a href="forgotpassword">password?</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};