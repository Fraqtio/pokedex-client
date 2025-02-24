import React, { useState } from "react";
import { getTypeColor } from "../constants/pokeTypes";
import FavoriteButton from "./FavoriteButton";
import "../constants/Styles.css";
import pokemonStore from "../stores/PokemonStore";

const PokemonCard = ({ name, image, types, stats, abilities, isFavorite }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Кнопка избранного */}
            {pokemonStore.isAuthenticated && <FavoriteButton pokemonName={name} initialIsFavorite={isFavorite} />}

            <img src={image} alt={name} className="image" />
            <h3 className="name">{name}</h3>

            <div className="types-container">
                {types.map((type) => (
                    <span key={type} className="type-tag" style={{ backgroundColor: getTypeColor(type) }}>
                        {type}
                    </span>
                ))}
            </div>

            <div className="stats">
                {isHovered ? (
                    <div>
                        <p className="abilityTitle">Abilities:</p>
                        {abilities.map((ability, index) => (
                            <p key={index} className="ability">
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