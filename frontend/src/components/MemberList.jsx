import React from "react";

export default function MemberList({ members }) {
  return (
    <div className="members-section">
      <h3>Members ({members.length})</h3>

      <div className="members-grid">
        {members.map((m, i) => (
          <div className="member-card" key={i}>
            <div className="member-avatar">{m.charAt(0).toUpperCase()}</div>

            <span>{m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
