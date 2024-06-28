import React, { useEffect, useState } from "react";
import "./Sem.css";
import Sidebar from "../navbar/Sidebar";
import { useNavigate } from "react-router-dom";

function Sem({ folders }) {
  const [delayedFolders, setDelayedFolders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    const rootFolders = folders
      .filter((folder) => folder.isSem)
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    // rootFolders = rootFolders
    rootFolders.forEach((folder, index) => {
      timer = setTimeout(() => {
        setDelayedFolders((prevFolders) => [...prevFolders, folder]);
      }, index * 375);
    });

    return () => {
      clearTimeout(timer);
    };
  }, [folders]);

  const handleClick = (folderId, imgSrc) => {
    console.error(folderId);
    navigate("/subjects", { state: { folderId, imgSrc, folders } });
  };

  return (
    <div>
      <div className="blur1"></div>
      <div style={{ marginTop: "50px" }}>
        <div className="img-container-sem"></div>
        <div>
          <Sidebar />
          <div className="outer-container-sem">
            <h1
              className="display-1 text-center text-light blinking-text-sem"
              style={{ fontSize: "58px" }}
            >
              Semester
            </h1>
            <div className="content-sem text-center w-50 container-fluid d-flex flex-column align-items-center justify-content-center">
              {delayedFolders.map((folder) => (
                <div
                  key={folder._id}
                  className="folder-div-sem d-flex rounded-3 fw-bold text-white lead p-4 justify-content-evenly"
                  onClick={() =>
                    handleClick(folder._id, "/icons8-folder-96.png")
                  }
                >
                  <div className="w-25 text-end align-items-end">
                    <img
                      className="text-start"
                      src="/bing/folder4.png"
                      alt=""
                      height={"35px"}
                      style={{ opacity: 0.6 }}
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

export default Sem;
