import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import pokemonStore from "../stores/PokemonStore";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import { allTypes, typeColors } from "../constants/pokeTypes";
import "../constants/Styles.css";

const PokemonList = observer(() => {
    const [searchTerm, setSearchTerm] = useState("");

    const { pokemonCount, limit, offset, selectedTypes, pokemons } = pokemonStore;

    const currentPage = useMemo(() => Math.floor(offset / limit) + 1, [offset, limit]);

    const totalPages = useMemo(() => Math.max(1, Math.ceil(pokemonCount / limit)), [pokemonCount, limit]);

    useEffect(() => {
        const handler = setTimeout(() => {
            pokemonStore.updateSearchQuery(searchTerm.toLowerCase());
        }, 100);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    return (
        <div>
            {/* Поиск и пагинация */}
            <div className="search-container">
                <div className="search-spacer"></div>

                {/* Пагинация по центру */}
                <div className="pagination-wrapper">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={() => pokemonStore.goToPrevPage()}
                        onNext={() => pokemonStore.goToNextPage()}
                        onPageChange={(page) => {
                            const newOffset = (page - 1) * limit;
                            pokemonStore.setOffset(newOffset);
                            pokemonStore.filterPokemonList();
                        }}
                        onLimitChange={(newLimit) => {
                            pokemonStore.setLimit(newLimit);
                            pokemonStore.filterPokemonList();
                        }}
                        isPrevDisabled={offset === 0}
                        isNextDisabled={offset + limit >= pokemonCount}
                        currentLimit={limit}
                    />
                </div>

                {/* Поле поиска справа */}
                <input
                    type="text"
                    placeholder="Pokemon search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    className="search-input"
                />
            </div>

            {/* Фильтрация по типам */}
            <div className="type-filters-container">
                {allTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => pokemonStore.togglePokemonTypeFilter(type)}
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
                    onClick={() => pokemonStore.togglePokemonTypeFilter(null)}
                    className="all-button"
                    style={{
                        backgroundColor: selectedTypes === null ? "#007bff" : "#fff",
                        color: selectedTypes === null ? "#fff" : "#000",
                    }}
                >
                    All
                </button>
            </div>

            {/* Список покемонов */}
            <div className="container">
                {pokemons.length > 0 ? (
                    pokemons.map((pokemon) => (
                        <PokemonCard key={pokemon.name} {...pokemon} />
                    ))
                ) : (
                    <p>Loading pokemons...</p>
                )}
            </div>
        </div>
    );
});

export default PokemonList;