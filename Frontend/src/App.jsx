import React, { useState } from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import SignUp from "./components/Signup";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Home from "./components/Home";

// Login Context
import { LoginContext } from "./context/LoginContext";
import EditTodo from "./components/EditTodo";

const App = () => {
  const [isLogin, setisLogin] = useState(false);
  return (
    <BrowserRouter>
    <LoginContext.Provider value={{setisLogin, isLogin}}>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/edittodo/:id' element={<EditTodo/>} />
      </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
};

export default App;
