import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from "./components/HomeView";
import LoginForm from "./components/LoginForm";
import AdminPanel from "./components/AdminPanel";
import Navbar from "./components/Navbar";
import { checkAdmin } from "./utils/api";

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null); // Track logged-in user

    useEffect(() => {
        const checkExistingSession = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const response = await checkAdmin(); // This function handles sending the token in the header
                    if (response && response.isAdmin) {
                        setLoggedInUser({ role: "admin" });
                    } else if (response && response.isAdmin === false) {
                        setLoggedInUser({ role: "user" }); // Or handle non-admin users differently
                    } else {
                        setLoggedInUser(null); // If the response is unexpected or indicates no valid session
                        localStorage.removeItem("authToken"); // Clear potentially invalid token
                    }
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    setLoggedInUser(null);
                    localStorage.removeItem("authToken"); // Clear potentially invalid token on error
                }
            } else {
                setLoggedInUser(null); // No token found
            }
        };

        checkExistingSession();
    }, []); // Empty dependency array means this runs once after the initial render

    return (
        <Router>
            <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
            <Routes>
                <Route path="/" element={<HomeView loggedInUser={loggedInUser} />} />
                <Route path="/login" element={<LoginForm setLoggedInUser={setLoggedInUser} />} />
                <Route
                    path="/admin"
                    element={
                        loggedInUser?.role === "admin" ? (
                            <AdminPanel setLoggedInUser={setLoggedInUser} />
                        ) : (
                            <HomeView loggedInUser={loggedInUser} />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;