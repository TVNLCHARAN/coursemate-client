import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Sem.css";
import Sidebar from "../navbar/Sidebar";
import { useNavigate } from "react-router-dom";

function Sem() {
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
        const rootFolders = response.data.filter((folder) => folder.isSem);
        setFolders(rootFolders.sort());

        rootFolders.forEach((folder, index) => {
          timer = setTimeout(() => {
            setDelayedFolders((prevFolders) => [...prevFolders, folder]);
          }, index * 375);
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
    console.error(folderId);
    navigate("/subjects", { state: { folderId, imgSrc } });
  };

  return (
    <div>
      {true ? (
        <>
          <div className="blur1"></div>
          <div style={{ marginTop: "50px" }}>
            <div className="img-container-sem"></div>
            <div>
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
        </>
      ) : (
        <p>You Have No Access...</p>
      )}
    </div>
  );
}

export default Sem;
