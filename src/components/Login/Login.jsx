import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSlow, setIsSlow] = useState(false);

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
          const user = jwtDecode(token);
          const username = user.family_name;
          const email = user.email;

          axios
            .get("https://course-mate-server.onrender.com/user/users")
            .then((userRes) => {
              const users = userRes.data;
              const userExists = users.some((u) => u.email === email);

              if (!userExists) {
                axios
                  .post("https://course-mate-server.onrender.com/user/create", {
                    username,
                    email,
                  })
                  .then((createRes) => {
                    if (createRes.status === 201) {
                      localStorage.setItem("user", JSON.stringify(token));
                      navigate("/home");
                    } else {
                      toast.error("Error logging in. Please try again.");
                    }
                  })
                  .catch((error) => {
                    console.error("Error creating user:", error);
                    toast.error("Error logging in. Please try again.");
                  });
              } else {
                localStorage.setItem("user", JSON.stringify(token));
                navigate("/home");
              }
            })
            .catch((error) => {
              console.error("Error fetching users:", error);
              toast.error("Error logging in. Please try again.");
            });
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
    const timer = setTimeout(() => {
      setIsSlow(true);
    }, 5000);

    if (window.google) {
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
      setLoading(false);
      clearTimeout(timer);
    } else {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="lead text-white m-3 loading">Loading...</p>
          {isSlow ? (
            <p className="text-white m-3 loading">
              Server is Busy! Please wait...
            </p>
          ) : (
            <p></p>
          )}
        </div>
      );
    }

    return () => clearTimeout(timer);
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="lead text-white m-3 loading">Loading...</p>
        {isSlow ? (
          <p className="text-white m-3 loading">
            Server is Busy! Please wait...
          </p>
        ) : (
          <p></p>
        )}
      </div>
    );
  }

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-content row">
        <h1 className="display-3 fw-bold text-center cust-text">
          Welcome To CoursMate
        </h1>
        <div className="login-left justify-content-center col-12 col-sm-12 col-md-6">
          <img
            src="/coursemate.jpeg"
            height={"200px"}
            alt="Coursemate"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="login-right justify-content-center col-12 col-sm-12 col-md-6">
          <div id="signInDiv"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
