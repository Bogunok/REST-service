import React, { useEffect, useState } from "react";
import { getAllStars, getAllPlanets } from "../utils/api";

const HomeView = ({ loggedInUser }) => {
    const [stars, setStars] = useState([]);
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        // Fetch stars and planets data on component load
        const fetchData = async () => {
            try {
                const starResponse = await getAllStars();
                const planetResponse = await getAllPlanets();
                setStars(starResponse.data);
                setPlanets(planetResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Welcome to Space Explorer <span role="img" aria-label="space">🌌</span></h1>
            {loggedInUser ? (
                <p className="lead">
                    {loggedInUser.role === "admin"
                        ? "You are logged in as an Admin. You can manage planets and stars."
                        : "You are logged in as a Regular User."}
                </p>
            ) : (
                <p className="lead">You are viewing as a Guest. Please log in for admin privileges.</p>
            )}

            <h2 className="mt-4">Stars</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {stars.map((star) => (
                    <div key={star._id} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{star.name}</h5>
                                <p className="card-text">Type: {star.type}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="mt-4">Planets</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {planets.map((planet) => (
                    <div key={planet._id} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{planet.name}</h5>
                                <p className="card-text">Type: {planet.type}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeView;