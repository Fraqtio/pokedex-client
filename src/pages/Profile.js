import React, { useEffect, useState } from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import FavoriteList from "../components/FavoriteList";
import Initializer from "../components/Initializer";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);// Устанавливаем состояние загрузки в true перед началом запроса
            try {
                // Проверяем наличие токена в localStorage
                const storedToken = localStorage.getItem("token");

                // Запрашиваем данные о пользователе
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
                    headers: {Authorization: `Bearer ${storedToken}`},
                });

                setUser(response.data);
            } catch (err) {
                console.error("Data loading error:", err);
                localStorage.removeItem("token");
                // navigate("/");
            }
            setIsLoading(false); // Устанавливаем состояние загрузки в false после завершения запроса
        };

    fetchUser();

    }, [location.search, navigate]);

    if (isLoading) {
        return <div>Loading...</div>; // Отображаем индикатор загрузки
    }

    if (!user) {
        return <div>User data load error.</div>;
    }

    return (
        <div>
            <Initializer />
            <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <h2>Favorite Pokemons</h2>
            <FavoriteList />
        </div>
    );
};

export default Profile;