import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLeaderboard } from "../services/treatService";
import "../styles/leaderboard.css";

export default function Leaderboard() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("fun");

  async function getLeaderBoardData(code) {
    try {
      setLoading(true);

      const data = await getLeaderboard(code);
      const leaderBoard = data?.leaderboard || [];

      setLeaders(leaderBoard);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!code) return;
    getLeaderBoardData(code);
  }, [code]);

  // search filter
  const filteredLeaders = leaders.filter((leader) =>
    leader._id.toLowerCase().includes(search.toLowerCase()),
  );

  // sorting
  const sortedLeaders = [...filteredLeaders].sort((a, b) => {
    if (sortType === "fun") return b.totalFun - a.totalFun;
    if (sortType === "name") return a._id.localeCompare(b._id);
    return 0;
  });

  return (
    <div className="leaderboard-container">
      <div className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </div>

      <div className="leaderboard-card">
        <div className="leaderboard-header">
          <div className="icon-box">🏆</div>
          <h2>Leaderboard</h2>
        </div>

        {/* Controls */}

        <div className="leaderboard-controls">
          <input
            type="text"
            placeholder="Search member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="fun">Sort by Fun Points</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {loading && <p className="loading">Loading leaderboard...</p>}

        {!loading && sortedLeaders.length === 0 && (
          <p className="empty">No leaderboard data yet 🍩</p>
        )}

        <div className="leader-list">
          {sortedLeaders.map((leader, index) => {
            let medal = "";
            if (index === 0) medal = "🥇";
            else if (index === 1) medal = "🥈";
            else if (index === 2) medal = "🥉";

            return (
              <div className="leader-card" key={leader._id}>
                <div className="leader-left">
                  <div className="leader-rank">{medal || `#${index + 1}`}</div>

                  <div className="leader-avatar">
                    {leader._id.charAt(0).toUpperCase()}
                  </div>

                  <div className="leader-info">
                    <div className="leader-name">{leader._id}</div>
                    <div className="leader-points">
                      {leader.totalFun} fun points
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
