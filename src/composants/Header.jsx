import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import logo from "/assets/argentBankLogo.png";
import "../style/css/Header.css";

const Header = () => {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(logout());   
    navigate("/");    
  };
    
    return (
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div >
        {user ? (
          <div className="main-nav-itemLogout">
            <span className="main-nav-itemLogout__user">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </span>
          <button className="main-nav-itemLogout__logout" onClick={handleLogout}>
          <i className="fa fa-sign-out" aria-hidden="true"></i>
             Logout
          </button>
          </div>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
      </nav>
    );
  }

  export default Header;