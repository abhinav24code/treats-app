// src/pages/CreateGroup.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addGroup } from "../services/groupService";
import "../styles/createGroup.css";

export default function CreateGroup() {
  const [formData, setFormData] = useState({
    name: "",
    maxMembers: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxMembers" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending data:", formData);

      const data = await addGroup(formData);
      const groupCode = data.code;

      setFormData({
        name: "",
        maxMembers: "",
      });

      navigate("/group/" + groupCode);
    } catch (err) {
      console.error("Failed to create group", err);
    }
  };

  return (
    <div className="create-container">
      <div className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </div>

      <div className="create-card">
        <div className="create-header">
          <div className="icon-box">👥</div>
          <h2>Create a Group</h2>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <label htmlFor="name">Group Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter group name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="maxMembers">Maximum Members</label>
          <input
            type="number"
            id="maxMembers"
            name="maxMembers"
            placeholder="Enter max members"
            required
            value={formData.maxMembers}
            onChange={handleChange}
          />

          <button type="submit" className="create-group-btn">
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
}
