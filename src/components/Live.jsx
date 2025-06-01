import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_BASE_SERVER_URL);
import { useUser } from "../context/UserContext"; // <-- Import useUser
import "../styles/LivePage.css";
import "../styles/JaMoveo.css";

const LivePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const song = location.state?.song;
  const { user } = useUser(); // <-- Get user context
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [userRole, setUserRole] = useState(user?.role || "player"); // Default to context role
  const [userInstrument, setUserInstrument] = useState(user?.instrument); // Default to context role
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  console.log("instrument:", userInstrument);
  console.log("role:", userRole);

  useEffect(() => {
    const handleQuitSession = () => {
      if (user?.role === "admin") {
        navigate("/MainPageAdmin");
      } else {
        navigate("/MainPagePlayer");
      }
    };

    socket.on("quitSession", handleQuitSession);

    return () => {
      socket.off("quitSession", handleQuitSession);
    };
  }, [navigate]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling) {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({
            top: 2,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling]);

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  const handleQuit = () => {
    // Admin notifies all users to quit session
    socket.emit("quitSession");
    // Admin navigates to MainPageAdmin
    navigate("/MainPageAdmin");
  };

  // If song is not loaded yet, or there's an issue with state
  if (!song) {
    return (
      <div className="jamoveo-container live-container">
        <p>Loading song data or no song selected...</p>
        {/* You might want a button to go back here */}
      </div>
    );
  }

  return (
    <div className="jamoveo-container live-container">
      {/* Assuming .sound-waves, .musical-notes, .visualizer are in JaMoveo.css */}
      <div className="sound-waves"></div>
      <div className="musical-notes">
        <div className="note">♪</div>
        <div className="note">♫</div>
        <div className="note">♪</div>
        <div className="note">♬</div>
        <div className="note">♪</div>
        <div className="note">♫</div>
      </div>

      {/* Header with song info */}
      <div className="live-header">
        <div className="live-song-info">
          <h1 className="live-song-title">
            {song.songName || "Unknown Title"}
          </h1>
          <h2 className="live-song-artist">
            {song.artist || "Unknown Artist"}
          </h2>
        </div>

        <div className="live-controls">
          {userRole === "admin" && (
            <button className="cta-button quit-btn" onClick={handleQuit}>
              Quit Session
            </button>
          )}
        </div>
      </div>

      {/* Main lyrics content */}
      <div className="live-content" ref={scrollContainerRef}>
        <div className="lyrics-wrapper">
          {song.lyrics && song.lyrics.length > 0 ? (
            song.lyrics.map((lyric, index) => (
              <div key={index} className="lyric-line-container">
                {/* Only show chords if NOT singer */}
                {userInstrument !== "Singer" &&
                  song.chords &&
                  song.chords[index] && (
                    <div className="chord-text">{song.chords[index]}</div>
                  )}
                <div className="lyric-text">{lyric || " "}</div>
              </div>
            ))
          ) : (
            <div>No lyrics available.</div>
          )}
          {/* Extra space for scrolling */}
          <div className="scroll-spacer"></div>
        </div>
      </div>

      {/* Auto-scroll floating button */}
      <button
        className={`auto-scroll-btn ${isAutoScrolling ? "scrolling" : ""}`}
        onClick={toggleAutoScroll}
      >
        <span className="scroll-icon">{isAutoScrolling ? "⏸️" : "▶️"}</span>
        <span className="scroll-text">
          {isAutoScrolling ? "Stop" : "Auto Scroll"}
        </span>
      </button>

      {/* Visualizer from existing CSS */}
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

export default LivePage;
