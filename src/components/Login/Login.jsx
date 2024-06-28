import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const email = jwtDecode(response.credential).email;
    const emails = [
      "n200232@rguktn.ac.in",
      "n200086@rguktn.ac.in",
      "sivahere9484@gmail.com",
      "vnlcharan.t@gmail.com",
    ];
    if (emails.includes(email)) {
      localStorage.setItem("user", JSON.stringify(response.credential));
      navigate("/home");
    }
  }

  useEffect(() => {
    /* global google */
    // google.accounts.id.initialize({
    //   client_id: '886564988858-7ndnqcjaht1j2oddkcmdj8drlfkprmkf.apps.googleusercontent.com',
    //   callback: handleCallbackResponse
    // });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    // google.accounts.id.prompt();
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-content row">
        <h1 className="display-3 fw-bold text-center cust-text">
          Welcome To CoursMate
        </h1>
        <div className="login-left justify-content-center col-12 col-sm-12 col-md-6">
          <img src="/coursemate.jpeg" height={"200px"} alt="Coursemate" />
        </div>
        <div className="login-right justify-content-center  col-12 col-sm-12 col-md-6">
          <div id="signInDiv" onClick={() => navigate("/home")}>
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
