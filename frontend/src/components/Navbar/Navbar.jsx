import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container-fluid">
        <Link
          to="/"
          className="link-offset-2 link-underline link-underline-opacity-0 link-color"
        >
          <div className="logo p-2">
            <img
              src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
              alt="Logo-github"
              className="nav-img"
            />
            <h2 className="p-1 mt-1">GitHub</h2>
          </div>
        </Link>
        <ul class="nav justify-content-end mx-5">
          <li class="nav-item">
            <Link to="/create" className="nav-link link-color">
              <button className="btn btn-outline-light">
                Create New Repository
              </button>
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/profile" className="nav-link link-color">
              <p>Profile</p>
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/auth" className="nav-link link-color">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
