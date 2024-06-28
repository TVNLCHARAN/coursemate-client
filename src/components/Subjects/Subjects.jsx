import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Subjects.css";
import Sidebar from "../navbar/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";

function Subjects() {
  const location = useLocation();
  const { folderId } = location.state;
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]);
  const [delayedFolders, setDelayedFolders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    const token = JSON.parse(localStorage.getItem("user"));
    // setUser(token);
    setUser("charan");
    axios
      .get("https://course-mate-server.onrender.com/folder/folders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const rootFolders = response.data.filter(
          (folder) => folder.parentFolder == folderId
        );
        setFolders(rootFolders);

        rootFolders.forEach((folder, index) => {
          timer = setTimeout(() => {
            setDelayedFolders((prevFolders) => [...prevFolders, folder]);
          }, index * 75);
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the folders!", error);
      });
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClick = (folderId, imgSrc) => {
    navigate("/units", { state: { folderId, imgSrc } });
  };

  return (
    <div>
      {true ? (
        <>
          <div className="blur1"></div>
          <div style={{ marginTop: "50px" }}>
            <div className="img-container1"></div>
            <div>
              <div>
                <Sidebar />
                <div className="outer-container">
                  <h1 className="display-1 text-center text-white blinking-text-subjects">
                    Subjects
                  </h1>
                  <div className="content text-center w-50 container-fluid d-flex flex-column align-items-center justify-content-center">
                    {delayedFolders.map((folder) => (
                      <div
                        key={folder._id}
                        className="folder-div d-flex rounded-3 fw-bold text-white lead p-4 justify-content-evenly"
                        onClick={() =>
                          handleClick(folder._id, "/icons8-folder-96.png")
                        }
                      >
                        <div className="w-25 text-end align-items-end">
                          <img
                            className="text-start"
                            src="/icons8-folder-96.png"
                            alt=""
                            height={"40px"}
                          />
                        </div>
                        <div className="w-75 text-start px-3 px-5 align-items-start">
                          {folder.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>You Have No Access...</p>
      )}
    </div>
  );
}

export default Subjects;
