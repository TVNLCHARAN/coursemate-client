import React, { useEffect, useState } from "react";
import "./Units.css";
import Sidebar from "../navbar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

function Units({ folders }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { folderId, imgSrc } = location.state;
  const [delayedFolders, setDelayedFolders] = useState([]);
  const [parentFolder, setParentFolder] = useState("Subject");

  useEffect(() => {
    let timer;
    const rootFolders = folders.filter(
      (folder) => folder.parentFolder === folderId
    );

    const sortedFolders = rootFolders.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    setParentFolder(folders.find((folder) => folder._id === folderId).name);

    sortedFolders.forEach((folder, index) => {
      timer = setTimeout(() => {
        setDelayedFolders((prevFolders) => [...prevFolders, folder]);
      }, index * 175);
    });

    return () => {
      clearTimeout(timer);
    };
  }, [folders, folderId]);

  const handleFolderClick = (folderId) => {
    navigate("/content", { state: { folderId, imgSrc } });
  };

  return (
    <div>
      <div className="blur1"></div>
      <div style={{ marginTop: "50px" }}>
        <div className="units-img"></div>
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
  );
}

export default Units;
