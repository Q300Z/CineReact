
import { Link } from "react-router";
import styles from './MovieList.module.css';

const MovieList = ({ listMovie }) => {

    return (
        <div className={styles.container}>
            {/* Affichage des films */}
            {listMovie.length === 0 ? (
                <p>Aucun film</p>
            ) : (
                listMovie.map((movie) => (
                    <div key={movie.id} className={styles.movie_card}>
                        <h3 className={styles.movie_title}>{movie.title}</h3>
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                alt={movie.title}
                                className={styles.movie_poster}
                            />
                        ) : (
                            <div className={styles.no_image}>Pas d'image</div>
                        )}
                        <p className={styles.movie_rating}>
                            <strong>Note :</strong> {movie.vote_average}/10
                        </p>
                        <Link
                            to={`/movie/${movie.id}`}
                            className={styles.details_link}
                        >
                            Voir les détails
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default MovieList;
