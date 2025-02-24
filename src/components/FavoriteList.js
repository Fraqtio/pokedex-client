import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import pokemonStore from "../stores/PokemonStore";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import { allTypes, typeColors } from "../constants/pokeTypes";
import "../constants/Styles.css";

const FavoriteList = observer(() => {
    useEffect(() => {
        pokemonStore.filterFavoritePokemons();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const { selectedTypes, offset, limit, pokemonCount, pokemons } = pokemonStore;

    const currentPage = useMemo(() => Math.floor(offset / limit) + 1, [offset, limit]);

    const totalPages = useMemo(() => Math.max(1, Math.ceil(pokemonCount / limit)), [pokemonCount, limit]);

    useEffect(() => {
        const handler = setTimeout(() => {
            pokemonStore.updateSearchQueryProfile(searchTerm.toLowerCase());
            pokemonStore.filterFavoritePokemons();
        }, 50);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    return (
        <div>
            {/* Search and Pagination */}
            <div className="search-container">
                <div className="search-spacer"></div>
                <div className="pagination-wrapper">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={pokemonStore.goToPrevPage}
                        onNext={pokemonStore.goToNextPage}
                        onPageChange={(page) => {
                            const newOffset = (page - 1) * pokemonStore.limit;
                            pokemonStore.setOffset(newOffset);
                            pokemonStore.filterFavoritePokemons();
                        }}
                        onLimitChange={(newLimit) => {
                            pokemonStore.setLimit(newLimit);
                            pokemonStore.filterFavoritePokemons();
                        }}
                        isPrevDisabled={offset === 0}
                        isNextDisabled={offset + limit >= pokemonCount}
                        currentLimit={limit}
                    />
                </div>
                <input
                    type="text"
                    placeholder="Search favorites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    className="search-input"
                />
            </div>

            {/* Type Filters */}
            <div className="type-filters-container">
                {allTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => pokemonStore.toggleFavoriteTypeFilter(type)}
                        className="type-button"
                        style={{
                            border: `2px solid ${typeColors[type]}`,
                            backgroundColor: selectedTypes.includes(type) ? typeColors[type] : "transparent",
                            color: selectedTypes.includes(type) ? "#fff" : typeColors[type],
                            fontWeight: selectedTypes.includes(type) ? "bold" : "normal",
                        }}
                    >
                        {type}
                    </button>
                ))}
                <button
                    onClick={() => pokemonStore.toggleFavoriteTypeFilter(null)}
                    className="all-button"
                    style={{
                        backgroundColor: selectedTypes === null ? "#007bff" : "#fff",
                        color: selectedTypes === null ? "#fff" : "#000",
                    }}
                >
                    All
                </button>
            </div>

            {/* Pokemon Grid */}
            <div className="container">
                {pokemons.length > 0 ? (
                    pokemons.map((pokemon) => <PokemonCard key={pokemon.name} {...pokemon} />)
                ) : (
                    <p>There is nothing in here...</p>
                )}
            </div>
        </div>
    );
});

export default FavoriteList;