import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPageAdmin = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to results page with search query
      navigate(`/results?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="jamoveo-container">
      <div className="sound-waves"></div>

      <div className="musical-notes">
        <div className="note">♪</div>
        <div className="note">♫</div>
        <div className="note">♪</div>
        <div className="note">♬</div>
        <div className="note">♪</div>
        <div className="note">♫</div>
      </div>

      <div className="content-wrapper">
        <div className="diamond-pattern">
          <div className="diamond red left"></div>
          <div className="diamond navy center"></div>
          <div className="diamond red right"></div>
        </div>

        <h1 className="page-title">Search any song...</h1>

        <form onSubmit={handleSubmit} className="jamoveo-form">
          <input
            type="text"
            placeholder="Enter song title..."
            value={searchQuery}
            onChange={handleInputChange}
            className="form-input"
            autoFocus
          />
          <button type="submit" className="form-button">
            Search Songs
          </button>
        </form>
      </div>

      <div className="visualizer">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default MainPageAdmin;
