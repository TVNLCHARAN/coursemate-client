import React, { useState, useEffect } from "react";
import "./Notification.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../navbar/Sidebar";

const Notification = () => {
  const [Notifications, setNotifications] = useState([
    {
      uploadedBy: "Loading...",
      name: "",
      _id: "",
      description: "",
      rscLink: "",
    },
  ]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://course-mate-server.onrender.com/resource/resources"
      );

      if (response.status === 200) {
        const data = response.data.filter((notification) => {
          if (notification.byAdmin) {
            return true;
          } else return false;
        });
        const sortedNotifications = data.sort((a, b) =>
          b.uploadedAt.localeCompare(a.uploadedAt)
        );

        setNotifications(sortedNotifications);
      }
    } catch (error) {
      console.error("Error fetching Notifications:", error);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <div>
        <Sidebar />
        <h1
          className="display-3 text-center text-white blinking-text-notify"
          style={{ zIndex: 100, marginTop: "60px" }}
        >
          Notifications
        </h1>
        <div className="notifications-img"></div>
        <div className="blur-notify"></div>
        {Notifications.map((Notification) => (
          <div key={Notification._id} className="Notification-div">
            <div className="Notification-content">
              <p className="Notification-user">
                Uploaded by: {Notification.uploadedBy}
              </p>
              <p>Name: {Notification.name}</p>
              <p>{Notification.description}</p>
              <p>
                Link:{" "}
                <a
                  href={Notification.rscLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "red" }}
                >
                  {Notification.rscLink}
                </a>
              </p>
            </div>
            <br />
            <div className="Notification-date">
              <p style={{ fontSize: "1.2em" }}>
                Posted at: {formatTimestamp(Notification.uploadedAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return formattedDate.replace(",", "");
};

export default Notification;
