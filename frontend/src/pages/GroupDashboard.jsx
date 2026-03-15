import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGroupByCode } from "../services/groupService";
import { getTreatsByGroup, deleteTreat } from "../services/treatService";

import MemberList from "../components/MemberList";
import TreatList from "../components/TreatList";
import ShareCode from "../components/ShareCode";

import "../styles/dashboard.css";

export default function GroupDashboard() {
  const { code } = useParams();

  const [members, setMembers] = useState([]);
  const [treats, setTreats] = useState([]);
  const [topContributor, setTopContributor] = useState(null);

  async function loadGroupDashboardData(code) {
    try {
      const membersData = await getGroupByCode(code);
      const members = membersData?.members || [];
      setMembers(members);

      const treatsData = await getTreatsByGroup(code);
      const treats = treatsData?.treats || [];
      setTreats(treats);
    } catch (error) {
      console.error("Dashboard loading failed:", error);
    }
  }

  function calculateTopContributor(treats) {
    if (!treats.length) return null;

    const totals = {};

    for (let treat of treats) {
      const name = treat.givenBy;
      totals[name] = (totals[name] || 0) + treat.funValue;
    }

    let leader = null;
    let maxFun = 0;

    for (let person in totals) {
      if (totals[person] > maxFun) {
        maxFun = totals[person];
        leader = person;
      }
    }

    return { name: leader, points: maxFun };
  }

  useEffect(() => {
    if (!code) return;

    loadGroupDashboardData(code);
  }, [code]);

  useEffect(() => {
    const result = calculateTopContributor(treats);
    setTopContributor(result);
  }, [treats]);

  const handleDelete = async (id) => {
    await deleteTreat(id);
    setTreats((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Group Dashboard</h2>

      {/* Stats */}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{members.length}</div>
          <div className="stat-label">Members</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{treats.length}</div>
          <div className="stat-label">Treats</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {topContributor ? topContributor.points : 0}
          </div>
          <div className="stat-label">Points</div>
        </div>
      </div>

      {/* Invite Code */}

      <ShareCode code={code} />

      {/* Top Contributor */}

      {topContributor && (
        <div className="top-card">
          <div>
            <p className="top-label">Top Contributor</p>
            <h3>{topContributor.name}</h3>
            <span>{topContributor.points} points</span>
          </div>
        </div>
      )}

      {/* Members */}

      <MemberList members={members} />

      {/* Treats */}

      <TreatList treats={treats} handleDelete={handleDelete} />
    </div>
  );
}
