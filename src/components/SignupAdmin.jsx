import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/JaMoveo.css";
import api from "../api";
import { useUser } from "../context/UserContext";

// options for instrument selection
const instruments = [
  "Singer",
  "Guitar",
  "Piano",
  "Drums",
  "Bass Guitar",
  "Violin",
  "Cello",
  "Flute",
  "Clarinet",
  "Saxophone",
  "Trumpet",
  "Trombone",
  "Ukulele",
  "Harmonica",
  "Keyboard",
];

function SignupAdmin() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instrument: "",
    role: "admin", // Default role for admin signup
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/signup", formData);
      toast.success(response.data.message);

      // Set user context after successful signup
      setUser({
        type: "player",
        role: formData.role,
        username: formData.username,
        instrument: formData.instrument,
      });

      setFormData({ username: "", password: "", instrument: "" });
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      console.error("Signup failed:", message);
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

        <h1 className="page-title">Join as Admin</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="jamoveo-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
          <select
            name="instrument"
            value={formData.instrument}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="" disabled>
              -- Select an instrument --
            </option>
            {instruments.map((instrument, index) => (
              <option key={index} value={instrument}>
                {instrument}
              </option>
            ))}
          </select>
          <button type="submit" className="form-button">
            Sign Up as Admin
          </button>
        </form>

        <div className="cta-buttons">
          <button className="cta-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button className="cta-button" onClick={() => navigate("/login")}>
            Already have account?
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default SignupAdmin;
