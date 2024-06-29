import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Content.css";
import Sidebar from "../navbar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

function Content() {
  const location = useLocation();
  let { folderId } = location.state;
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [docs, setDocs] = useState([]);
  const [delayedDocs, setDelayedDocs] = useState([]);
  const [parentFolder, setParentFolder] = useState("Subject");
  const [billFile, setBillFile] = useState(null);
  const [isFileSet, setIsFileSet] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("user") || null;

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || false;
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/");
    }
    if (location.state) {
      folderId = location.state.folderId;
    }
    const email = jwtDecode(token).email;
    axios
      .post(
        "https://course-mate-server.onrender.com/user/getUserId",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUserId(response.data.userId);
      })
      .catch((error) => {
        console.error("Cannot get user ID", error);
      });
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.post(
        "https://course-mate-server.onrender.com/document/folder",
        { folderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const rootDocs = response.data;
      setDocs(rootDocs);
      setLoading(false);
      setDelayedDocs([]);
      rootDocs.forEach((doc, index) => {
        setTimeout(() => {
          setDelayedDocs((prevDocs) => [...prevDocs, doc]);
        }, index * 175);
      });

      const folderResponse = await axios.post(
        "https://course-mate-server.onrender.com/folder",
        { folderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setParentFolder(folderResponse.data.name);
    } catch (error) {
      console.error("Error fetching documents or folder", error);
    }
  };

  useEffect(() => {
    if (!folderId) {
      navigate("/");
    }
    fetchDocuments();
  }, [isUploaded]);

  const handleFileChange = (e) => {
    setIsFileSet(false);
    setBillFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!billFile) {
      setErrorMessage("Please select a file");
      setIsLoading(false);
      return;
    }

    const existingFile = docs.find(
      (doc) => doc.name.toLowerCase() === billFile.name.toLowerCase()
    );
    if (existingFile) {
      toast.error(
        "File with the same name exists. Please upload a different file."
      );
      setIsFileSet(true);
      setIsLoading(false);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(billFile.type)) {
      setErrorMessage(
        "Invalid file type. Only PDF, PPT, PPTX, DOC, and DOCX files are allowed."
      );
      setIsLoading(false);
      return;
    }

    if (billFile.size > 30 * 1024 * 1024) {
      setErrorMessage("File is too large. Maximum size allowed is 30MB.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", billFile);

    try {
      const response = await axios.post(
        "https://course-mate-server.onrender.com/document/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { name, fileId, viewLink, downloadLink } = response.data;
      const params = {
        name,
        fileId,
        viewLink,
        downloadLink,
        parentFolder: folderId || location.state.folderId,
        uploadedBy: userId,
      };

      axios
        .post(
          "https://course-mate-server.onrender.com/document/saveDocument",
          params,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setIsUploaded((prev) => !prev);
          setIsFileSet(true);
          setBillFile(null);
          setErrorMessage("");
          toast.success("File saved successfully!");
        })
        .catch((error) => {
          console.error("Cannot save the document", error);
          toast.error("Cannot save the document!");
        });
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response?.data?.error || error.message
      );
      toast.error("Can't upload file");
      setErrorMessage("Failed to upload file. Please try again later.");
    } finally {
      setIsLoading(false);
      setIsFileSet(true);
    }
  };

  const getImageSrc = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    if (extension === "pdf") {
      return "/favicons/pdf.png";
    } else if (["ppt", "pptx"].includes(extension)) {
      return "/favicons/ppt.png";
    } else if (["doc", "docx"].includes(extension)) {
      return "/favicons/doc.png";
    } else {
      return "/favicons/default.png";
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="lead text-white m-3 loading">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <div>
          <ToastContainer />
          <div className="blur1"></div>
          <div style={{ marginTop: "50px" }}>
            <div className="content-img"></div>
            <div>
              <Sidebar />
              <div className="outer-container-content">
                <h1
                  className="display-3 text-center text-white blinking-text"
                  style={{ zIndex: 100 }}
                >
                  {parentFolder}
                </h1>
                <div className="content-content text-center w-50 container-fluid d-flex flex-column align-items-center justify-content-center">
                  {delayedDocs.map((doc) => (
                    <div
                      key={doc._id}
                      className="content-div d-flex fw-bold text-white lead py-4 justify-content-between"
                    >
                      <div className="img-div text-start ms-4 align-items-end">
                        <img
                          className="text-start"
                          src={getImageSrc(doc.name)}
                          alt=""
                          height={"35px"}
                        />
                      </div>
                      <div
                        className="text-div text-start align-items-start"
                        onClick={() => {
                          window.location.href = `${doc.viewLink}`;
                        }}
                      >
                        {doc.name.toUpperCase()}
                      </div>

                      <div
                        className="download-div text-end me-3 align-items-start"
                        onClick={() => {
                          window.location.href = `${doc.downloadLink}`;
                        }}
                      >
                        <img
                          className=""
                          src="/favicons/download2.png"
                          alt=""
                          height={"40px"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="file-input-wrapper">
                {isFileSet ? (
                  <>
                    <input
                      type="file"
                      className="file-input"
                      id="file-input"
                      accept=".pdf, .ppt, .pptx, .doc, .docx"
                      onChange={handleFileChange}
                    />
                    <button className="custom-button" htmlFor="file-input">
                      +
                    </button>
                  </>
                ) : (
                  <button
                    className={`custom-button-submit ${
                      isLoading ? "loading" : ""
                    }`}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <div className="spinner"></div> : "Upload"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p className="display-1 text-white"></p>
      )}
    </>
  );
}

export default Content;
