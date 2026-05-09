import './App.css';
import MainDashBoard from "./pages/wallet/mainDashBoard";
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainDashBoard />} />
            </Routes>
        </Router>
    );
}

export default App;
