import { observer } from "mobx-react-lite";
import pokemonStore from "../stores/PokemonStore";
import { styles } from "../constants/Styles";
import blackPok from "../assets/blackPok.png";
import coloredPok from "../assets/coloredPok.png";

const FavoriteButton = observer(({ pokemonName }) => {
    const isFavorite = pokemonStore.favorites.has(pokemonName);

    return (
        <button
            onClick={() => pokemonStore.toggleFavorite(pokemonName)}
            style={styles.favoriteButton}
        >
            <img
                src={isFavorite ? coloredPok : blackPok}
                alt="Favorite"
                style={styles.favoriteIcon}
            />
        </button>
    );
});

export default FavoriteButton;