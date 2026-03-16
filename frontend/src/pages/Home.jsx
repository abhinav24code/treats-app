// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();
  const [groupCode, setGroupCode] = useState("");

  const createGroup = () => {
    navigate("/create-group");
  };

  const joinDemoGroup = () => {
    navigate("/join-group");
  };

  const handleDirectJoin = () => {
    if (!groupCode.trim()) return;
    navigate(`/groups/${groupCode}`);
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
            Join new Group
          </button>
        </div>

        {/* Direct Join Section */}
        <div className="direct-join">
          <p className="direct-text">Already have a group code?</p>

          <div className="direct-input-box">
            <input
              type="text"
              placeholder="Enter Group Code"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
            />

            <button onClick={handleDirectJoin}>Join My Group</button>
          </div>
        </div>
      </div>
    </div>
  );
}
