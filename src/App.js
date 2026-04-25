
import './App.css';
import Login from "./pages/auth/login";
import MainDashBoard from "./pages/wallet/mainDashBoard";
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<MainDashBoard />} />
            </Routes>
        </Router>
    );
}

export default App;
