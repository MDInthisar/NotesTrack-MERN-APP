import React, { useEffect, useState } from "react";
import "./EditTodo.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditTodo = () => {
  const [edittitle, setedittitle] = useState("");
  const [editDescption, seteditDescption] = useState("");

  const { id } = useParams();
  const location = useLocation().state;
  const notifyerror = (err) => toast.error(err);
  const notifysuccess = (msg) => toast.success(msg);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
        notifyerror('not authorrized user please login')
        navigate('/login')
    }
  })
  

  const handleEdit = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/todo/edittodo/${id}`,{ edittitle, editDescption },{ withCredentials: true });
      
      if (response.data.message) {
        navigate("/");
        notifysuccess(response.data.message)
      }else{
        notifyerror(response.data.error)
      }
    } catch (error) {
        notifyerror(error)
    }
  };

  return (
    <div className="edit-todo-container">
      <h2>Edit Todo</h2>
      <div className="edit-form">
        <label className="input-label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="input-field"
          placeholder={location.title}
          value={edittitle}
          onChange={(e) => setedittitle(e.target.value)}
        />

        <label className="input-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="input-field"
          placeholder={location.descption}
          value={editDescption}
          onChange={(e) => seteditDescption(e.target.value)}
        ></textarea>

        <div className="buttons-container">
          <button className="edit-btn" onClick={() => handleEdit()}>
            Edit Todo
          </button>
          <button className="cancel-btn" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
