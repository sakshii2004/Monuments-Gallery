import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ShowMonuments = () => {
    const navigate = useNavigate();  
    const API_URL = "http://localhost:5000/monuments";  
    const [monumentsData, setMonumentsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getMonuments();
    }, []);

    const getMonuments = () => {
        axios.get(API_URL)
            .then((res) => setMonumentsData(res.data))
            .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => getMonuments())
            .catch((err) => console.log(err));
    };

    const handleAdd = () => {
        navigate("/add-monument");  
    };

    const handleEdit = (id) => {
        const updatedMonument = {
            name: prompt("Update Name:"),
            description: prompt("Update Description:"),
            city: prompt("Update City:"),
            imageUrl: prompt("Update Image URL:")
        };
        if (updatedMonument.name && updatedMonument.description && updatedMonument.city && updatedMonument.imageUrl) {
            axios.put(`${API_URL}/${id}`, updatedMonument)
                .then(() => getMonuments())
                .catch((err) => console.log(err));
        }
    };

    const filteredMonuments = monumentsData.filter(monument =>
        monument.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Monuments Gallery</h1>
            <button onClick={handleAdd} style={buttonStyle}>Add Monument</button>
            <input
                type="text"
                placeholder="Search Monument..."
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchStyle}
            />

            <div style={gridContainer}>
                {filteredMonuments.length > 0 ? (
                    filteredMonuments.map((monument) => (
                        <div key={monument.id} style={gridItem}>
                            <img 
                                src={monument.imageUrl} 
                                alt={monument.name} 
                                style={imageStyle} 
                                onClick={() => handleEdit(monument.id)}
                            />
                            <h3>{monument.name}</h3>
                            <p>{monument.description}</p>
                            <p><b>City:</b> {monument.city}</p>
                            <button onClick={() => handleDelete(monument.id)} style={deleteButtonStyle}>Delete</button>
                        </div>
                    ))
                ) : (
                    <h3>No Monuments Found</h3>
                )}
            </div>
        </div>
    );
};

const gridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    padding: "20px"
};

const gridItem = {
    border: "1px solid #ddd",
    padding: "15px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
};

const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    cursor: "pointer"
};

const buttonStyle = {
    padding: "10px 15px",
    margin: "10px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px"
};

const searchStyle = {
    padding: "8px",
    margin: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px"
};

const deleteButtonStyle = {
    padding: "8px 12px",
    marginTop: "10px",
    fontSize: "14px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px"
};

export default ShowMonuments;
