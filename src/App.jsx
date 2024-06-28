import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Subjects from "./components/Subjects/Subjects";
import "./App.css";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Domains from "./components/Domains/Domains";
import Units from "./components/Units/Units";
import Content from "./components/Content/Content";
import Sem from "./components/Sem/Sem";
import Team from "./components/Team/Team";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    axios
      .get("https://course-mate-server.onrender.com/folder/folders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFolders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the folders!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="lead text-white m-3 loading">Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/subjects" element={<Subjects folders={folders} />} />
        <Route path="/domains" element={<Domains folders={folders} />} />
        <Route path="/units" element={<Units folders={folders} />} />
        <Route path="/content" element={<Content />} />
        <Route path="/sem" element={<Sem folders={folders} />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </div>
  );
}

export default App;
