import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/api";

const Navbar = ({ loggedInUser, setLoggedInUser }) => {
    const navigate = useNavigate();

    // Handle Logout
    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("authToken"); // Remove token
            setLoggedInUser(null); // Clear user state
            navigate("/"); // Redirect to home
        } catch (err) {
            alert("Error during logout. Please try again.");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h1 className="navbar-brand">Space Explorer</h1>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    {loggedInUser ? (
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link className="btn btn-primary" to="/login">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;