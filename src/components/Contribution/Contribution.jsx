import React, { useState, useEffect } from "react";
import "./Contribution.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../navbar/Sidebar";

const Contribution = () => {
  const [contributions, setContributions] = useState([]);

  const fetchContributions = async () => {
    try {
      const response = await axios.get(
        "https://course-mate-server.onrender.com/user/users"
      );

      if (response.status === 200) {
        const sortedContributions = response.data
          .sort((a, b) => b.totalUploaded - a.totalUploaded)
          .slice(0, 10);
        setContributions(sortedContributions);
      } else {
        toast.error("Failed to fetch contributions. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching contributions:", error);
      toast.error("Failed to fetch contributions. Please try again later.");
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  const getMedalImage = (index) => {
    switch (index) {
      case 0:
        return "favicons/1st.png";
      case 1:
        return "favicons/2nd.png";
      case 2:
        return "favicons/3rd-place.png";
      default:
        return "favicons/medal.png";
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <Sidebar />
        <h1
          className="display-4 text-center text-light blinking-text-leaderboard"
          style={{ fontSize: "60px", marginTop: "50px", zIndex: 1000 }}
        >
          LeaderBoard
        </h1>
        <div className="img-container-leaderboard"></div>
        <div className="blur-notify"></div>
        <div className="blur-notify"></div>
        <div className="blur-notify"></div>
        {contributions.map((contribution, index) => (
          <div key={contribution._id} className="contribution-div">
            <div className="d-inline">
              <img
                className="ms-2"
                src={getMedalImage(index)}
                alt=""
                height="40px"
                width="40px"
              />
            </div>
            <div className="d-inline ms-2 text-end name-div">
              <p className="fw-bold col-8 d-inline text-start">
                {contribution.username}
              </p>
              <p className="col-4 d-inline text-end ms-auto">
                {contribution.totalUploaded}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Contribution;
