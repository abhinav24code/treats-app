// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  const createGroup = () => {
    navigate("/create-group");
  };

  const joinDemoGroup = () => {
    navigate("/join-group");
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <div className="logo-box">🎁</div>

        <h1 className="title">Treats</h1>
        <p className="subtitle">Track treats with your friends</p>

        <div className="button-group">
          <button className="create-btn" onClick={createGroup}>
            Create a Group
          </button>

          <button className="join-btn" onClick={joinDemoGroup}>
            Join a Group
          </button>
        </div>
      </div>
    </div>
  );
}
