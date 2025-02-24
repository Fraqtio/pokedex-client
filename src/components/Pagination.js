import React from "react";
import "../constants/Styles.css";

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
        <div className="pagination-container">
            {/* Кнопки выбора количества элементов */}
            <div className="limit-buttons-container">
                {limitOptions.map((option) => (
                    <button
                        key={option}
                        onClick={() => onLimitChange(option)}
                        className={`pagination-button ${option === currentLimit ? "active-pagination-button" : ""}`}
                    >
                        {option} per page
                    </button>
                ))}
            </div>

            {/* Основная пагинация */}
            <div className="pagination-buttons">
                <button
                    onClick={onPrev}
                    disabled={isPrevDisabled}
                    className={`pagination-button ${isPrevDisabled ? "disabled-pagination-button" : ""}`}
                >
                    Prev
                </button>

                {pages.map((page, index) => (
                    <React.Fragment key={page}>
                        {index > 0 && page - pages[index - 1] > 1 && <span className="ellipsis">...</span>}
                        <button
                            onClick={() => onPageChange(page)}
                            className={`pagination-button ${page === currentPage ? "active-pagination-button" : ""}`}
                        >
                            {page}
                        </button>
                    </React.Fragment>
                ))}

                <button
                    onClick={onNext}
                    disabled={isNextDisabled}
                    className={`pagination-button ${isNextDisabled ? "disabled-pagination-button" : ""}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;