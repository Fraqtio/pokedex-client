import React from "react";
import "../constants/Styles.css";

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, "_blank");
    };

    return (
        <button onClick={handleGoogleLogin} className="login-button">
            Login via Google
        </button>
    );
};

export default GoogleLoginButton;