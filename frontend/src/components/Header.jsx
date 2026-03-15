// /components/Header.jsx

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroupByCode } from "../services/groupService";
import { MessageOutlined } from "@ant-design/icons";
import "../styles/Header.css";

export default function Header() {
  const { code } = useParams();
  const [groupName, setGroupName] = useState("");

  async function loadGroup() {
    try {
      const data = await getGroupByCode(code);
      setGroupName(data.name);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (code) {
      loadGroup();
    }
  }, [code]);

  return (
    <header className="app-header">
      {/* Left Section */}
      <div className="header-left">
        <div className="logo">
          <MessageOutlined className="logo-icon" />
          <span className="logo-text">Treats</span>
        </div>

        <span className="divider"></span>

        <span className="group-name">{groupName ? groupName : code}</span>
      </div>

      {/* Navigation */}
      <nav className="header-nav">
        <Link className="nav-link" to="">
          Dashboard
        </Link>
        <Link className="nav-link" to="add-treat">
          Add Treat
        </Link>
        <Link className="nav-link" to="leaderboard">
          Leaderboard
        </Link>
      </nav>
    </header>
  );
}
