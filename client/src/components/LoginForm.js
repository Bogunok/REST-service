import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";

const LoginForm = ({ setLoggedInUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });

            const { token, role, username: loggedInUsername } = response.data;
            localStorage.setItem("authToken", token); // Save the token in local storage

            setLoggedInUser({ username: loggedInUsername, role });

            // Redirect admin to admin panel
            role === "admin" ? navigate("/admin") : navigate("/");
        } catch (err) {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;