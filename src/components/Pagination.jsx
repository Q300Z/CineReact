import { useGlobal } from "../contexts/GlobalContext.jsx";
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, onCurrentPage, totalPages }) => {

    const handleNextPage = () => {
        if (currentPage < totalPages) onCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) onCurrentPage((prev) => prev - 1);
    };

    return (
        <div className={styles.pagination}>
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={styles.button}
            >
                Précédent
            </button>
            <span className={styles.page_info}>
                Page {currentPage} sur {totalPages}
            </span>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={styles.button}
            >
                Suivant
            </button>
        </div>
    );
};

export default Pagination;
