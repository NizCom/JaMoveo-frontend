import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/JaMoveo.css";

const JaMoveoHomePage = () => {
  const navigate = useNavigate();

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

      <div className="content-wrapper home">
        <div className="diamond-pattern">
          <div className="diamond red left"></div>
          <div className="diamond navy center"></div>
          <div className="diamond red right"></div>
        </div>

        <h1 className="welcome-title">Welcome to</h1>
        <div className="app-name">JaMoveo</div>

        <p className="description">
          Experience the ultimate music collaboration platform where musicians
          connect, create, and jam together. Join our community of artists and
          bring your musical vision to life with cutting-edge tools and seamless
          collaboration features.
        </p>

        <div className="cta-buttons">
          <button
            className="cta-button"
            onClick={() => navigate("/SignupPlayer")}
          >
            Join as Musician
          </button>
          <button
            className="cta-button"
            onClick={() => navigate("/SignupAdmin")}
          >
            Join as Admin
          </button>
          <button className="cta-button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
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

export default JaMoveoHomePage;
