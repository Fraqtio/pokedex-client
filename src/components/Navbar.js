import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import GoogleLoginButton from "./GoogleLoginButton";
import { observer } from "mobx-react-lite";
import pokemonStore from "../stores/PokemonStore";
import { styles } from "../constants/Styles"; // Импортируем стили

const Navbar = observer(() => {
    const location = useLocation(); // Определяем текущий маршрут

    return (
        <nav style={styles.nav}>
            <Link
                to="/"
                style={{
                    ...styles.link,
                    ...(location.pathname === "/" ? styles.activeLink : {}),
                }}
            >
                Main
            </Link>

            <Link
                to="/profile"
                style={{
                    ...styles.link,
                    ...(location.pathname === "/profile" ? styles.activeLink : {}),
                }}
            >
                Profile
            </Link>

            {pokemonStore.isAuthenticated ? ( <LogoutButton />) : ( <GoogleLoginButton /> )}
        </nav>
    );
});

export default Navbar;