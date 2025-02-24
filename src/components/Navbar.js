import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import GoogleLoginButton from "./GoogleLoginButton";
import { observer } from "mobx-react-lite";
import pokemonStore from "../stores/PokemonStore";
import "../constants/Styles.css";

const Navbar = observer(() => {
    const location = useLocation(); // Определяем текущий маршрут

    return (
        <nav className="nav">
            <Link
                to="/"
                className={`link ${location.pathname === "/" ? "active-link" : ""}`}
            >
                Main
            </Link>

            <Link
                to="/profile"
                className={`link ${location.pathname === "/profile" ? "active-link" : ""}`}
            >
                Profile
            </Link>

            {pokemonStore.isAuthenticated ? <LogoutButton /> : <GoogleLoginButton />}
        </nav>
    );
});

export default Navbar;