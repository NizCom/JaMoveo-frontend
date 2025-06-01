import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api";
import { io } from "socket.io-client";

import "../styles/SongsGrid.css";

const socket = io(import.meta.env.VITE_BASE_SERVER_URL);

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [socketConnected, setSocketConnected] = useState(false); // state to track socket connection

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchTerm(query);
      fetchSongs(query);
    } else {
      setError("No search term provided");
      setLoading(false);
    }
  }, [searchParams]);

  const fetchSongs = async (query) => {
    try {
      setLoading(true);
      const response = await api.get(`/songs`, {
        params: { name: query },
      });
      console.log("data:", query);
      console.log("count songs:", response.data.count);
      console.log("Fetched songs:", response.data.songs);
      console.log("searchTerm :", response.data.searchTerm);

      setSongs(response.data.songs || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching songs:", err);
      setError(
        `Failed to fetch songs: ${err.response?.data?.error || err.message}`
      );
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSongClick = async (song) => {
    if (socket) {
      // Fetch the full song data from the server using the song name
      const response = await api.get("/song", {
        params: { name: song.songName },
      });
      const fetchedSong = response.data.song || song;
      console.log("Fetched song data:", fetchedSong);
      // Notify all users via socket
      socket.emit("startLivePage", { song: fetchedSong });
      console.log("Emitted 'startLivePage' from admin with song:", song);
      navigate("/live", { state: { song: fetchedSong } }); // Pass song data here
    } else {
      console.error("Admin socket not connected. Please wait for connection.");
      setError("Socket not connected. Please wait or refresh."); // Inform user
    }
  };

  const handleBackToSearch = () => {
    navigate("/MainPageAdmin");
  };

  if (loading) {
    return (
      <div className="jamoveo-container">
        <div className="content-wrapper">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Searching for songs...</p>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="results-header">
          <button onClick={handleBackToSearch} className="back-button">
            ← Back to Search
          </button>

          <h1 className="page-title">Search Results for "{searchTerm}"</h1>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {!error && (
          <div className="results-content">
            <p className="results-count">
              Found {songs.length} song{songs.length !== 1 ? "s" : ""}
            </p>

            {songs.length === 0 ? (
              <div className="no-results">
                <p>No songs found matching "{searchTerm}"</p>
              </div>
            ) : (
              <div className="songs-grid">
                {songs.map((song, index) => (
                  <div
                    key={index}
                    className="song-card"
                    onClick={() => handleSongClick(song)}
                  >
                    <div className="song-image-container">
                      {song.image ? (
                        <img
                          src={song.image}
                          alt={song.songName || "Unknown Title"}
                          className="song-image"
                        />
                      ) : (
                        <div className="song-image-placeholder">
                          <span>♪</span>
                        </div>
                      )}
                    </div>
                    <div className="song-info">
                      <h3 className="song-title">
                        {song.songName || "Unknown Title"}
                      </h3>
                      <p className="song-artist">
                        {song.artist || "Unknown Artist"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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

export default Results;
