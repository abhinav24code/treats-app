import React from "react";

export default function ShareCode({ code }) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  return (
    <div className="share-card">
      <div>
        <p className="share-label">Invite Code</p>
        <h3>{code}</h3>
      </div>

      <button onClick={handleCopy} className="copy-btn">
        Copy
      </button>
    </div>
  );
}
