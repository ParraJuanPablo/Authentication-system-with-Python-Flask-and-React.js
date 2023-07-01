import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/pages/signup.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response1 = await actions.signup({
      email: email,
      password: password,
    });
    if (response1) {
      navigate("/success");
    } else {
      alert("No se pudo iniciar sesión");
    }
  };

  useEffect(() => {
    if (store.token && store.token != null) navigate("/");
  }, [store.token]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 register mt-10">
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
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
              Sign up
            </button>

            <div className="col-md-12 d-flex justify-content-between m-3">
              <p className="forgot-password text-left">
                Already registered <a href="login">log in?</a>
              </p>
            </div>
          </form>
          {auth ? <Redirect to="/login" /> : null}
        </div>
      </div>
    </div>
  );
};