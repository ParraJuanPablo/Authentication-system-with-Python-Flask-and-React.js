import "../../styles/pages/success.css";
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();


  const [windowDimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  const logout = (e) => {
    actions.logout();
    navigate("/login");
  };

  useEffect(() => {
    if (store.token === null) {
      navigate("/login");
    }
  }, [store.token]);
  return (
    <>
      <div className="success">
        <div className="confettie-wrap" ref={windowDimension}>
          <h1> Nicely done!</h1>
          <h4>
            You're ready to start using our app
            <button className="btn btn-clear btn-block" onClick={logout}>Logout</button>
          </h4>
        </div>
      </div>
    </>
  );
};