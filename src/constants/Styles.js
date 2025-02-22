export const styles = {
    // Контейнер для списка покемонов
    container: {
        display: "grid",
        gap: "20px",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        padding: "20px 20px",
    },

    // Контейнер поиска
    searchContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "20px 20px",
    },

    // Контейнер для пагинации
    paginationWrapper: {
        display: "flex",
        justifyContent: "center",
        flex: "1"
    },

    // Поле ввода для поиска
    searchInput: {
        padding: "8px",
        width: "100%",
        maxWidth: "300px",
        flexShrink: 0
    },

    // Контейнер для кнопок фильтров типов
    typeFiltersContainer: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        padding: "20px 20px",
    },

    // Стиль кнопки типа покемона
    typeButton: {
        padding: "8px 12px",
        cursor: "pointer",
        borderRadius: "20px",
        textTransform: "capitalize",
        transition: "all 0.2s ease"
    },

    // Кнопка "Все" (сброс фильтрации)
    allButton: {
        padding: "8px 12px",
        border: "1px solid #ddd",
        cursor: "pointer",
        borderRadius: "5px"
    },

    // Кнопка избранного
    favoriteButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        border: "none",
        cursor: "pointer",
        padding: "5px",
        borderRadius: "50%",
        backgroundColor: "transparent",
    },

    // Иконка избранного
    favoriteIcon: {
        width: "24px",
        height: "24px",
    },

    // --- Стили карточки покемона ---
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

    // Изображение покемона в карточке
    image: {
        width: "100px",
        height: "100px",
    },

    // Имя покемона
    name: {
        textTransform: "capitalize",
    },

    // Контейнер для типов покемона
    typesContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "5px",
        marginBottom: "10px",
    },

    // Тег с типом покемона
    typeTag: {
        padding: "5px 10px",
        borderRadius: "5px",
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "12px",
    },

    // Статистики покемона
    stats: {
        fontSize: "14px",
        lineHeight: "1.5",
    },

    // Заголовок способностей
    abilityTitle: {
        fontWeight: "bold",
        marginBottom: "5px",
    },

    // Способности покемона
    ability: {
        margin: "2px 0",
    },

    // --- Стили пагинации ---
    paginationContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        marginTop: "20px",
    },

    // Контейнер кнопок изменения лимита
    limitButtonsContainer: {
        display: "flex",
        gap: "5px",
    },

    // Контейнер кнопок пагинации
    paginationButtons: {
        display: "flex",
        gap: "5px",
    },

    // Общий стиль кнопок пагинации
    paginationButton: {
        padding: "8px 12px",
        border: "1px solid #ddd",
        backgroundColor: "#fff",
        color: "#000",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "all 0.2s ease",
    },

    // Активная кнопка пагинации
    activePaginationButton: {
        backgroundColor: "#007bff",
        color: "#fff",
    },

    // Отключённая кнопка пагинации
    disabledPaginationButton: {
        backgroundColor: "#f0f0f0",
        cursor: "not-allowed",
    },

    // Многоточие при больших страницах
    ellipsis: {
        alignSelf: "flex-end",
    },

    // --- Навигация ---
    nav: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "12px 20px",
        background: "linear-gradient(90deg, #007bff, #ff3d00)", // Градиентный фон
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Тень для объема
    },

    // --- Ссылки в навигации ---
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "18px",
        fontWeight: "bold",
        padding: "8px 16px",
        borderRadius: "8px", // Закругленные кнопки
        transition: "all 0.3s ease", // Плавная анимация
    },

    // --- Эффект наведения на ссылки ---
    linkHover: {
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Легкий прозрачный фон
        transform: "scale(1.05)", // Небольшое увеличение при наведении
    },

    // --- Активная ссылка ---
    activeLink: {
        textDecoration: "underline",
        color: "#ffeb3b", // Желтый акцент, чтобы выделялась
    },

    // Кнопка входа через Google
    googleButton: {
        backgroundColor: "transparent",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "background 0.3s ease-in-out",
    },

    // Кнопка выхода
    logoutButton: {
        backgroundColor: "transparent",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "background 0.3s ease-in-out",
    },

};