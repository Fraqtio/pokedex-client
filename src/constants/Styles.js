export const styles = {
    container: {
        display: "grid",
        gap: "20px",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))"
    },
    searchContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: "20px"
    },
    paginationWrapper: {
        display: "flex",
        justifyContent: "center",
        flex: "1"
    },
    searchInput: {
        padding: "8px",
        width: "100%",
        maxWidth: "300px",
        flexShrink: 0
    },
    typeFiltersContainer: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "20px"
    },
    typeButton: {
        padding: "8px 12px",
        cursor: "pointer",
        borderRadius: "20px",
        textTransform: "capitalize",
        transition: "all 0.2s ease"
    },
    allButton: {
        padding: "8px 12px",
        border: "1px solid #ddd",
        cursor: "pointer",
        borderRadius: "5px"
    },
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
    favoriteIcon: {
        width: "24px",
        height: "24px",
    },

    // PokemonCard styles
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