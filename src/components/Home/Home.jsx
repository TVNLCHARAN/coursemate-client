import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";
import SideBar from "../navbar/Sidebar";
import "./Home.css";

function Home() {
  const [user, setUser] = useState(null);
  const [isClickedSem, setIsClickedSem] = useState(false);
  const [isClickedDomains, setIsClickedDomains] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || true;
    if (storedUser) {
      // setUser(jwtDecode(JSON.parse(storedUser)));
      setUser("charan");
    } else {
      navigate("/");
    }
  }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem("user");
    navigate("/");
  }
  function handleOpenSem() {
    setIsClickedSem(true);
    setTimeout(() => {
      navigate("/sem");
    }, 450);
  }
  function handleOpenDomains() {
    setIsClickedDomains(true);
    setTimeout(() => {
      navigate("/domains");
    }, 450);
  }

  return (
    <div>
      {true ? (
        <div className="img-container">
          <div className="blur">
            <SideBar />
            <div className="outer-container">
              <div className="content container-fluid d-flex flex-column align-items-center justify-content-center">
                {/* <NavLink to="/sem" className="no-underline"> */}
                <div
                  className={`categories ${
                    isClickedSem ? "expand-open" : ""
                  } text-decoration-none rounded-3 fw-bold text-white lead p-4`}
                  onClick={handleOpenSem}
                >
                  SEMESTERS
                </div>
                {/* </NavLink> */}
                {/* <NavLink to="/domains" className="no-underline"> */}
                <div
                  className={`categories ${
                    isClickedDomains ? "expand-open" : ""
                  } text-decoration-none rounded-3 fw-bold text-white lead p-4`}
                  onClick={handleOpenDomains}
                >
                  DOMAINS
                </div>
                {/* </NavLink> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>You Have No Access...</p>
      )}
    </div>
  );
}

export default Home;
