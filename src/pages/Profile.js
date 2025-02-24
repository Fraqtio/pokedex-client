import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteList from "../components/FavoriteList";
import Initializer from "../components/Initializer";
import "../constants/Styles.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const storedToken = localStorage.getItem("token");
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                });
                setUser(response.data);
            } catch (err) {
                console.error("Data loading error:", err);
                localStorage.removeItem("token");
            }
            setIsLoading(false);
        };

        fetchUser();
    }, [location.search, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User data load error.</div>;
    }

    return (
        <div className="profile-container">
            <Initializer />
            <h1 className="profile-title">Profile</h1>
            <p className="profile-text"><strong>Name:</strong> {user.name}</p>
            <p className="profile-text"><strong>Email:</strong> {user.email}</p>
            <h2 className="favorites-title">Favorite Pokemons</h2>
            <FavoriteList />
        </div>
    );
};

export default Profile;