import React from "react";

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, "_blank");
    };

    return (
        <button onClick={handleGoogleLogin} style={styles.button}>
            Login via Google
        </button>
    );
};

const styles = {
    button: {
        padding: "10px 20px",
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default GoogleLoginButton;