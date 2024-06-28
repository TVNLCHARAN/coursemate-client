import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Units.css";
import Sidebar from "../navbar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

function Units() {
  const location = useLocation();
  const navigate = useNavigate();
  const { folderId, imgSrc } = location.state;
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]);
  const [delayedFolders, setDelayedFolders] = useState([]);
  const [parentFolder, setParentFolder] = useState("Subject");

  useEffect(() => {
    let timer;
    const token = JSON.parse(localStorage.getItem("user"));
    setUser("charan"); // Dummy user for example
    axios
      .get("https://course-mate-server.onrender.com/folder/folders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const rootFolders = response.data.filter(
          (folder) => folder.parentFolder === folderId
        );
        const sortedFolders = rootFolders.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setFolders(sortedFolders);
        let parent = response.data.find((folder) => folder._id === folderId);
        setParentFolder(parent.name);
        rootFolders.forEach((folder, index) => {
          timer = setTimeout(() => {
            setDelayedFolders((prevFolders) => [...prevFolders, folder]);
          }, index * 175);
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the folders!", error);
      });
    return () => {
      clearTimeout(timer);
    };
  }, [folderId]);

  const handleFolderClick = (folderId) => {
    navigate("/content", { state: { folderId, imgSrc } });
  };

  return (
    <div>
      {true ? (
        <>
          <div className="blur1"></div>
          <div style={{ marginTop: "50px" }}>
            <div className="units-img"></div>
            <div>
              <div>
                <Sidebar />
                <div className="outer-container-units">
                  <h1
                    className="display-3 text-center text-white blinking-text-units"
                    style={{ zIndex: 100 }}
                  >
                    {parentFolder}
                  </h1>
                  <div className="content-units text-center w-50 container-fluid d-flex flex-column align-items-center justify-content-center">
                    {delayedFolders.map((folder) => (
                      <div
                        key={folder._id}
                        className="units-div d-flex rounded-3 fw-bold text-white lead p-4 justify-content-evenly"
                        onClick={() => handleFolderClick(folder._id)}
                      >
                        <div className="w-25 text-end align-items-end">
                          <img
                            className="text-start"
                            src="/bing/folder1.png"
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

export default Units;
