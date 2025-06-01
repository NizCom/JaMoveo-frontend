import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import JaMoveoHomePage from "./components/HomePage";
import SignupPlayer from "./components/SignupPlayer";
import SignupAdmin from "./components/SignupAdmin";
import Login from "./components/Login";
import MainPagePlayer from "./components/MainPagePlayer";
import MainPageAdmin from "./components/MainPageAdmin";
import Results from "./components/Results";
import Live from "./components/Live";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<JaMoveoHomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignupPlayer" element={<SignupPlayer />} />
          <Route path="/SignupAdmin" element={<SignupAdmin />} />
          <Route path="/MainPagePlayer" element={<MainPagePlayer />} />
          <Route path="/MainPageAdmin" element={<MainPageAdmin />} />
          <Route path="/results" element={<Results />} />
          <Route path="/Live" element={<Live />} />
        </Routes>

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
    </Router>
  );
}

export default App;
