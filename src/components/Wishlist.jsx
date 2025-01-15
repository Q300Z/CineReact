import { useGlobal } from "../contexts/GlobalContext.jsx";
import { Link } from "react-router";
import styles from './Wishlist.module.css';  // Import du CSS personnalisé

const Wishlist = () => {
    const { wishlist, onRemoveWishlist } = useGlobal();

    return (
        <>
            <div className={styles.wishlist_container}>
                <h2 className={styles.wishlist_title}>Wishlist</h2>
                <p className={styles.wishlist_count}>Total de films : {wishlist.length}</p>
                {/* Affichage des films */}
                {wishlist.length === 0 ? (
                    <p className={styles.wishlist_empty}>Aucun film dans la wishlist</p>
                ) : (
                    <div>
                        {wishlist.map((movie) => (
                            <div key={movie.id} className={styles.wishlist_item}>
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                )}
                                <div className={styles.wishlist_item_info}>
                                    <h3>{movie.title}</h3>
                                    <p>{movie.overview}</p>
                                    <Link
                                        to={`/movie/${movie.id}`}
                                        className={styles.wishlist_item_link}
                                    >
                                        Plus de détails
                                    </Link>
                                </div>
                                <button
                                    onClick={() => onRemoveWishlist(movie)}
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </>
    );
};

export default Wishlist;
