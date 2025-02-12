import React, { useState } from "react";
import { getTypeColor } from "../constants/pokeTypes";
import FavoriteButton from "./FavoriteButton";

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
            {isLogged ?
                (<FavoriteButton
                pokemonName={name}
                initialIsFavorite={isFavorite}
            />) :  <></>
            }

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

const styles = {
    card: {
        border: "4px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        width: "200px",
        textAlign: "center",
        backgroundColor: "#f8f8f8",
        boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
        position: "relative",
    },
    image: {
        width: "100px",
        height: "100px",
    },
    name: {
        textTransform: "capitalize",
    },
    typesContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "5px",
        marginBottom: "10px",
    },
    typeTag: {
        padding: "5px 10px",
        borderRadius: "5px",
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "12px",
    },
    stats: {
        fontSize: "14px",
        lineHeight: "1.5",
    },
    abilityTitle: {
        fontWeight: "bold",
        marginBottom: "5px",
    },
    ability: {
        margin: "2px 0",
    },
};

export default PokemonCard;