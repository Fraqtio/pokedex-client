import React from "react";
import { styles } from "../constants/Styles";

const Pagination = ({
                        currentPage,
                        totalPages,
                        onPrev,
                        onNext,
                        onPageChange,
                        onLimitChange,
                        isPrevDisabled,
                        isNextDisabled,
                        currentLimit,
                    }) => {
    const generatePageNumbers = () => {
        const pages = new Set();
        pages.add(1);
        pages.add(totalPages);

        for (let i = -2; i <= 2; i++) {
            const page = currentPage + i;
            if (page > 1 && page < totalPages) {
                pages.add(page);
            }
        }

        return [...pages].sort((a, b) => a - b);
    };

    const pages = generatePageNumbers();
    const limitOptions = [10, 20, 50];

    return (
        <div style={styles.paginationContainer}>
            {/* Кнопки выбора количества элементов */}
            <div style={styles.limitButtonsContainer}>
                {limitOptions.map((option) => (
                    <button
                        key={option}
                        onClick={() => onLimitChange(option)}
                        style={{
                            ...styles.paginationButton,
                            ...(option === currentLimit ? styles.activePaginationButton : {}),
                        }}
                    >
                        {option} per page
                    </button>
                ))}
            </div>

            {/* Основная пагинация */}
            <div style={styles.paginationButtons}>
                <button
                    onClick={onPrev}
                    disabled={isPrevDisabled}
                    style={{
                        ...styles.paginationButton,
                        ...(isPrevDisabled ? styles.disabledPaginationButton : {}),
                    }}
                >
                    Prev
                </button>

                {pages.map((page, index) => (
                    <React.Fragment key={page}>
                        {index > 0 && page - pages[index - 1] > 1 && <span style={styles.ellipsis}>...</span>}
                        <button
                            onClick={() => onPageChange(page)}
                            style={{
                                ...styles.paginationButton,
                                ...(page === currentPage ? styles.activePaginationButton : {}),
                            }}
                        >
                            {page}
                        </button>
                    </React.Fragment>
                ))}

                <button
                    onClick={onNext}
                    disabled={isNextDisabled}
                    style={{
                        ...styles.paginationButton,
                        ...(isNextDisabled ? styles.disabledPaginationButton : {}),
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;