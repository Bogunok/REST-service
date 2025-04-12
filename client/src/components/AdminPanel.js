import React, { useState, useEffect } from "react";
import { createPlanet, createStar, getAllPlanets, getAllStars, updatePlanet, updateStar, deletePlanet, deleteStar, logout } from "../utils/api";
import { useNavigate } from "react-router-dom";

const AdminPanel = ({ setLoggedInUser }) => {
    const navigate = useNavigate(); // For redirection
    const [planets, setPlanets] = useState([]); // List of planets
    const [stars, setStars] = useState([]); // List of stars

    const [planetFormData, setPlanetFormData] = useState({
        name: "",
        type: "",
        mass: "",
        radius: "",
        distanceFromSun: "",
    });

    const [starFormData, setStarFormData] = useState({
        name: "",
        type: "",
        mass: "",
        radius: "",
        distanceFromEarth: "",
    });

    // State to manage editing mode for planets and stars
    const [editingPlanetId, setEditingPlanetId] = useState(null);
    const [editingStarId, setEditingStarId] = useState(null);
    const [editedPlanetData, setEditedPlanetData] = useState({});
    const [editedStarData, setEditedStarData] = useState({});

    // Fetch existing stars and planets
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedPlanets = await getAllPlanets();
                const fetchedStars = await getAllStars();
                setPlanets(fetchedPlanets.data);
                setStars(fetchedStars.data);
            } catch (err) {
                console.error("Error fetching items:", err);
            }
        };

        fetchItems();
    }, []);

    // Handle changes for Planet form inputs
    const handlePlanetInputChange = (e) => {
        const { name, value } = e.target;
        const correctedValue = name === "mass" || name === "radius" || name === "distanceFromSun" ? parseFloat(value) || "" : value; // Handle number types
        setPlanetFormData((prevState) => ({ ...prevState, [name]: correctedValue }));
    };

    // Handle changes for Star form inputs
    const handleStarInputChange = (e) => {
        const { name, value } = e.target;
        const correctedValue = name === "mass" || name === "radius" || name === "distanceFromEarth" ? parseFloat(value) || "" : value; // Handle number types
        setStarFormData((prevState) => ({ ...prevState, [name]: correctedValue }));
    };

    // Handle changes for editing Planet inputs
    const handleEditPlanetInputChange = (e) => {
        const { name, value } = e.target;
        const correctedValue = name === "mass" || name === "radius" || name === "distanceFromSun" ? parseFloat(value) || "" : value;
        setEditedPlanetData((prevState) => ({
            ...prevState,
            [name]: correctedValue,
        }));
    };

    // Handle changes for editing Star inputs
    const handleEditStarInputChange = (e) => {
        const { name, value } = e.target;
        const correctedValue = name === "mass" || name === "radius" || name === "distanceFromEarth" ? parseFloat(value) || "" : value;
        setEditedStarData((prevState) => ({
            ...prevState,
            [name]: correctedValue,
        }));
    };

    // Submit new Planet
    const handlePlanetSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPlanet(planetFormData);
            alert("Planet added successfully!");
            const updatedPlanets = await getAllPlanets();
            setPlanets(updatedPlanets.data);
            setPlanetFormData({ name: "", type: "", mass: "", radius: "", distanceFromSun: "" });
        } catch (err) {
            alert("Error adding planet.");
        }
    };

    // Submit new Star
    const handleStarSubmit = async (e) => {
        e.preventDefault();
        try {
            await createStar(starFormData);
            alert("Star added successfully!");
            const updatedStars = await getAllStars();
            setStars(updatedStars.data);
            setStarFormData({ name: "", type: "", mass: "", radius: "", distanceFromEarth: "" });
        } catch (err) {
            alert("Error adding star.");
        }
    };

    // Enable Planet editing
    const enablePlanetEdit = (planet) => {
        setEditingPlanetId(planet._id);
        setEditedPlanetData({ ...planet }); // Populate edit form with current data
    };

    // Enable Star editing
    const enableStarEdit = (star) => {
        setEditingStarId(star._id);
        setEditedStarData({ ...star }); // Populate edit form with current data
    };

    // Save edited Planet
    const handleSavePlanet = async (id) => {
        try {
            await updatePlanet(id, editedPlanetData);
            alert("Planet updated successfully!");
            const updatedPlanets = await getAllPlanets();
            setPlanets(updatedPlanets.data);
            setEditingPlanetId(null); // Exit editing mode
            setEditedPlanetData({}); // Clear edited data
        } catch (err) {
            alert("Error updating planet.");
        }
    };

    // Save edited Star
    const handleSaveStar = async (id) => {
        try {
            await updateStar(id, editedStarData);
            alert("Star updated successfully!");
            const updatedStars = await getAllStars();
            setStars(updatedStars.data);
            setEditingStarId(null); // Exit editing mode
            setEditedStarData({}); // Clear edited data
        } catch (err) {
            alert("Error updating star.");
        }
    };

    // Delete Planet
    const handlePlanetDelete = async (id) => {
        try {
            await deletePlanet(id);
            alert("Planet deleted successfully!");
            const updatedPlanets = await getAllPlanets();
            setPlanets(updatedPlanets.data);
        } catch (err) {
            alert("Error deleting planet.");
        }
    };

    // Delete Star
    const handleStarDelete = async (id) => {
        try {
            await deleteStar(id);
            alert("Star deleted successfully!");
            const updatedStars = await getAllStars();
            setStars(updatedStars.data);
        } catch (err) {
            alert("Error deleting star.");
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <h2>Add Planet</h2>
            <form onSubmit={handlePlanetSubmit}>
                <input type="text" name="name" placeholder="Name" value={planetFormData.name} onChange={handlePlanetInputChange} required />
                <input type="text" name="type" placeholder="Type" value={planetFormData.type} onChange={handlePlanetInputChange} required />
                <input type="number" name="mass" placeholder="Mass" value={planetFormData.mass} onChange={handlePlanetInputChange} required />
                <input type="number" name="radius" placeholder="Radius" value={planetFormData.radius} onChange={handlePlanetInputChange} required />
                <input type="number" name="distanceFromSun" placeholder="Distance from Sun" value={planetFormData.distanceFromSun} onChange={handlePlanetInputChange} required />
                <button type="submit">Add Planet</button>
            </form>

            <h2>Add Star</h2>
            <form onSubmit={handleStarSubmit}>
                <input type="text" name="name" placeholder="Name" value={starFormData.name} onChange={handleStarInputChange} required />
                <input type="text" name="type" placeholder="Type" value={starFormData.type} onChange={handleStarInputChange} required />
                <input type="number" name="mass" placeholder="Mass" value={starFormData.mass} onChange={handleStarInputChange} required />
                <input type="number" name="radius" placeholder="Radius" value={starFormData.radius} onChange={handleStarInputChange} required />
                <input type="number" name="distanceFromEarth" placeholder="Distance from Earth" value={starFormData.distanceFromEarth} onChange={handleStarInputChange} required />
                <button type="submit">Add Star</button>
            </form>

            <h2>View/Edit/Delete Planets</h2>
            <div>
                {planets.map((planet) => (
                    <div key={planet._id} className="card">
                        <div className="card-body">
                            {editingPlanetId === planet._id ? (
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedPlanetData.name || ""}
                                        onChange={handleEditPlanetInputChange}
                                        placeholder="Name"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="type"
                                        value={editedPlanetData.type || ""}
                                        onChange={handleEditPlanetInputChange}
                                        placeholder="Type"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="mass"
                                        value={editedPlanetData.mass || ""}
                                        onChange={handleEditPlanetInputChange}
                                        placeholder="Mass"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="radius"
                                        value={editedPlanetData.radius || ""}
                                        onChange={handleEditPlanetInputChange}
                                        placeholder="Radius"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="distanceFromSun"
                                        value={editedPlanetData.distanceFromSun || ""}
                                        onChange={handleEditPlanetInputChange}
                                        placeholder="Distance from Sun"
                                        required
                                    />
                                    <button onClick={() => handleSavePlanet(planet._id)}>Save</button>
                                    <button onClick={() => setEditingPlanetId(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <h5>{planet.name}</h5>
                                    <p>Type: {planet.type}</p>
                                    <p>Mass: {planet.mass}</p>
                                    <p>Radius: {planet.radius}</p>
                                    <p>Distance from Sun: {planet.distanceFromSun}</p>
                                    <button onClick={() => enablePlanetEdit(planet)}>Edit</button>
                                    <button onClick={() => handlePlanetDelete(planet._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <h2>View/Edit/Delete Stars</h2>
            <div>
                {stars.map((star) => (
                    <div key={star._id} className="card">
                        <div className="card-body">
                            {editingStarId === star._id ? (
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedStarData.name || ""}
                                        onChange={handleEditStarInputChange}
                                        placeholder="Name"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="type"
                                        value={editedStarData.type || ""}
                                        onChange={handleEditStarInputChange}
                                        placeholder="Type"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="mass"
                                        value={editedStarData.mass || ""}
                                        onChange={handleEditStarInputChange}
                                        placeholder="Mass"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="radius"
                                        value={editedStarData.radius || ""}
                                        onChange={handleEditStarInputChange}
                                        placeholder="Radius"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="distanceFromEarth"
                                        value={editedStarData.distanceFromEarth || ""}
                                        onChange={handleEditStarInputChange}
                                        placeholder="Distance from Earth"
                                        required
                                    />
                                    <button onClick={() => handleSaveStar(star._id)}>Save</button>
                                    <button onClick={() => setEditingStarId(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <h5>{star.name}</h5>
                                    <p>Type: {star.type}</p>
                                    <p>Mass: {star.mass}</p>
                                    <p>Radius: {star.radius}</p>
                                    <p>Distance from Earth: {star.distanceFromEarth}</p>
                                    <button onClick={() => enableStarEdit(star)}>Edit</button>
                                    <button onClick={() => handleStarDelete(star._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;