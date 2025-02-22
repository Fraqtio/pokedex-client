import React from "react";
import { styles } from "../constants/Styles"; // Импортируем стили

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, "_blank");
    };

    return (
        <button onClick={handleGoogleLogin} style={styles.googleButton}>
            Login via Google
        </button>
    );
};

export default GoogleLoginButton;