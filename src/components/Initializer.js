import { useEffect } from "react";
import pokemonStore from "../stores/PokemonStore";
import {useLocation} from "react-router-dom";

const PokemonInitializer = () => {
    const location = useLocation();

    useEffect(() => {
        let isMounted = true; // Флаг, чтобы отслеживать монтирование компонента

        const initialize = async () => {
            if (!isMounted) return;// Если компонент размонтирован, не выполняем дальнейшие действия

            try {
                await pokemonStore.checkAuth();

                // Загружаем общее количество покемонов
                await pokemonStore.fetchTotalPokemonCount();

                // Загружаем данные по типам
                if (!pokemonStore.isByTypeLoaded) {
                    await pokemonStore.fetchPokemonByType();
                }

                if (!pokemonStore.isFullDataLoaded) {
                    await pokemonStore.fetchAllPokemonData();
                }
                // Если мы не на странице профиля, загружаем полный список покемонов
                if (!location.pathname.includes("/profile")) {
                    await pokemonStore.filterPokemonList();
                }

                // Загружаем избранных покемонов, если есть токен
                if (pokemonStore.isAuthenticated) {
                    await pokemonStore.fetchUserFavorites();
                }
            } catch (err) {
                console.error("Init error:", err);
            }
        };
        initialize();

        // Убираем флаг при размонтировании компонента
        return () => {
            isMounted = false;
        };

    }, [location.pathname]); // Пустой массив зависимостей, чтобы запускался только один раз при монтировании компонента

    return null; // Не отображаем ничего, это только для инициализации
};

export default PokemonInitializer;