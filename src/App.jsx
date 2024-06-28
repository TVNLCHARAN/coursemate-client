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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/domains" element={<Domains />} />
        <Route path="/units" element={<Units />} />
        <Route path="/content" element={<Content />} />
        <Route path="/sem" element={<Sem />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </div>
  );
}

export default App;
