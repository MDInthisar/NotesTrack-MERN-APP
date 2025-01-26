import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";
import axios from "axios";
import EditTodo from "./EditTodo";

const Home = () => {
  const [title, settitle] = useState("");
  const [descption, setdescption] = useState("");
  const [alltodos, setalltodos] = useState([]);
  const notifyerror = (err) => toast.error(err);
  const notifysuccess = (msg) => toast.success(msg);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      notifyerror("user not autherrosid");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    displayTodo();
  }, []);

  const createTodo = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/todo/create`,{ title, descption },{ withCredentials: true });
      if (response.data.message) {
        notifysuccess(response.data.message);
        settitle("");
        setdescption("");
      } else {
        notifyerror(response.data.error);
      }
    } catch (error) {
      notifyerror(error);
    }
  };

  const displayTodo = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/todo/alltodos`, {
        withCredentials: true,
      });
      setalltodos(response.data);
    } catch (error) {
      notifyerror(error.message);
    }
  };

  const deleteTodo = async (postID) => {
    const confirms = confirm('click ok to delete');
    if(confirms){
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/todo/delete/${postID}`,
          { withCredentials: true }
        );
        if (response.data.message) {
          return notifysuccess(response.data.message);
        }
      } catch (error) {
        notifyerror(error);
      }
    }
  };

  const handleEdit = (todoID, title, descption) => {
    navigate(`/edittodo/${todoID}`, { state: { title, descption } });
  };

  // Function to format date
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour clock with AM/PM
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  const handleLogout = ()=>{
    const confirms = confirm('click ok to logout')
    if(confirms){
      localStorage.clear();
      navigate('/login')
    }
  }

  return (
    <>
      <div className="container">
        <span  style={{backgroundColor:'red', padding:'1vw', borderRadius:'1vw', cursor:'pointer'}} onClick={()=> handleLogout()}>Logout</span>
        <div className="task-creation">
          <input
            type="text"
            placeholder="Enter your task here"
            className="task-input"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <textarea
            placeholder="descption"
            value={descption}
            onChange={(e) => setdescption(e.target.value)}
          ></textarea>
          <button className="create-btn" onClick={() => createTodo()}>
            Create Todo
          </button>
        </div>
        <div className="task-lists">
          {alltodos.length > 0 ? (
            alltodos.slice().reverse().map((data) => (
              <div className="task-card" key={data._id}>
                <h2>{data.title}</h2>
                <p>{data.descption}</p>
                <h2>Created At: {formatDate(data.created)}</h2>
                <h2>Last Update: {formatDate(data.updated)}</h2>
                <div className="task-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(data._id, data.title, data.descption)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(data._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1>No Todos</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
