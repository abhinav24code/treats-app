// src/pages/JoinGroup.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinGroup } from "../services/groupService";
import "../styles/JoinGroup.css";

export default function JoinGroup() {
  const [formData, setFormData] = useState({
    userName: "",
    code: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const data = await joinGroup(formData);

      navigate("/group/" + data.code);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-container">
      <div className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </div>

      <div className="create-card">
        <div className="create-header">
          <div className="icon-box">🔑</div>
          <h2>Join a Group</h2>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <label htmlFor="userName">Your Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter your name"
            required
            value={formData.userName}
            onChange={handleChange}
          />

          <label htmlFor="code">Group Code</label>
          <input
            type="text"
            id="code"
            name="code"
            placeholder="Enter group code"
            required
            value={formData.code}
            onChange={handleChange}
          />

          <button type="submit" className="create-group-btn">
            Join Group
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
}
