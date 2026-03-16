import React from "react";

export default function TreatList({ treats, handleDelete }) {
  return (
    <div className="treat-section">
      <div className="treat-header">
        <h3>Recent Treats</h3>
      </div>

      {treats.length === 0 && (
        <p className="empty-text">No treats yet. Be the first to add one! 🎉</p>
      )}

      {Array.isArray(treats) &&
        treats.map((t) => (
          <div className="treat-card" key={t._id}>
            <div className="treat-left">
              <div className="treat-icon">🎁</div>

              <div className="treat-info">
                <div className="treat-title">{t.dishName}</div>
                <div className="treat-sub">
                  by {t.givenBy} • {t.funValue} pts
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
