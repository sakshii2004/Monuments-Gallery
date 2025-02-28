import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowMonuments from "./ShowMonuments";
import AddMonument from "./AddMonument";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ShowMonuments />} />
                <Route path="/add-monument" element={<AddMonument />} />
            </Routes>
        </Router>
    );
};

export default App;
