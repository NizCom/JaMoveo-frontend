import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/JaMoveo.css";
import { io } from "socket.io-client";
import api from "../api";

const socket = io(import.meta.env.VITE_BASE_SERVER_URL);

const MainPagePlayer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/current-song")
      .then((res) => {
        if (res.data.song) {
          navigate("/live", { state: { song: res.data.song } });
        }
      })
      .catch(() => {
        // No current song, do nothing
      });

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    // Listen for a signal from server to start live page
    socket.on("startLivePage", (data) => {
      console.log("Received startLivePage signal");
      navigate("/live", { state: { song: data.song } });
    });

    return () => {
      socket.off("connect");
      socket.off("startLivePage");
    };
  }, [navigate]);

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

        <h1 className="page-title">Waiting for next song...</h1>
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

export default MainPagePlayer;
