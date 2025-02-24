import React from "react";
import { useNavigate } from "react-router-dom";
import pokemonStore from "../stores/PokemonStore";
import "../constants/Styles.css";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        pokemonStore.setAuthenticated(false); // Обновляем статус
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;