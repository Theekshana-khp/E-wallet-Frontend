import './App.css';
import MainDashBoard from "./pages/wallet/mainDashBoard";
import Register  from "./pages/auth/register";
import React, {useEffect} from 'react';
import {Routes,Route,useNavigate } from 'react-router-dom';
import keycloak from "./keycloak/keycloak";

function App() {
    const navigator = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8085/user/isExist", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${keycloak.token}`,
            },
        })
            .then(async (res) => {

                if (!res.ok) {
                    throw new Error(`HTTP error ${res.status}`);
                }

                return res.json();
            })
            .then((data) => {
                if(data){
                    navigator("/");
                }else{
                    navigator("/register");
                }
            })
            .catch((err) => console.log(err));

    }, [navigator]);

    return (
        <Routes>
            <Route path="/" element={<MainDashBoard />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
