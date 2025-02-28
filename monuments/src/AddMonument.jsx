import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddMonument = () => {
    const navigate = useNavigate();  
    const createUserApi = "http://localhost:5000/monuments";
    const [monument, setMonument] = useState({
        name: "",
        description: "",
        city: "",
        imageUrl: ""
    });

    const [error, setError] = useState(null);

    const handleGoBack = () => {
        navigate("/");  
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setMonument({ ...monument, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(createUserApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(monument),
            });

            if (response.ok) {
                alert("Monument added successfully!");
                setMonument({ name: "", description: "", city: "", imageUrl: "" });
            } else {
                alert("There was an error submitting the form.");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={pageStyle}>
            <div style={formWrapper}>
                <h2 style={headingStyle}>Add a Monument</h2>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <input type="text" name="name" placeholder="Monument Name" value={monument.name} onChange={handleInput} required style={inputStyle} />
                    <textarea name="description" placeholder="Description" value={monument.description} onChange={handleInput} required style={textareaStyle} />
                    <input type="text" name="city" placeholder="City" value={monument.city} onChange={handleInput} required style={inputStyle} />
                    <input type="text" name="imageUrl" placeholder="Image URL" value={monument.imageUrl} onChange={handleInput} required style={inputStyle} />
                    <button type="submit" style={buttonStyle}>Add Monument</button>
                </form>
                {error && <p style={errorStyle}>{error}</p>}
            </div>
            <button onClick={handleGoBack} style={buttonStyle2}> ← Go back</button>
        </div>
    );
};

// Styles
const pageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "20px",
    marginLeft: "500px",
    flexDirection: "column",
};

const formWrapper = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "400px",
    textAlign: "center",
};

const headingStyle = {
    marginBottom: "20px",
    color: "#333",
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
};

const inputStyle = {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
    backgroundColor: "#fff", // Ensures white background
    color: "#333", // Ensures readable text
};

const textareaStyle = {
    ...inputStyle,
    height: "80px",
    resize: "none",
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

const buttonStyle2 = {
    padding: "10px 15px",
    margin: "10px",
    fontSize: "16px",
    backgroundColor: "transparent",
    color: "lightgreen",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px"
};

const errorStyle = {
    color: "red",
    marginTop: "10px",
};

export default AddMonument;
