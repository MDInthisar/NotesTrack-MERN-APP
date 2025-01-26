import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";

// useContext

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { setisLogin } = useContext(LoginContext);
  const notifyerror = (err) => toast.error(err);
  const notifysuccess = (msg) => toast.success(msg);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.data.message) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setisLogin(true);
        notifysuccess(response.data.message);
        navigate("/");
      } else {
        notifyerror(response.data.error);
      }
    } catch (error) {
      notifyerror(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Welcome Back!</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Log In
          </button>
          <span>
            new account <Link to="/signup">Signup</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
