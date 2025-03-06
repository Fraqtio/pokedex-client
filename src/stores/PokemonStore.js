import {makeAutoObservable, runInAction} from 'mobx';
import {fetchPokemonDetails, fetchPokemonList, fetchPokemonListByType, getPokemonMaxCount} from '../api/pokemonAPI';
import pokeball from "../assets/pokeball.jpg";
import {allTypes} from "../constants/pokeTypes";

class PokemonStore {

    pokemons = []; // Список загруженных покемонов для отображения
    allPokemons = []; // Полный список имен покемонов (используется для поиска)
    pokemonByType = new Map(); // Полный список имен покемонов по типам (используется для поиска)
    selectedTypes = []; // Выбранные тип покемона
    favorites = new Set();
    limit = 10; // Количество покемонов на одной странице
    offset = 0;  // Текущий сдвиг (offset) для пагинации
    isLoading = false;  // Флаг загрузки данных
    error = null;  // Сообщение об ошибке
    pokemonCount = 0; // Общее количество покемонов в текущей выборке
    pokemonMaxCount = 0;  // Максимальное количество покемонов, доступных в API
    searchQuery = localStorage.getItem("searchQuery") || "";  // Строка поиска
    isFullDataLoaded = false;   // Флаг, указывающий, загружены ли все покемоны (для поиска)
    isFavoriteLoaded = false;
    isByTypeLoaded = false;
    isAuthenticated = false;

    constructor() {
        makeAutoObservable(this);
    }

    async checkAuth() {
        const token = localStorage.getItem('token');

        if (!token) {
            runInAction(() => {
                this.setAuthenticated(false);
            });
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error("Unauthorized");
            }

            runInAction(() => {
                this.setAuthenticated(true);
            });
        } catch (error) {
            console.error("Auth check failed:", error);
            localStorage.removeItem("token"); // 🔹 Удаляем недействительный токен
            runInAction(() => {
                this.setAuthenticated(false);
            });
        }
    }

    // Действие для обновления статуса аутентификации
    setAuthenticated(isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
    };

    // Загружает общее количество покемонов
    async fetchTotalPokemonCount() {
        const maxCount = await getPokemonMaxCount();

        runInAction(() => {
            this.pokemonMaxCount = maxCount;
            this.pokemonCount = maxCount;
        });
    };

    // Загружает полный список покемонов (используется для поиска)
    async fetchAllPokemonData() {
        try {
            const data = await fetchPokemonList({ limit: this.pokemonMaxCount, offset: 0 });

            runInAction(() => {
                this.allPokemons = data;
                this.isFullDataLoaded = true;
            });
        } catch (error) {
            console.error("Full list loading error:", error);
        }
    };

    async fetchPokemonByType() {
        for (let i = 0; i < allTypes.length; i++) {
            const typeName = allTypes[i];
            try {
                const responseData = await fetchPokemonListByType(i + 1);

                // Проверяем корректность данных
                if (!Array.isArray(responseData)) {
                    console.error(`Incorrect data format for type ${typeName}:`, responseData);
                    continue;
                }

                // Сохраняем только имя и URL покемона
                const pokemonList = responseData.map(({ pokemon }) => ({
                    name: pokemon.name,
                    url: pokemon.url
                }));

                // Записываем в хэш-мапу
                this.pokemonByType.set(typeName, pokemonList);
                this.isByTypeLoaded = true;


            } catch (error) {
                console.error(`Loading error for type ${typeName}:`, error);
            }
        }
    };

    async fetchUserFavorites() {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/favorites`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        // Проверяем, был ли запрос успешным
        if (!response.ok) {
            console.error(`Error ${response.status}: ${response.statusText}`);
            return; // Прекращаем выполнение функции
        }

        // Если запрос успешен, обрабатываем данные
        const data = await response.json();
        runInAction(() => {
            this.favorites.clear();  // Очищаем старое содержимое
            data.forEach(pokemon => this.favorites.add(pokemon));  // Добавляем новые элементы
            this.isFavoriteLoaded = true;
        });
    };

    async toggleFavorite(pokemonName){
        const method = this.favorites.has(pokemonName) ? "DELETE" : "POST";

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/favorites/${pokemonName}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            if (response.ok) {
                runInAction(() => {
                    if (this.favorites.has(pokemonName)) {
                        this.favorites.delete(pokemonName);
                    } else {
                        this.favorites.add(pokemonName);
                    }
                });
            } else {
                console.error("Favorite changing error");
            }
        } catch (error) {
            console.error("Net error:", error);
        }
    };

    // Загружает покемонов с учетом пагинации и поиска
    async filterPokemonList() {
        runInAction(() => { this.isLoading = true; });

        try {
            let pokemonList;

            if ((this.isFullDataLoaded && (this.searchQuery || this.selectedTypes.length > 0))) {
                let filtered = Array.isArray(this.allPokemons) ? this.allPokemons : [];

                if (this.searchQuery) {
                    filtered = filtered.filter(p => p.name.includes(this.searchQuery));
                }

                if (this.selectedTypes.length > 0) {
                    const typePokemons = this.selectedTypes.map(type =>
                        this.pokemonByType.get(type) || []
                    );

                    const fullMatch = typePokemons.reduce((acc, curr) =>
                            acc.filter(p => curr.some(cp => cp.name === p.name)),
                        typePokemons[0] || []
                    );

                    const partialMatch = this.selectedTypes
                        .flatMap(type => this.pokemonByType.get(type) || [])
                        .filter(p => !fullMatch.some(fm => fm.name === p.name));

                    const combinedResults = [...fullMatch, ...partialMatch];

                    filtered = combinedResults.filter(p =>
                        filtered.some(fp => fp.name === p.name)
                    );
                }

                runInAction(() => { this.pokemonCount = filtered.length; });

                filtered = filtered.slice(this.offset, this.offset + this.limit);
                pokemonList = await Promise.all(filtered.map(async (p) => {
                    const data = await fetchPokemonDetails(p.url);
                    return this.mapPokemonDetails(data);
                }));

            } else {
                runInAction(() => { this.pokemonCount = this.pokemonMaxCount; });

                const payload = { limit: this.limit, offset: this.offset };
                const data = await fetchPokemonList(payload);

                pokemonList = await Promise.all(data.map(async (p) => {
                    const pokemonData = await fetchPokemonDetails(p.url);
                    return this.mapPokemonDetails(pokemonData);
                }));
            }

            runInAction(() => {
                this.pokemons = pokemonList;
                this.isLoading = false;
            });

        } catch (err) {
            runInAction(() => {
                this.error = err.message;
                this.isLoading = false;
            });
        }
    };

    async filterFavoritePokemons() {
        runInAction(() => {
            this.isLoading = true;
        });

        try {
            // Если `allPokemons` еще не загружены, сначала загружаем их
            if (!this.isFullDataLoaded) {
                await this.fetchAllPokemonData();
            }

            // Если `favorites` не загружены, сначала загружаем их
            if (!this.isFavoriteLoaded) {
                await this.fetchUserFavorites();
            }

            // Фильтруем `allPokemons`, оставляя только избранных
            let filteredFavorites = this.allPokemons.filter(pokemon =>
                this.favorites.has(pokemon.name)
            );

            // Фильтрация по поисковому запросу
            if (this.searchQuery) {
                filteredFavorites = filteredFavorites.filter(pokemon =>
                    pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }

            // Фильтрация по типам
            if (this.selectedTypes.length > 0) {
                const typePokemons = this.selectedTypes.map(type =>
                    this.pokemonByType.get(type) || []
                );

                const fullMatch = typePokemons.reduce((acc, curr) =>
                        acc.filter(p => curr.some(cp => cp.name === p.name)),
                    typePokemons[0] || []
                );

                const partialMatch = this.selectedTypes
                    .flatMap(type => this.pokemonByType.get(type) || [])
                    .filter(p => !fullMatch.some(fm => fm.name === p.name));

                const combinedResults = [...fullMatch, ...partialMatch];

                filteredFavorites = combinedResults.filter(pokemon =>
                    filteredFavorites.some(fav => fav.name === pokemon.name)
                );
            }

            // Применяем пагинацию
            runInAction(() => {
                this.pokemonCount = filteredFavorites.length;
            });

            const paginatedFavorites = filteredFavorites.slice(this.offset, this.offset + this.limit);

            // 🔹 Загружаем детали покемонов
            const pokemonList = await Promise.all(paginatedFavorites.map(async (pokemon) => {
                const data = await fetchPokemonDetails(pokemon.url);
                return this.mapPokemonDetails(data);
            }));

            runInAction(() => {
                this.pokemons = pokemonList;
            });

        } catch (err) {
            runInAction(() => {
                this.error = err.message;
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    // Обрабатывает данные о покемоне, извлекая нужные параметры
    mapPokemonDetails(data) {
        return {
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default || pokeball,
            types: data.types.map(t => t.type.name),
            stats: {
                hp: data.stats.find(s => s.stat.name === "hp")?.base_stat || 0,
                defense: data.stats.find(s => s.stat.name === "defense")?.base_stat || 0,
                speed: data.stats.find(s => s.stat.name === "speed")?.base_stat || 0,
            },
            abilities: data.abilities.map(a => a.ability.name)
        };
    }

    // Устанавливает строку поиска и сбрасывает offset
    updateSearchQuery(query){
        runInAction(() => {
            this.searchQuery = query.toLowerCase();
            this.offset = 0;
            localStorage.setItem("searchQuery", query);
        });
        this.filterPokemonList(); // Добавляем вызов
    };

    updateSearchQueryProfile(query){
        runInAction(() => {
            this.searchQuery = query.toLowerCase();
            this.offset = 0;
            localStorage.setItem("searchQuery", query);
        });
        this.fetchUserFavorites();
    };

    // Устанавливает лимит покемонов на странице
    setLimit(newLimit) {
        runInAction(() => {
            this.limit = newLimit;
            this.offset = 0;  // если меняется лимит, сбрасываем offset
        });
    };

    setOffset(newOffset) {
        runInAction(() => {
            this.offset = newOffset;
        });
    };

    toggleTypeFilter(type) {
        // Очищаем при выборе кнопки "All"
        if (type === null) {
            this.selectedTypes = [];
        }
        // Если тип уже выбран - удаляем его
        else if (this.selectedTypes.includes(type)) {
            this.selectedTypes = this.selectedTypes.filter(t => t !== type);
        }
        // Если не выбран и меньше 2 выбранных - добавляем
        else if (this.selectedTypes.length < 2) {
            this.selectedTypes = [...this.selectedTypes, type];
        }
        // Если уже выбрано 2 типа - заменяем первый
        else {
            this.selectedTypes = [this.selectedTypes[1], type];
        }
    };

    togglePokemonTypeFilter(type) {
        this.toggleTypeFilter(type);
        this.filterPokemonList();
    };

    toggleFavoriteTypeFilter(type) {
        this.toggleTypeFilter(type);
        this.filterFavoritePokemons(); // Загружаем избранных покемонов с новым фильтром
    };

    // Переход на следующую страницу
    goToNextPage() {
        runInAction(() => {
            this.offset += this.limit;
            this.filterPokemonList();
        });
    };

    goToPrevPage() {
        runInAction(() => {
            this.offset = Math.max(0, this.offset - this.limit);
            this.filterPokemonList();
        });
    };
}

const pokemonStoreInstance = new PokemonStore();
export default pokemonStoreInstance;
