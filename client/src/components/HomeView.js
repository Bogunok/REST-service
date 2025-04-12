import React, { useEffect, useState } from "react";
import { getAllStars, getAllPlanets } from "../utils/api";

const HomeView = ({ loggedInUser }) => {
    const [stars, setStars] = useState([]);
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        // Fetch stars and planets data on component load
        const fetchData = async () => {
            const starResponse = await getAllStars();
            const planetResponse = await getAllPlanets();
            setStars(starResponse.data);
            setPlanets(planetResponse.data);
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Welcome to Space Explorer 🌌</h1>
            {loggedInUser ? (
                <p>
                    {loggedInUser.role === "admin"
                        ? "You are logged in as an Admin. You can manage planets and stars."
                        : "You are logged in as a Regular User."}
                </p>
            ) : (
                <p>You are viewing as a Guest. Please log in for admin privileges.</p>
            )}

            <h2>Stars</h2>
            {stars.map((star) => (
                <div key={star._id} className="card">
                    <div className="card-body">
                        <h5>{star.name}</h5>
                        <p>Type: {star.type}</p>
                    </div>
                </div>
            ))}

            <h2>Planets</h2>
            {planets.map((planet) => (
                <div key={planet._id} className="card">
                    <div className="card-body">
                        <h5>{planet.name}</h5>
                        <p>Type: {planet.type}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeView;