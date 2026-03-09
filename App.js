import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const vibes = ["😀", "😎", "😴", "😡", "🥳", "🤯"];

  const [selectedVibe, setSelectedVibe] = useState(null);
  const [date, setDate] = useState(null);

  const today = new Date().toDateString();

  useEffect(() => {
    const storedData = localStorage.getItem("vibe");

    if (storedData) {
      const parsed = JSON.parse(storedData);

      if (parsed.date === today) {
        setSelectedVibe(parsed.vibe);
        setDate(parsed.date);
      }
    }
  }, []);

  const handleClick = (vibe) => {
    const data = {
      vibe: vibe,
      date: today,
    };

    localStorage.setItem("vibe", JSON.stringify(data));

    setSelectedVibe(vibe);
    setDate(today);
  };

  return (
    <div className="container">
      <h1 className="title">Select Your Vibe Today</h1>

      <div className="emoji-container">
        {vibes.map((vibe, index) => (
          <div
            key={index}
            onClick={() => handleClick(vibe)}
            className={`emoji ${selectedVibe === vibe ? "selected" : ""}`}
          >
            {vibe}
          </div>
        ))}
      </div>

      <div className="message">
        {selectedVibe ? (
          <p>
            Your vibe today is <b>{selectedVibe}</b> (Selected on {date})
          </p>
        ) : (
          <p>No vibe selected today.</p>
        )}
      </div>
    </div>
  );
}
