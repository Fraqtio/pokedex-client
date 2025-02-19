import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import GoogleLoginButton from "./GoogleLoginButton";
import { observer } from "mobx-react-lite";
import pokemonStore from "../stores/PokemonStore";
import {styles} from "../constants/Styles"; // Импортируем стили

const Navbar = observer(() => {
    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>Main</Link>
            <Link to="/profile" style={styles.link}>Profile</Link>
            {pokemonStore.isAuthenticated ? <LogoutButton /> : <GoogleLoginButton />}
        </nav>
    );
});

export default Navbar;