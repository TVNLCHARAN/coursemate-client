import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    const token = response.credential;

    axios
      .get("https://course-mate-server.onrender.com/user/login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(jwtDecode(token));
          localStorage.setItem("user", JSON.stringify(token));
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast.error("Please login with your college Mail ID");
        } else {
          console.error("Login error:", error);
          toast.error("An error occurred during login. Please try again.");
        }
      });
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "886564988858-7ndnqcjaht1j2oddkcmdj8drlfkprmkf.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, [navigate]);

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-content row">
        <h1 className="display-3 fw-bold text-center cust-text">
          Welcome To CoursMate
        </h1>
        <div className="login-left justify-content-center col-12 col-sm-12 col-md-6">
          <img src="/coursemate.jpeg" height={"200px"} alt="Coursemate" />
        </div>
        <div className="login-right justify-content-center col-12 col-sm-12 col-md-6">
          <div id="signInDiv"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
