import { observer } from "mobx-react-lite";
import pokemonStore from "../stores/PokemonStore";
import "../constants/Styles.css";
import blackPok from "../assets/blackPok.png";
import coloredPok from "../assets/coloredPok.png";

const FavoriteButton = observer(({ pokemonName }) => {
    const isFavorite = pokemonStore.favorites.has(pokemonName);

    const toggleFavorite = (event) => {
        event.stopPropagation(); // ⬅️ Останавливаем всплытие клика, чтобы не срабатывал `onClick` карточки
        pokemonStore.toggleFavorite(pokemonName);
    };

    return (
        <button onClick={toggleFavorite} className="favorite-button">
            <img
                src={isFavorite ? coloredPok : blackPok}
                alt="Favorite"
                className="favorite-icon"
            />
        </button>
    );
});

export default FavoriteButton;