import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext.jsx";


import logo from "../../assets/github-mark-white.svg";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username" });
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3030/userProfile/${userId}`
          );
          setUserDetails(response.data.user);
        } catch (error) {
          console.error("Error Getting user Details : ", error.message);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center gap-5 p-4 overview fs-4">
        <span>
          <i class="fa-solid fa-book-open"></i>&nbsp;Overview
        </span>
        <span>
          <i class="fa-solid fa-star"></i>&nbsp;Starred Repository
        </span>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="card col-4 p-4 bg-dark">
            <div className="card-body">
              <div className="image">
                <img src={logo} alt="" />
              </div>
              <h5 className="card-title text-white mt-3">
                {userDetails.username}
              </h5>

              <a href="#" className="card-link">
                followers
              </a>
              <a href="#" className="card-link">
                following
              </a>
              <br />
              <button
                className="btn btn-outline-danger mt-4 text-white"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  setCurrentUser(null);
                  window.location.href = "/auth";
                }}
              >
                Log Out
              </button>
            </div>
          </div>
          <div className="heat-map-section col p-5">
            <HeatMapProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
