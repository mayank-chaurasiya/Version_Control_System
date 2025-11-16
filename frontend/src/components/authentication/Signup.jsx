import "./auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext.jsx";

import logo from "../../assets/github-mark-white.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3030/signup/", {
        email: email,
        password: password,
        username: username,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (error) {
      console.error("Error : ", error.message);
      alert("Signup Failed!!");
      setLoading(false);
    }
  };

  return (
    <div className="main-container mt-5">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-login" />
      </div>

      <div className="content-box">
        <div className="box-heading">
          <h3 className="fs-5 mt-3 p-2">Sign Up to GitHub</h3>
        </div>
        <div className="login-box">
          <div>
            <label for="username" className="label">
              Username
            </label>
            <input
              type="text"
              autoComplete="off"
              className="input"
              id="username"
              placeholder="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label for="email" className="label">
              Email address
            </label>
            <input
              type="email"
              autoComplete="off"
              className="input"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label for="password" className="label">
              Password
            </label>
            <input
              type="password"
              autoComplete="off"
              className="input"
              id="password"
              placeholder="your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div class="d-grid gap-2 col-6 mx-auto">
            <button
              class="btn btn-success submit-btn"
              type="button"
              disabled={loading}
              onClick={handleSignup}
            >
              {loading ? "Loading..." : "Signup"}
            </button>
          </div>
        </div>
        <div>
          <p>
            Already have an account?{" "}
            <Link
              to="/auth"
              className="link-offset-2 link-underline link-underline-opacity-0"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
