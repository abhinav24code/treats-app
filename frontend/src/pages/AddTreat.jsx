import React, { useState } from "react";
import { addTreat } from "../services/treatService";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/addTreat.css";

export default function AddTreat() {
  const { code } = useParams();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [formData, setFormData] = useState({
    dishName: "",
    givenBy: "",
    funValue: 0,
    date: today,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const payload = {
        ...formData,
        groupId: code,
      };

      await addTreat(payload);

      setFormData({
        dishName: "",
        givenBy: "",
        funValue: 0,
        date: today,
      });

      navigate(`/group/${code}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="addtreat-container">
      <div className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </div>

      <div className="addtreat-card">
        <div className="addtreat-header">
          <div className="icon-box">🎁</div>
          <h2>Add a Treat</h2>
        </div>

        <form onSubmit={handleSubmit} className="addtreat-form">
          <label htmlFor="dishName">Treat Name</label>
          <input
            type="text"
            id="dishName"
            name="dishName"
            placeholder="e.g., Pizza, Coffee, Donuts"
            required
            value={formData.dishName}
            onChange={handleChange}
          />

          <label htmlFor="givenBy">Given By</label>
          <input
            type="text"
            id="givenBy"
            name="givenBy"
            placeholder="Enter name"
            required
            value={formData.givenBy}
            onChange={handleChange}
          />

          <label htmlFor="funValue">Fun Value (points)</label>
          <input
            type="number"
            id="funValue"
            name="funValue"
            placeholder="e.g., 10, 50, 100"
            required
            value={formData.funValue}
            onChange={handleChange}
          />

          <label>Date</label>
          <div className="date-box">{today}</div>

          <button type="submit" className="addtreat-btn">
            Add Treat
          </button>
        </form>
      </div>
    </div>
  );
}
