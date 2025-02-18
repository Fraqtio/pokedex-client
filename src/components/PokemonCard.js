import React, { useState } from "react";
import { getTypeColor } from "../constants/pokeTypes";
import FavoriteButton from "./FavoriteButton";
import { styles } from "../constants/Styles";

const PokemonCard = ({ name, image, types, stats, abilities, isFavorite }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isLogged = !!localStorage.getItem("token");

    return (
        <div
            style={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Кнопка избранного */}
            {isLogged && <FavoriteButton pokemonName={name} initialIsFavorite={isFavorite} />}

            <img src={image} alt={name} style={styles.image} />
            <h3 style={styles.name}>{name}</h3>

            <div style={styles.typesContainer}>
                {types.map((type) => (
                    <span key={type} style={{ ...styles.typeTag, backgroundColor: getTypeColor(type) }}>
                        {type}
                    </span>
                ))}
            </div>

            <div style={styles.stats}>
                {isHovered ? (
                    <div>
                        <p style={styles.abilityTitle}>Abilities:</p>
                        {abilities.map((ability, index) => (
                            <p key={index} style={styles.ability}>
                                {ability}
                            </p>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p>HP: {stats.hp}</p>
                        <p>Defense: {stats.defense}</p>
                        <p>Speed: {stats.speed}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokemonCard;