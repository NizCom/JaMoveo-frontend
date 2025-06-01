import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/JaMoveo.css";
import api from "../api";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get setUser from context

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", credentials);
      const userData = response.data.user;

      // Set user context after successful login
      setUser({
        username: userData.username,
        type: userData.type,
        role: userData.role,
        instrument: userData.instrument,
      });

      setCredentials({ username: "", password: "" });
      setError("");

      if (userData.role === "admin") {
        navigate("/MainPageAdmin");
      } else {
        navigate("/MainPagePlayer");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      console.error("Login failed:", message);
    }
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

        <h1 className="page-title">Login</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="jamoveo-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="form-input"
            required
          />
          <button type="submit" className="form-button">
            Login
          </button>
        </form>

        <div className="cta-buttons">
          <button className="cta-button" onClick={() => navigate("/")}>
            Back to Home
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
}

export default Login;
