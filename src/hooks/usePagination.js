import { useState } from "react";

const usePagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalLength, setTotalLength] = useState(null);

    const resetPagination = () => setCurrentPage(1);

    return {
        currentPage,
        setCurrentPage,
        totalLength,
        setTotalLength,
        resetPagination,
    };
};

export default usePagination;