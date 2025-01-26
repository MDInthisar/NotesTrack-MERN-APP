import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const notifyerror = (err) => toast.error(err);
  const notifysuccess = (msg) => toast.success(msg);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        username,
        email,
        password,
      });

      if(response.data.message){
        notifysuccess(response.data.message)
        navigate('/login')
      }
      else{
        notifyerror(response.data.error)
      }
    } catch (error) {
      notifyerror(error.message)
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
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
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <span>Already have account <Link to='/login'>Login</Link> </span>
      </form>
    </div>
  );
};

export default SignUp;
