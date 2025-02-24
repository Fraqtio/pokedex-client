import { observer } from "mobx-react-lite";
import pokemonStore from "../stores/PokemonStore";
import "../constants/Styles.css";
import blackPok from "../assets/blackPok.png";
import coloredPok from "../assets/coloredPok.png";

const FavoriteButton = observer(({ pokemonName }) => {
    const isFavorite = pokemonStore.favorites.has(pokemonName);

    return (
        <button
            onClick={() => pokemonStore.toggleFavorite(pokemonName)}
            className="favorite-button"
        >
            <img
                src={isFavorite ? coloredPok : blackPok}
                alt="Favorite"
                className="favorite-icon"
            />
        </button>
    );
});

export default FavoriteButton;