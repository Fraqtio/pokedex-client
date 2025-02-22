import React from "react";
import { useNavigate } from "react-router-dom";
import pokemonStore from "../stores/PokemonStore";
import { styles } from "../constants/Styles"; // Импортируем стили

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        pokemonStore.setAuthenticated(false); // Обновляем статус
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
        </button>
    );
};

export default LogoutButton;